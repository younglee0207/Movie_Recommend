import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'
import router from "@/router";

Vue.use(Vuex);
const API_URL = "http://127.0.0.1:8000";
const TMDB_KEY = "12789ec2e0faadbfa7d2a97cfc1399d7"
export default new Vuex.Store({
    plugins: [
        createPersistedState(),
    ],
    state: {
        articles: [],
        token: null,
        user:null,
        movies: [],
        new_movies:[],
        detail_movie: [],
        comments: [],
        movie_comments: [],
        genre : [],
        article:{},
        likes_movies: [],

    },
    getters: {
        isLogin(state) {
            return state.token ? true :false
        },
        user: (state) => state.user,
        authHead: (state) => ({ Authorization: `Token ${state.token}`}),
        article : (state) => state.article,
        articles : (state) => state.articles

    },
    mutations: {
      GET_ARTICLE : (state, article) => state.article = article,
      GET_ARTICLES(state, articles) {
          state.articles = articles
      },
      SAVE_TOKEN(state, token) {
        state.token = token
        
      },
      SAVE_USER: (state, user) => state.user = user,
      GET_MOVIES(state, movies) {
        state.movies = movies
      },
      GET_NEW_MOVIES(state, new_movies) {
        state.new_movies = new_movies
        // console.log(state.new_movies)
      },
      GET_COMMENTS(state, comments) {
        state.comments = comments
        console.log(state.comments)
      },
      GET_DETAIL_MOVIE(state, detail_movie) {
        state.detail_movie = detail_movie
        // console.log("detail_movie",state.detail_movie)
      },
      GET_MOVIE_COMMENTS(state, comments) {
        state.movie_comments = comments
        console.log(state.comments)
      },
      MOVIE_COMMENT(state, movie_comments) {
        state.movie_comments = movie_comments
        console.log(state.movie_comments)
      },

      DELETE_ARTICLE(state,article) {
        const index = state.articles.indexOf(article)
        state.articles.splice(index, 1)
      },
      DELETE_COMMENT(state,comment) {
        const index = state.comments.indexOf(comment)
        state.comments.splice(index, 1)
      },

      DELETE_MOVIE_COMMENT(state, comment) {
        const index = state.comments.indexOf(comment)
        state.movie_comments.splice(index, 1)
      },
      POST_LIKES(state, likes) {
        state.likes_movies = likes
      }
    //   MOVIE_LIKES(state, likes_movie) {
    //     state.likes_movies.push(likes_movie)
    //     // console.log(state.likes_movies)
    //   }


    //   GET_GENRE_MOVIES(state, genre_movies) {
    //     if (this.detail_movie.genre === genre_movies.genre) {
    //         state.genre_movies = genre_movies
    //     }
    //     console.log(state.genre_movies)
    //   }
      
      
    //   DELETE_ARTICLE(state,article_id) {
    //     state.articles = state.articles.filter((article) => {
    //         return !(article.id === article_id)
    //     })
    //   }
    },
    actions: {
        getArticle({ commit }, articleId) {
            axios({
                url: `${API_URL}/api/v1/articles/${articleId}/`
              })      
                .then(res => {
                  console.log(res)
                  commit('GET_ARTICLE', res.data)
                })
        },

        getArticles(context) {
            axios({
                method: "get",
                url: `${API_URL}/api/v1/articles/`,
                headers: {
                    Authorization : `Token ${ context.state.token }`
                }
            })
                .then((res) => {
                    // console.log(res, context);
                    // console.log(res.data)
                    context.commit('GET_ARTICLES', res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getMovies(context) {
            axios({
                method: "get",
                url: `${API_URL}/api/v1/movies/`,
                // headers: {
                //     Authorization : `Token ${ context.state.token }`
                // }
            })
            .then((res) => {
                context.commit('GET_MOVIES',res.data)
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
        },
        signUp(context, payload) {
        
            axios({
                method: 'post',
                url: `${API_URL}/accounts/signup/`,
                data: {
                    username: payload.username,
                    password1: payload.password1,
                    password2: payload.password2,
                }
            })
            .then((res) => {
                // console.log(res)
                context.commit('SAVE_TOKEN', res.data.key)
            axios({
                url: `${API_URL}/accounts/user/`,
                method: 'get',
                headers: {
                    Authorization : `Token ${ res.data.key }`
                }
            })
            .then(res => {
                console.log(res)
                context.commit('SAVE_USER', res.data)
            })
            .catch(err => { console.log(err)})
            })
            
            
        },
        logIn(context, payload) {
            axios({
                method: 'post',
                url: `${API_URL}/accounts/login/`,
                data: {
                    username: payload.username,
                    password: payload.password,
                }
            })
            .then((res) => {
                // console.log(res)
                context.commit('SAVE_TOKEN', res.data.key)
                // context.commit('SAVE_USER', res.data.key)
                // this.getUserInfo()
            axios({
                url: `${API_URL}/accounts/user/`,
                method: 'get',
                headers: {
                    Authorization : `Token ${ res.data.key }`
                }
            })
            .then(res => {
                console.log(res)
                context.commit('SAVE_USER', res.data)
            })
            .catch(err => { console.log(err)})
            })
            .catch((err) => {
                alert('아이디와 비밀번호를 확인해 주세요', err)
            })
        },
        logout( { commit, getters} ) {
            axios({
                url:`${API_URL}/accounts/logout/`,
                method : 'post',
                headers : getters.authHead,
            })
            .then(res => {
                console.log(res)
                commit('SAVE_TOKEN', null)
                commit('SAVE_USER', null)
                router.push({ name: 'LogInView'})

            })
            .catch(err => console.log(err))
        },

        getNewMovies(context) {
            axios({
                method: 'get',
                url : `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=ko-KR`
            })
            .then((res) => {
                context
                // console.log(res.data.results)
                for (let i = 0; i < res.data.length; i++) {
                    this.new_movies.push(res.data.results[i])
                }
                // console.log(this.new_movies)
                context.commit('GET_NEW_MOVIES', res.data.results);
            })
        },
        getDetailMovie(context, payload) {
            // console.log(payload)
            context.commit('GET_DETAIL_MOVIE', payload)
        },
        getComments(context) {
            axios({
                method: "get",
                url: `${API_URL}/api/v1/comments/`,
                // headers: {
                //     Authorization : `Token ${ context.state.token }`
                // }
            })
                .then((res) => {
                    // console.log(res, context);
                    // console.log(res.data)
                    context.commit('GET_COMMENTS', res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        postLikes(context, payload) {
            axios({
              method : 'get',
              url : `${API_URL}/api/v1/movies/${payload.id}/like/${payload.user}`,
            // headers: {
            //         Authorization : `Token ${ context.state.token }`
            //     }
            })
            .then((res) => {
                console.log(res)
                context.commit('POST_LIKES', res.data)
            })
            .catch((err) => {
                console.log(err)
            })
          
          },
        createArticle({ getters }, payload) {
            axios({
              url: `${API_URL}/api/v1/articles/`,
              method: 'post',
              data: {...payload},
              headers: getters.authHead
            })
            .then(res => {
              console.log(res)
              router.push({ name: 'ArticleView'})
              
            })
            .catch(err => console.log(err))
        },
        updateArticle({ getters }, payload) {
            axios({
              url: `${API_URL}/api/v1/articles/${payload.id}/`,

              method: 'put',
              data: {...payload},
              headers: getters.authHead
            })
            .then(res => {
                // console.log(3)
              console.log(res)
              router.push({ name: 'ArticleView'})
              
            })
            .catch(err => console.log(err))
        },

        deleteArticle(context, payload) {
            axios({
                method: "delete",
                url: `${API_URL}/api/v1/articles/${payload.id}`,
                
                headers: {
                    Authorization : `Token ${ context.state.token }`
                }
            })
                .then((res) => {
                    // console.log(res)
                    context.commit('DELETE_ARTICLE', res)
                    router.push({ name: 'ArticleView'})
                })
                .catch((err) => {
                    console.log(err);
                });   
          },
        MovieComment(context, payload) {
            // console.log(payload)
            context.commit('MOVIE_COMMENT', payload)
          },
        getMovieComments(context) {
            axios({
                method: "get",
                url: `${API_URL}/api/v1/comment_list/`,
                headers: {
                    Authorization : `Token ${ context.state.token }`
                }
            })
                .then((res) => {

                    context.commit('GET_MOVIE_COMMENTS', res.data)
                
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        deleteComment(context, payload) {

            console.log(payload.id)
            axios({
                method: "delete",
                url: `${API_URL}/api/v1/comments/${payload.id}`,
                
                headers: {
                    Authorization : `Token ${ context.state.token }`
                }
            })
            .then((res) => {
                context.commit('DELETE_COMMENT', res.data)
                router.go()
            })
            .catch((err) => {
                console.log(err);
            });   
        },
        deleteMovieComment(context, payload) {
            console.log(payload.movie.id, payload.comment.id)
            axios({
                method: "delete",
                url: `${API_URL}/api/v1/movies/comment/${payload.comment.id}`,
                
                headers: {
                    Authorization : `Token ${ context.state.token }`
                }
            })
            .then((res) => {
                context.commit('DELETE_MOVIE_COMMENT', res.data)
                router.go()
            })
            .catch((err) => {
                console.log(err);
            });   
        },
        getUserInfo({ commit, getters }) {
            axios({
              url: `${API_URL}/accounts/user/`,
              method: 'get',
              headers: getters.authHead,
          })
          .then(res => {
            console.log(res)
            commit('SAVE_USER', res.data)
          })
          .catch(err => { console.log(err)})
        },
          
        
        // getProfile(payload) {
        //     axios({
        //         method : 'post',
        //         url : `${API_URL}/profile/${payload}/`
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         router.push({ name: 'ProfileView'})
        //     })
        // }

          

        
    },
    modules: {},
});
