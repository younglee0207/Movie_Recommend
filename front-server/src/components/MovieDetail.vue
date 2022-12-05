<template>
  <div1 class="container">
    <div class="d-flex row">
      <div class="col-3">
          <img class="col-12 rounded-3" :src="`${imgUrl}${movie.poster_path}`">
        
        <div>
          
          
          <button v-if ="likes.includes(movie.id)" @click="movie_likes"><i class="fa-solid fa-heart" style = 'color:rgba(103, 82, 223, 1); width:70px; height:70px'></i></button>
          <button v-else @click ="movie_likes"><i class="fa-solid fa-heart" style = 'color:grey; width:70px; height:70px;'></i></button>
        </div>
      </div>
      <div class="col-6">
        <p id="block">
        {{ movie.original_title }} <br> 
         {{ movie.release_date }} 개봉
        </p>
        <div class="d-flex justify-content-center">          
            <button v-for="genre in genres_list" :key="genre.id" class="mx-2" id="block2" @click="recommend1" >
              {{ genre.name }} 
            </button>
        </div>
          <!-- <button @click="button">출력</button> -->
        <div>
          <p id="block3">
           평점: {{ movie.vote_average }}
          </p>
        </div>


        <p id="block3">
          {{ movie.overview }}
        </p>
          {{movie.actor}}
      </div>
      <div class="recommend col-3">
        <button id="othermovie" @click="recommend1" class="btn text-white btn-sm"  style="background-color : rgba(83, 60, 216, 0.829)"> 같은 장르의 다른 영화</button>
        <div>

          <img :src="`${imgUrl}${recommend_movies[0]?.poster_path}`" alt="">
          <p> {{ recommend_movies[0]?.title }} </p>

        </div>
            

      </div>


      <div class="box border rounded-4 py-5">
        <h2> 한줄평</h2>
        <input type="text"
         @keyup.enter="saveComment"
          v-model="InputData"
          size=100
          />
        <button @click="saveComment" class="btn text-white btn-sm"  style="background-color : rgba(83, 60, 216, 0.829)"> Add </button>
      </div>
      <div class="">
        <br>
        <div class="justify-content-center">
          <div class="d-flex justify-content-between my-0" style="margin-right:100px; margin-left:100px;">
        <p class="my-0">글쓴이</p>
        <p class="my-0 font-weight-bold">내용</p>
        <p class="my-0">시간</p>
        </div>
        <hr>
        <MovieDetailComments
          :movie="movie"
          v-for="(comment,i) in movie_comments.filter((c)=> c.movie === movie?.id)"
          :key="i"
          :comment="comment"
        />
        </div>
      </div>

      </div>



  </div1>
</template>

<script>
import axios from 'axios'
// import RecommendMovie1 from '@/components/RecommendMovie1'
import MovieDetailComments from '@/components/MovieDetailComments'
import _ from 'lodash'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
  components: {
    MovieDetailComments,
    // RecommendMovie1,
  },
  data() {
    return {
      movie: null,
      imgUrl: 'https://www.themoviedb.org/t/p/w220_and_h330_face/',
      InputData: null,
      // comments: this.$store.state.movie_comments,
      genre_movies: this.$store.state.genre_movies,
      same_genre: [],
      recommend_movies : [],
      genres_list: [],
      likes: [],
    }
  },
  created() {
      this.getMovieComments()
      this.getMovieDetail()
      this.genre_list()
      this.likes_movies()
    },
  computed: {
    movie_comments() {
      return this.$store.state.movie_comments;
    },
    user() {
      return this.$store.state.user
    },
  },
  
  methods: {
    button() {
      console.log(this.movie)
    },
    likes_movies() {
      // console.log(this.user)
      axios({
            method: 'GET',
            url: `${API_URL}/api/v1/movies/${this.user.pk}/likeinfo/`,
            headers: { Authorization : `Token ${ this.$store.state.token }`}
        })
        .then((res) => {
            console.log("하이",res.data[0].id)
            for (let i=0; i < res.data.length ; i++) {
              this.likes.push(res.data[i].id)

            }
            // context.commit('MOVIE_LIKES',res.data)
            
          })
          
        
        .catch((err)=> {
            console.log(err)
    })
    },
    
    getMovieComments() {
      this.$store.dispatch("getMovieComments")
    },
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}`
      })
      .then((res) => {
        // console.log(res)

        this.movie = res.data
        
      })
      .catch((err) => {
        console.log(err)
      })
    },
    saveComment() {
      const content = this.InputData
      // console.log(this.user)
      if (!content) {
        alert('한줄평을 입력하세요')
        return
      }

      axios({
        method: 'post',
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/comment/`,
        data : {
          content : content,
          user : this.user,
          username : this.user.username
        },
        headers: {
            Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((res) => {
        // console.log(res)
        res
        this.$router.go()
        
        
      })
    },
    
    getGenreMovies() {
      this.$store.dispatch("getGenreMovies")
      
    },
    recommend1() {
      for (let i=0; i < this.$store.state.movies.length; i++){
        for (let j=0; j < this.movie.genres.length; j++) {
          if (this.movie.genres[j] === this.$store.state.movies[i].genres[j]) {
            // console.log(this.$store.state.movies[i].title)
            // console.log(this.$store.state.movies[i].genres[j])
            this.same_genre.push(this.$store.state.movies[i])
            if (this.$store.state.movies[i].id === this.same_genre.id){
                this.same_genre.pop(this.$store.state.movies[i])
          }
        }
      }

    }
    this.same_genre = [...new Set(this.same_genre)]
    this.recommend_movies = _.sampleSize(this.same_genre, 1)
    console.log(this.recommend_movies)
    // console.log(this.recommend_movies)
      // console.log(_.sampleSize(this.same_genre, 1))
    },
    genre_list() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/genres_list`
      })
      .then((res) => {
        for (let i=0; i < res.data.length; i++) {
          for (let j=0; j < this.movie.genres.length; j++) {
            if (this.movie.genres[j] === res.data[i].id) {
              this.genres_list.push(res.data[i])
            }
          }
          
        }
      })
    },
    movie_likes() {
        axios({
            method: 'POST',
            url: `${API_URL}/api/v1/movies/${this.movie.id}/like/`,
          data: {
            id: this.movie.id,
            like_users : this.user.pk,
            // genres : this.movie.genres_list,
          },
            headers: { Authorization : `Token ${ this.$store.state.token }`}
        })
        .then((res) => {
            console.log(res)
            // context.commit('MOVIE_LIKES',res.data)
            this.$router.go()
          })
        
        .catch((err)=> {
            console.log(err)

        // if (this.state.likes_movies.length === 0) {
        //     this.state.likes_movies.push(payload)
        //     console.log(this.state.likes_movies)
        // } else {
        //     for (let i=0; i < this.state.likes_movies.length; i++){
        //         if (this.state.likes[i].content === res.data.content) {
        //             this.state.likes_movies.pop(payload)
        //             console.log(this.state.likes_movies)
        //         } else {
        //             this.state.likes_movies.push(payload)
        //             console.log(this.state.likes_movies)
        //         }
        //     }
        // }
        // context.commit('MOVIE_LIKES', payload)
        // console.log(this.state.likes_movies)
    
        })
        },


    // movie_likes(context) {

    //   axios({
    //     method: 'POST',
    //     url: `${API_URL}/api/v1/movies/${this.$route.params.id}/like/`,
    //     data: {
    //       content: this.movie.id
    //     },
    //     headers: { Authorization : `Token ${ this.$store.state.token }`}
    //   })
    //   .then((res) => {
    //     // context
    //     // console.log(res.data)
        
    //       if (this.likes === res.data.content) {
    //         console.log("res.data:",res.data)
    //         this.likes.pop(res.data)
    //       } else {
    //         this.likes.push(res.data)
    //         console.log("res.data:",res.data)
    //       }
        
    //     console.log("likes:",this.likes)
       
        
    //     // console.log(this.$store.state.token)
    //   })
    // }  
    

  },
  

  
}
</script>

<style>
#block {
  font-size: x-large;
  width: 100%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
}

#block2 {
  font-size: large;
  width: 100%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  font-weight:bold;
  transition: color 1s;
  margin-bottom: 3px;
}
#block2:hover {
  color: white;
  background-color: gray;
}

#block3 {
  width: 100%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 6px;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

}

#othermovie {
  font-size : larger;
  border: solid gray 1px;
}

.container {
  background-color:  black;
  z-index : 100;
}
/* .recommend {
  border: solid gray 1px;
} */
/* // <RecommendMovie1 
//   v-for="movie in recommend_movies"
//   :key="movie.id"
//   :movie="movie"
// /> */
/* .fa-solid {
  border-radius: 5px;
} */
</style>