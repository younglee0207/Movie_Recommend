<template>
<div class="profile" style="background-color : black">
  <br><br><br>
  <h3>
    <!-- <div class="profile2"> <span>{{ username }}</span>님의 프로필입니다 </div> -->
    <div id="userprofile"> <span>{{ username }}</span>님의 프로필 </div>
    <!-- <div class="col-xs-12 col-sm-8 center" style="margin-bottom:20px">
                        <h2 class="title-font" style="margin-bottom: 30px">{{ user.username }}님의 Profile</h2>
                        <p class="content-font" style="font-size: 20px"><strong>Email: </strong> {{ user.email }} </p>
                        <p class="content-font" style="font-size: 20px"><strong>Info: </strong>
                            <span class="tags" style="margin-right:5px">{{user.age}}</span> 
                            <span class="tags" style="margin-right:5px">{{user.sex}}</span>
                        </p>
                        <p v-if="isFollowing" class="st-font">{{ user.username }}님을 팔로우 중 입니다.</p>
                    </div> -->
          <div id="userlike"> <span>{{ username }} </span>님이 좋아하는 영화는 총 <span>{{likemovies.length}}개</span> </div>

          <div class="d-flex row">
          <LikeMovie
                  v-for="likemovie in likemovies" :key="likemovie.id"
                  :likemovie="likemovie"
                  class="mx-5"
                  />
          </div>
          <!-- <div>{{ likes[0]?.title }}</div> -->
          <button  @click="button" class="btn text-white btn-m"  style="background-color : rgba(83, 60, 216, 0.829)">{{ username }}님이 좋아할만한 영화 보기</button>

          <!-- <button @click="button2">출력2</button> -->
          <!-- <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel"> -->
  <div v-if="recommend_movie[0]" class="col-4 justify-content-center" >
      <div id="carouselIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner d-flex justify-content-center">
          <div class="carousel-item active ">
            <img :src="`${imgUrl}/${recommend_movie[0]?.[1]?.[2]}`" class="d-block" alt="">
          </div>
          <div class="carousel-item">
            <img :src="`${imgUrl}/${recommend_movie[1]?.[1]?.[2]}`" class="d-block" alt="">
          </div>
          <div class="carousel-item">
            <img :src="`${imgUrl}/${recommend_movie[2]?.[1]?.[2]}`" class="d-block" alt="">
          </div>
          <div class="carousel-item">
            <img :src="`${imgUrl}/${recommend_movie[3]?.[1]?.[2]}`" class="d-block" alt="">
          </div>
          <div class="carousel-item">
            <img :src="`${imgUrl}/${recommend_movie[4]?.[1]?.[2]}`" class="d-block" alt="">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>


  </h3>
</div>
</template>

<script>
import LikeMovie from '@/components/LikeMovie'

import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name : 'ProfileView',
  components: {
    LikeMovie,
  },
  data() {
    return {
      username : this.$route.params.username,
      user : this.$route.params.user,
      likes: [],
      movies: this.$store.state.movies,
      // best_movie:null,
      recommend_movie: [],
      imgUrl: 'https://www.themoviedb.org/t/p/w220_and_h330_face/',
    }
    
  },
  created() {
    // this.postLikes()
    this.likes_movies()
    // this.button()
   
  },
  // mounted() {
  //   this.button()
    // this.button2()
  // },
  methods : {
    button( ) {
      // console.log(this.movies)
      // console.log(this.likes)
      const dic = {}
      
      for (let i=0; i < this.likes.length; i++) {
        for (let j=0; j < this.likes[i].genres.length; j++) {
          // console.log(this.likes[i].genres[j]['id'])
          dic[this.likes[i].genres[j]['id']] = 1
        }
      }
      for (let i=0; i < this.likes.length; i++) {
        for (let j=0; j < this.likes[i].genres.length; j++) {
          // console.log(this.likes[i].genres[j]['id'])
          dic[this.likes[i].genres[j]['id']] += 1
        }
      }
      const sortobj1 = [];
      for (let number in dic) {
        sortobj1.push([number, dic[number]]);
      }
      sortobj1.sort(function(a, b) {
        return b[1] - a[1];
      });
      // console.log(dic)
      // console.log(sortobj1)
      const best_movie = sortobj1[0][0]
    
      const same_genres = []
      for (let i=0; i < this.movies.length; i++) {
              for (let j=0; j < this.movies[i].genres.length; j++) {
                
                if (this.movies[i].genres[j] == best_movie) {
                  same_genres.push(this.movies[i])
                }
              }
      }
      const same_genre= {}
      for (let i=0; i < same_genres.length; i++) {
          same_genre[same_genres[i].id]=[same_genres[i].vote_average, same_genres[i].title, same_genres[i].poster_path, same_genres[i].overview]
    }
    const sortobj = [];
      for (let number in same_genre) {
        sortobj.push([number, same_genre[number]]);
      }
      sortobj.sort(function(a, b) {
        return b[1][0] - a[1][0];
      })
    // console.log(sortobj)
    this.recommend_movie.push(sortobj[0])
    this.recommend_movie.push(sortobj[1])
    this.recommend_movie.push(sortobj[2])
    this.recommend_movie.push(sortobj[3])
    this.recommend_movie.push(sortobj[4])

    // for (let i=0; i < 5; i++) {
    //   this.recommed_movie=
    // }
    console.log("recommend",this.recommend_movie)
    },
    postLikes() {
      // const payload = {id:this.user, }
      this.$store.dispatch('postLikes' )
    },
    likes_movies() {
      axios({
            method: 'GET',
            url: `${API_URL}/api/v1/movies/${this.user}/likeinfo/`,
            headers: { Authorization : `Token ${ this.$store.state.token }`}
        })
        .then((res) => {
            console.log(res.data)
            this.likes = res.data
            // context.commit('MOVIE_LIKES',res.data)
          })
        
        .catch((err)=> {
            console.log(err)
    })
    },
  
},
computed: {
    likemovies() {
      return this.likes
    },

  }
}
</script>

<style scoped>
.profile{
  font-family: 'Gothic A1', sans-serif;
}
/* .profile2{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: xx-large;
} */

#userprofile {
  font-size: xx-large;
  width: 100%;
  /* border: 3px solid #dddddd ; */
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  float : right;
  }
#userlike {
   width: 40%;
  /* border: 3px solid #dddddd ; */
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 6px;
  border-image:linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
  border-image-slice: 1;
}

span{
  color: rgba(83, 60, 216, 0.829);
}
</style>