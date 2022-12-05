<template>
  <div id="app" style="height:1000px">
    <div class="background " style="margin-top:50px; margin-bottom:50px; padding-top:120px; padding-bottom:50px; height:700px">
    <br><br><br>
    
    <h1>회원가입</h1>
    <form @submit.prevent="signUp">
      <!-- <label for="username">username : </label> -->
      <input type="text" id="username" v-model="username" placeholder="사용할 이름을 입력하세요"><br>

      <!-- <label for="password1"> password : </label> -->
      <input type="password" id="password1" v-model="password1" placeholder="사용할 비밀번호를 입력하세요"><br>

      <!-- <label for="password2"> password confirmation : </label> -->
      <input type="password" id="password2" v-model="password2" placeholder="비밀번호를 재입력하세요"> <br>

      <br>
      <input type="submit" value="SignUp" class="btn text-white btn-m"  style="background-color : rgba(83, 60, 216, 0.829)">
      
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,

    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2


      const payload = {
        username: username,
        password1: password1,
        password2: password2,

      }
      
      this.$store.dispatch('signUp', payload)
      this.$router.push({ name: 'MovieView'})
    }
  }
}
</script>

<style scoped>
#username {
  font-size: large;
  width: 60%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  font-weight:bold;
  transition: color 1s;
  margin-bottom: 5px;
}

#password1 {
  font-size: large;
  width: 60%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  font-weight:bold;
  transition: color 1s;
  margin-bottom: 5px;
}

#password2 {
  font-size: large;
  width: 60%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  font-weight:bold;
  transition: color 1s;
  margin-bottom: 5px;
}

#first_name {
  font-size: large;
  width: 60%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  font-weight:bold;
  transition: color 1s;
  margin-bottom: 5px;
}

#last_name {
  font-size: large;
  width: 60%;
  border: 3px solid #dddddd ;
  line-height: 1.45;
  letter-spacing: -0.04rem;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  font-weight:bold;
  transition: color 1s;
  margin-bottom: 5px;
}

</style>