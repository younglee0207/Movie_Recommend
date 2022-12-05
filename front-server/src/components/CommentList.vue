<template>
<div>
  <div class="d-flex flex-row justify-content-between my-0 py-0">
      <router-link :to="{ name:'ProfileView', params: { username : comment.username, user : comment.user } }">{{ comment.username }}</router-link>
    <p class="m-0">{{ comment.content }}</p>
    <div class="d-flex">
      <p class="my-0 mx-1">{{ comment.updated_at }}</p>
      <!-- <p click="getProfile" ></p> -->
        <button v-if ="user === comment.user" class="btn my-0 py-0 px-1 btn-sm btn-secondary text-white" @click = "deleteComment">X</button><br>
      <!-- <button @click="button">출력</button> -->
    </div>
  </div>
  <hr>
</div>
</template>

<script>
export default {
    name : "CommentList",
    
    props: {
        comment : Object,
        user : Object,
    },
    // computed : {
    //     sorting() {
    //         if (this.comment.article_id === this.$route.params.id) {
    //             this.sorted_comment = comment
    //         }
    //     }
    // // },
    // created() {
    //   this.deleteComment() //쓰면은 자동삭제됨
    // },
    methods : {
      button(){
        console.log(this.comment)
      },
      deleteComment(){
        this.$store.dispatch("deleteComment", this.comment)
      },
      // getProfile() {
      //   const payload = this.comment.username
      //   this.$store.dispatch("getProfile",payload)
      // }
    //   getCommentDetail() {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/api/v1/comments/${this.$route.params.id}`
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     this.comment = res.data
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // },
    }
}
</script>

<style>

</style>
