import Vue from "vue";
import VueRouter from "vue-router";
import ArticleView from "@/views/ArticleView";
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MovieView from '@/views/MovieView'
import MovieDetailView from '@/views/MovieDetailView'
import UpdateView from '@/views/UpdateView'
import ProfileView from '@/views/ProfileView'
// import WishListView from '@/views/WishListView'
Vue.use(VueRouter);

const routes = [
  {
      path: '/movies',
      name: 'MovieView',
      component: MovieView,
    },
    {
        path: "/article",
        name: "ArticleView",
        component: ArticleView,
    },
    {
      path: '/create',
      name: 'CreateView',
      component: CreateView
    },
    {
      path: '/signup',
      name: 'SignUpView',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'LogInView',
      component: LogInView
    },
    {
      path: '/update',
      name: 'UpdateView',
      component: UpdateView,
    },
    {
      path: '/profile/:username',
      name: 'ProfileView',
      component: ProfileView,
    },
    {
      path: '/articles/:id',
      name: 'DetailView',
      component: DetailView,
    },
    {
      path: '/movies/:id',
      name: 'MovieDetailView',
      component: MovieDetailView
    },
    // {
    //   path: '/wishlist',
    //   name: 'WishListView',
    //   component: WishListView
    // },


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
