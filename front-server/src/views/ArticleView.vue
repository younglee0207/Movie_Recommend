<template>
    <div  id="app" style="height:1000px">
        <br><br><br><br>
        <h1>커뮤니티</h1>
        <div class="container d-flex " >
        <router-link class="btn text-white btn-sm"  style="background-color : rgba(83, 60, 216, 0.829)" :to="{ name: 'CreateView' }"> 새글쓰기 </router-link>
        </div>
        <hr>
        <ArticleList />
        <!-- <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br> -->
    </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";

export default {
    name: "ArticleView",
    components: {
        ArticleList,
        
    },
    
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
    created() { //함수에 입력되지 않아도 실행
        this.getArticles();
    },
    methods: {
        getArticles() {
            if (this.isLogin) {
                this.$store.dispatch("getArticles") //dispatch로 store의 actions에 호울
            } else {
                alert('로그인이 필요합니다.')
                this.$router.push({ name: 'LogInView'})
            }
                
        },
    },
};
</script>

<style>
.color {
    background-color: #2c3e50;
}

</style>
