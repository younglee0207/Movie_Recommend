<template>
  <div id="app">
    <br><br><br>
    <div class="d-flex justify-content-center">
    <div class="d-flex flex-row">
      <div class="d-flex flex-column">
    <h4>게시글 등록</h4>
    <hr>
    <ArticleForm :article="article" action="create" />
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm'
export default {
    name: 'CreateView',
    components: {
        ArticleForm,
    },
    data() {
      return {
        article: {id: null, title:'', content:''}
      }
    }
}
</script>

<style>

</style>
