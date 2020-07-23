/* eslint-disable no-new */
import Vue from 'vue'
import '@/plugins/highlight'

import store from './store/index'

// import 'leaflet/dist/leaflet.css'
import { createRouter } from '@/router'

import vuetify from './plugins/vuetify'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = true

Vue.use(VueClipboard)

new Vue({
  el: '#app',
  store: store,
  vuetify,
  router: createRouter()
})
