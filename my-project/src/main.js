import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import store from './store/store'
import router from './router'
Vue.prototype.axios = axios;
new Vue({
  el: '#app',
  axios,
  router,
  store,
  render: h => h(App)
})
