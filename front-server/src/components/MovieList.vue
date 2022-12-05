<template>
<div id="app">
    <br>
    <h1> 인기영화 </h1>
    <div class="container background2">
        <div id="plus" class="d-flex row">
            <MovieListItem 
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            />
        </div>
        
        <h1> 최신 영화</h1>
        <div class="d-flex row">
            <MovieListNew
            v-for="(new_movie, index) in new_movies"
            :key="index"
            :new_movie="new_movie"
            />

        </div>
    </div>
</div>
</template>

<script>
import MovieListNew from '@/components/MovieListNew'
import MovieListItem from '@/components/MovieListItem'
export default {
    name: 'MovieList',
    components: {
        MovieListItem,
        MovieListNew,
    },
    methods : {
        button() {
            console.log(this.movies)
            }
        },
    computed: {
        movies() {
            return this.$store.state.movies
        },
        new_movies() {
            
            return this.$store.state.new_movies
        },
        
    },
}
</script>

<style>
 .plus{ position: absolute;top:0px;right: 0px; width: 31px;height:31px; background-color: #eaeaea; cursor:pointer; z-index: 1; }
 .plus:before{ position:absolute; top: 50%; left: 50%; width: 16px; height: 2px; margin: -1px 0 0 -8px; background: #fff; content: ''; }
 .plus:after{position: absolute; top: 50%; left: 50%; width: 2px; height: 16px; margin: -8px 0 0 -1px; background: #fff; content: ''; }
</style>