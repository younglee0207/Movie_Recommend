<template>

<div class="likemovie">
    <img :src="`${imgUrl}/${ likemovie.poster_path }`" alt="">
      <router-link :to="{name:'MovieDetailView', params: {id: likemovie.id} }" style="color:white;">
      <figcaption>
          <h3> {{ likemovie.title }}  </h3>
          <p> 평점: {{ likemovie.vote_average }} </p>
          <p> {{ likemovie.release_date }} 개봉</p>
          <p v-if="likemovie.genres[0]"> # {{ likemovie.genres[0]?.['name']}} </p>
          <p v-if="likemovie.genres[1]"> # {{ likemovie.genres[1]?.['name']}} </p>
          <p v-if="likemovie.genres[2]"> # {{ likemovie.genres[2]?.['name']}} </p>
          <p v-if="likemovie.genres[3]"> # {{ likemovie.genres[3]?.['name']}} </p>
          <p v-if="likemovie.genres[4]"> # {{ likemovie.genres[4]?.['name']}} </p>
          <p> 줄거리 : {{ likemovie.overview }}</p>
      </figcaption>
        </router-link>
</div>

</template>

<script>
export default {
    name: 'LikeMovie',
    props: {
        likemovie: Object
    },
    data() {
        return {
            imgUrl: 'https://www.themoviedb.org/t/p/w220_and_h330_face/',
        }
    },
    method: {
      button() {
        console.log(this.likemovie)
      }
    }
    
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Raleway:300,700);
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
.likemovie {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
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