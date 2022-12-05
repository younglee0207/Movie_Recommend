<template>
  <div>
    <h4> Update </h4>
    <ArticleForm :article="article" action="update" />
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm'
export default {
    name: 'UpdateView',
    components: {
      ArticleForm,
    },
    data() {
      return{      
        article : {
          title:this.$route.params.title,
          content:this.$route.params.content,
          id:this.$route.params.id
          },
      }

    },

    // computed: {
    //   article() { 
    //     return this.$store.getters.article 
    //     }
      
    // },
  
}
</script>

<style>

</style>
