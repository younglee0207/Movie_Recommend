<template>
  <div id="app">
    <br><br><br>
    <MovieList/>
    
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'
export default {
    name: 'MovieView',
    components: {
        MovieList,
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
    methods: {
        getMovies() {
            if (this.isLogin) {
                this.$store.dispatch("getMovies")
            }
            // } else {
            //     alert('로그인이 필요합니다')
            //     this.$router.push({name:'LogInView'})
            // }
        },
        getNewMovies() {
            if (this.isLogin) {
                this.$store.dispatch("getNewMovies")
            } 
        }
    },
    created() {
        this.getMovies()
        this.getNewMovies()
    },

}
</script>

<style>

</style>