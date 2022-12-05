<template>
  <div id="app" style="height:1000px">
    
    <div class="background" style="margin-top:50px; margin-bottom:50px; padding-top:200px; padding-bottom:50px; height:700px">
    <!-- <i class="fa-solid fa-folder-open fa-2xl"></i> -->
    <!-- <img src="../assets/login_curtain.png" alt="Noimg"> -->
    <h1 style="color:"> Login </h1>
    <form @submit.prevent="logIn">

      <div class="dust-class">
        <!-- <label for="username" style="color:red" class="mx-3"> <span>*</span> 아이디  </label> -->
        <input type="text" id="username" v-model="username" placeholder="아이디를 입력하세요"><br>
      </div>
      <br>
      <div class="dust-class">
        <!-- <label for="password" style="color:red" class="mx-2"> 비밀번호  </label> -->
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요"><br>
      </div>

      <input type="submit" value="logIn" class="btn text-white btn-m"  style="background-color : rgba(83, 60, 216, 0.829)">
    </form>

    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
// const API_URL = "http://127.0.0.1:8000";

export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,

    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    logIn() { 
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      if (!username) {
        alert('아이디를 입력해주세요!')
      } else if (!password) {
        alert('비밀번호를 입력해주세요!')
      } else {
        this.$store.dispatch('logIn', payload)
        // this.$store.dispatch('getUserInfo')
      }
      this.$router.push({ name: 'MovieView'})
    },
    
  }
}
</script>

<style>
.background {
  overflow: -moz-hidden-unscrollable;
  background-image: url("../assets/puplemesh.png");
  border-radius: 8px;
}

.background2 {
  overflow: -moz-hidden-unscrollable;
  background-image: url("../assets/purplemesh2.png");
  border-radius: 8px;
}
.dust-class{
  width: 30%; 
  box-sizing: border-box;
  margin: 5px auto;
  position: relative;

}
.dust-class input{
    width: 100%;
    border: 1px solid #dddddd !important;
    font-size: 1rem;
    line-height: 1.45;
    letter-spacing: -0.04rem;
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
}
</style>