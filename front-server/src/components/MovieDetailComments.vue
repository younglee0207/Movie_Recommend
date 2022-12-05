<template>
  <div class="d-flex flex-row justify-content-between py-0">
    <div  class="col-2">
    <router-link class = "text-white" :to="{ name:'ProfileView', params: { username : comment.username, user : comment.user } }">{{ comment.username }}</router-link>
    </div>
    <div  class="col-8">
      <p> {{ comment.content }} </p>
    </div>

    <div class="d-flex col-2">
      <p >{{ comment.updated_at }}</p>
      <button v-if ="user.pk === comment.user" class="btn py-0 px-1 btn-sm btn-secondary text-white" @click = "deleteMovieComment">X</button><br>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MovieDetailComments',
    data() {
      return {
        user : this.$store.state.user
      }
    },
    props: {
      comment:Object,
      movie:Object
    },
    methods : {
      deleteMovieComment(){
        const payload = {comment : this.comment, movie : this.movie}
        this.$store.dispatch("deleteMovieComment", payload)
      },

    },
    
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
