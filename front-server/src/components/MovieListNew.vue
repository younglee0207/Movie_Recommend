<template>
  <div class="col-3">
    <div
      class="card mx-1"
      style="display: inline-block"
      :new_movie="new_movie"
      >
      <router-link :to="{ name: 'MovieDetailView' }">
        <img
        :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${new_movie.poster_path}`"
        class="card-img-top"
        style="height: 400px"
          />
        <div class="card-body">
          <span>{{new_movie.title}}</span>

        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name : 'MovieListNew',
  props : {
    new_movie : Object,
  }
}
</script>

<style>

</style>