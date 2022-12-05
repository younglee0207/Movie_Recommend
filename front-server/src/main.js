import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@fortawesome/fontawesome-free/js/all.js'
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
