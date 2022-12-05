<template>
  <div>
    <img :src="`${imgUrl}${movie.poster_path}`" style="width:100px; height:100px">
    {{ movie.title }}
    
  </div>
</template>

<script>
export default {
    name: 'RecommendMovie1',
    props: {
        movie: Object,
    },
    data() {
      return {
        imgUrl: 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
      }
    }
}
</script>

<style>

</style>