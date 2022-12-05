<template>
    <div class="container">
        
        
        <div>
        <div class="d-flex justify-content-between my-0">
        <p class="my-0">번호</p>
        <p class="my-0 font-weight-bold">제목</p>
        <p class="my-0">글쓴이</p>
        </div>
        <hr>
        <div id="app">

            <ArticleListItem
                v-for="article in articles"
                :key="article.id"
                :article="article"
            />
        </div>
        </div>
    </div>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem";
export default {
    name: "ArticleList",
    components: {
        ArticleListItem,
    },
    computed: {
        articles() {
            return this.$store.state.articles;
        },
    },
};
</script>

<style scoped>
.article-list {
    text-align: start;
}

</style>
