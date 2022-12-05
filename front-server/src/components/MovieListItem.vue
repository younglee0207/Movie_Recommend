<template>
  <!-- <div class="col-3">
    {{movie.title}}
  </div> -->
  <div class="col-3">
    <div
      class="card mx-1 my-3 w-75 text-white"
      style="display: inline-block; background-color : #333;"
      
      >
      <div class="likemovie">

      <div class="card mx-1 my-1 ">
       <router-link :to="{name:'MovieDetailView', params: { id: movie.id } }">
          <img :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
              class="card-img-top"
              style="height: 300px;"
              @click="getDetailMovie"
          >
          <figcaption>
            <h3> {{ movie.title }}  </h3>
            <p> 평점: {{ movie.vote_average }} </p>
            <p> {{ movie.release_date }} 개봉</p>
            <!-- <p v-if="movie.genres[0]"> # {{ movie.genres[0]?.['name']}} </p>
            <p v-if="movie.genres[1]"> # {{ movie.genres[1]?.['name']}} </p>
            <p v-if="movie.genres[2]"> # {{ movie.genres[2]?.['name']}} </p>
            <p v-if="movie.genres[3]"> # {{ movie.genres[3]?.['name']}} </p>
            <p v-if="movie.genres[4]"> # {{ movie.genres[4]?.['name']}} </p> -->
            <p id="overview"> 줄거리 : {{ movie.overview }}</p>
          </figcaption>
        </router-link>
      </div>
        <div class="card-body">
          <span class="title">{{movie.title}}</span> <br>
          
          <span class="origintitle my-1">{{movie.original_title}}</span>

        </div>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "MovieListItem",
    props: {
      movie : Object,
    },
    data() {
      return {
        imgUrl: 'https://www.themoviedb.org/t/p/w220_and_h330_face/',
      }
    },
    methods : {
      getDetailMovie() {
        const payload = this.movie
        this.$store.dispatch('getDetailMovie', payload)
      }
    }


}
</script>

<style>
.title {
  font-size: large;
  }
.likemovie {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 150px;
  max-width: 315px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  background-color: #000000;
}
.likemovie * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.likemovie img {
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
}
.likemovie:after,
.likemovie figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.likemovie:after {
  content: '';
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
  opacity: 0;
}
.likemovie figcaption {
  z-index: 1;
  padding: 10px;
  color: white;
}
.likemovie h3,
.likemovie .links {
  width: 100%;
  margin: 5px 0;
  padding: 0;
}
.likemovie h3 {
  line-height: 1.1em;
  font-weight: 700;
  font-size: 1.4em;
  text-transform: uppercase;
  opacity: 0;
}
.likemovie figcaption p {
  font-size: 1em;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0;
  top: 50%;
  -webkit-transform: translateY(40px);
  transform: translateY(40px);
  
}
.likemovie i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 20px 25px;
  font-size: 34px;
  opacity: 0;
  -webkit-transform: translateX(-10px);
  transform: translateX(-10px);
}

.likemovie:hover img,
.likemovie.hover img {
  zoom: 1;
  filter: alpha(opacity=50);
  -webkit-opacity: 0.5;
  opacity: 0.5;
}
.likemovie:hover:after,
.likemovie.hover:after {
  opacity: 1;
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.likemovie:hover h3,
.likemovie.hover h3,
.likemovie:hover p,
.likemovie.hover p {
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  opacity: 1;
}

#overview {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>