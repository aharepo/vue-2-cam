import Vue from 'vue'
import App from './main.vue'

// import WebCam from 'plugin'
// Vue.use(WebCam)

import Vuetify from 'vuetify'
console.log(process.env)
Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
