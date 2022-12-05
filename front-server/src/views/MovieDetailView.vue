<template>
  <div id="app">
    <br><br><br>
    <h1>Movie Info</h1>
    <MovieDetail
     />
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail'
export default {
    name: 'MovieDetailView',
    components: {
        MovieDetail,
    },



}
</script>

<style>

</style>