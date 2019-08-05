import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Install from '@/Install'

Vue.use(Install)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
