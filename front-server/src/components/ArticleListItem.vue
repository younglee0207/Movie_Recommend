<template>
    <div class="row">
        <div class="d-flex flex-row justify-content-between" >
                <p> {{ article.id }}</p>
                <router-link @click = "getUserInfo" :to="{name:'DetailView', params: { id: article.id } }">
                <div>
                
                <p class="text-white"> {{ article.title}} </p>
            
                </div>
                </router-link>
                <router-link class = "text-white" :to="{ name:'ProfileView', params: { username : article.username, user : article.user } }">{{ article.username }}</router-link>
        </div>
        <hr>
        
    </div>
</template>

<script>
export default {
    name: "ArticleListItem",
    props: {
        article: Object,
    },
    methods : {
    getUserInfo() {

      this.$store.dispatch("getUserInfo")
      console.log(this.user.pk, this.article.user)
    },
    },
};
</script>

<style scoped>
hr {
  
  background-color : pink;
}

a {
  text-decoration:none;
}
</style>
