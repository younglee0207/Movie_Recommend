<template>
<div id="app" style="height:1000px;">
  <div class="">
    <div class="mx-5 my-5 py-5">
    <h1>Community Page</h1>
    <hr>
    <div class= "d-flex row">
      <div class="d-flex flex-column justify-content-start">
        <p class="d-flex justify-content-start my-0">글 번호 : {{ article?.id }}</p>
        <p class="d-flex justify-content-start my-0">제목 : {{ article?.title }}</p>
        <p class="d-flex justify-content-start">작성자 : {{ article?.username }}</p>
      </div>
      <div class="d-flex flex-column">
      <p class="d-flex justify-content-start">내용 : {{ article?.content }}</p>
      <p  class="d-flex justify-content-start my-0">작성시간 : {{ article?.created_at }}</p>
      <p  class="d-flex justify-content-start">수정시간 : {{ article?.updated_at }}</p>
      </div>
    </div>

  <div class="d-flex justify-content-between">
    <div>
      <router-link class="btn text-white btn-sm"  style="background-color : rgba(83, 60, 216, 0.829)" :to="{ name: 'ArticleView' }">전체글</router-link>
    </div>
      <!------------------------------------------ 여기바꿈 ------------------------------------------>

    <div class="d-flex">
      <button v-if="user.pk===article.user" class="mx-1 btn text-white btn-sm" style="background-color : rgba(83, 60, 216, 0.829)" @click = "deleteArticle">삭제</button>
      <router-link v-if="user.pk===article.user" class="mx-1 btn text-white btn-sm" style="background-color : rgba(83, 60, 216, 0.829)" :to="{ name: 'UpdateView' ,params: { id: article.id ,content : article.content, title : article.title } } ">수정</router-link>
      <!-- <button @click="getUserInfo" >확인</button> -->
      <!------------------------------------------ 여기바꿈 ------------------------------------------>

    </div>
    
  </div>
    



    <hr>
    <div>
      <h4 class="d-flex">전체 댓글</h4>

      <hr>
      <div class="d-flex justify-content-between my-0">
        <p class="my-0">작성자</p>
        <p class="my-0 font-weight-bold">내용</p>
        <p class="my-0">시간</p>
        </div>
        <hr>
      <!------------------------------------------ 여기바꿈 ------------------------------------------>
      <CommentList
        :user="user.pk" 
        v-for="(comment, i) in comments.filter((c) => c.article === article?.id)"
        :key="i"
        :comment="comment"
        
      />
      <!------------------------------------------ 여기바꿈 ------------------------------------------>

      <!-- <p>{{comment2?.content}}</p>
      <p>{{ comment2.content }}</p> -->

    </div>
    <!-- <hr style="border: 1px-solid-rgba(83, 60, 216, 0.829) "> -->
    <div>
    <div class="d-flex">
      <textarea
      v-model="InputData"
      placeholder="댓글을 입력하세요"
      rows="3"
      max-rows="6"
      style="width:100%"
    ></textarea>
    </div>
    <div class="d-flex flex-row justify-content-end my-1">
      <button @click="saveComment" class="btn text-white btn-sm" style="background-color : rgba(83, 60, 216, 0.829)">등록</button></div>

    </div>
  </div>
  </div>
</div>
</template>

<script>
import CommentList from "@/components/CommentList"
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  data() {
    return{
      article: null,
      InputData: null,
          }
  },

  components: {
    CommentList,
  },

  created() {
    this.getArticleDetail()
    // this.getCommentDetail()
    this.getComments()
    this.deleteArticle() //이놈을 왜 필요한거지? deletecomment할때 낚임
    const articleId = this.$route.params.id
    this.$store.dispatch('getArticle', articleId)
    this.getArticle()
    // this.isUser()
    this.getUserDetail()
    // this.getUserInfo()

  },

  computed: {
    comments() {
        return this.$store.state.comments;
    },
    user() {
      return this.$store.state.user
    }

  },

  methods: {
    // getArticle() {
    //   this.$store.dispatch("getArticle", this.article)
    // },

    deleteArticle(){
      this.$store.dispatch("deleteArticle", this.article)
    },
    getComments() {
      this.$store.dispatch("getComments")
    },
    // getUserInfo() {

    //   this.$store.dispatch("getUserInfo")
    //   console.log(this.user.pk, this.article.user)
    // },

    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}`
      })
      .then((res) => {
        // console.log(res)
        this.article = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },

    ////////////////////////////////////////////////여기바꿈//////////////////////////////
    saveComment() {
      // console.log("유저",this.user.pk, this.article.user)
      const content = this.InputData
      // console.log(this.article)
      if (!content) {
        alert('댓글을 입력하세요')
        return
      } 
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/comments/`, // 맞을지? 아니면 /articles/comments
        data : {
          content : content,
          user : this.user.pk,
          username : this.user.username
        },
        headers: {
            Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((res) => {
        // console.log(1)
        console.log(res)
       this.$router.go() 
      })
      .catch((err)=> {
        console.log(err)
      })
    },
        ////////////////////////////////////////////////여기바꿈//////////////////////////////

    // getCommentDetail() {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/api/v1/comments/${this.$route.params.id}`
    //   })
    //   .then((res) => {
    //     // console.log(res)
    //     // console.log(1)
    //     this.comment2 = res.data
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
    
    
  }
}
</script>

<style scoped>
.box {
  background-color:rgba(83, 60, 216, 0.829) ;
}
</style>
