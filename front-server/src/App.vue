<template>
    <b id="app">
      <c class="background">
        <nav class="p-0">



          <div class="d-flex justify-content-between">
            <li>
              <router-link class = "dropbtn" :to="{ name: 'MovieView' }"><i class="fa-solid fa-house fa-2xl" style="color:white" ></i></router-link>
              
              <router-link :to="{ name: 'ArticleView' }">커뮤니티</router-link>
              <router-link class = "dropbtn" :to="{ name: 'MovieView' }">영화</router-link>

            </li>
            <div class="d-flex  justify-content-left">

              <!-- <li class="dropdown">            
                  <div class="dropdown-content">
                      <router-link :to="{ name: 'MovieView' }">전체 영화 목록</router-link>
                      <a href="#">내가 보고싶은 영화</a>
                      <a href="#">추천영화</a>
                  </div>
              </li> -->
              <li><router-link v-if="user" :to="{ name: 'ProfileView', params: { username : user.username, user: user.pk }  }">프로필</router-link></li>
              <li><router-link v-if="!isLogin" :to="{ name: 'SignUpView' }">회원가입</router-link></li> 
              <li><router-link v-if="!isLogin" :to="{ name: 'LogInView' }">로그인</router-link></li>
              <li><div class="btn text-white" style="padding-top:13px" v-if="isLogin" @click="logout">로그아웃</div></li>
              <p class="float-right" style="color:grey">{{ now }}</p>

              <!-- <button @click="button">출력</button> -->
            </div>
          </div>

        </nav>
        <router-view />
        </c>
    </b>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      now: "00:00:00"
    }
  },
  
  methods: {
    button() {
      console.log(this.user)
    },
    time() {
      const date = new Date();
      this.now = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      // console.log(date)
      // console.log(this.now)
    },
    logout() { 
      this.$store.dispatch('logout')}
    ,
    //  getUserInfo() {

    //   this.$store.dispatch("getUserInfo")
    //   console.log(this.user.pk, this.article.user)
    // },

    
  },
  computed: {
    isLogin() { return this.$store.getters.isLogin}
    ,
    // user() {
    //   return this.$store.state.user
    // }
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.time()
    setInterval(this.time.bind(this) , 1000)
  }
}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background-color:black ;
    /* 789AE8 */
}

/* nav {
    padding: 30px;
    float: left;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
/// */
nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgba(103, 82, 223, 1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  padding: 10px;
}

li {
  float: left;
}

li a, .dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover, .dropdown:hover .dropbtn {
  background-color: rgb(234, 238, 238);
}

li.dropdown {
    display: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  /* position: absolute; */
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
}

/* .container1 {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.container1::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("./assets/logo.png");
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
} */

/* .background{
  height: 100vh;
  overflow: hidden;
  margin:0;
  background-image: url("./assets/logo.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
} */

</style>
