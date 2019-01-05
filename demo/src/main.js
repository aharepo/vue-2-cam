import Vue from 'vue'
import App from './main.vue'

// import WebCam from 'plugin'
// Vue.use(WebCam)

import Vuetify from 'vuetify'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
