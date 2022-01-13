import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// import router from '@/router/index'
// import store from '@/store/index'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;
axios.defaults.headers.common["Authorization"] = "30ee585c-820e-4b10-aa59-0946b2087400";

new Vue({
  render: h => h(App),
}).$mount('#app')
