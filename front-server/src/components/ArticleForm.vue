<template>
  <div style="height:800px">
    <form @submit.prevent="onSubmit">
      <br>
        <div class="d-flex justify-content-start">
        <input type="text" v-model.trim="title" placeholder="제목"> 
        </div>
        <br>

         
        <textarea cols="120" rows="20" v-model.trim="content" placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."></textarea><br>
        <div class="d-flex justify-content-end">
        
        <router-link class="btn text-white btn-m mx-2"  style="background-color : grey" :to="{ name: 'ArticleView' }">취소</router-link>
        <br>
        <button type="submit" class="btn text-white btn-m"  style="background-color : rgba(83, 60, 216, 0.829)">제출</button>

        </div>
    
    </form>
  </div>
</template>

<script>
export default {
    name: 'ArticleForm',
    props:{
        article: Object,
        action: String,
    },
    data() {
        return { 
          title: this.article.title, 
          content: this.article.content, 
          id: this.article.id,
          }
    },
    methods: {
        createArticle() {
          // console.log(2)
            const payload = { title: this.title, content: this.content }
            this.$store.dispatch('createArticle', payload)
            
        },
        updateArticle() {
          // console.log(1)
          // console.log(this.article)
          const payload = { title: this.title, content: this.content, id: this.id }
            this.$store.dispatch('updateArticle', payload)

        },
        onSubmit() {
            if (this.action === 'create') {
                this.createArticle()
            } else {
                this.updateArticle()
            }
        }
    }
}
</script>

<style>

</style>
