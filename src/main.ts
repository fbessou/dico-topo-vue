/* eslint-disable no-new */
import Vue from 'vue'
import '@/plugins/highlight'

import store from './store/index'

import 'leaflet/dist/leaflet.css'
import { createRouter } from '@/router'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = true

new Vue({
  el: '#app',
  store: store,
  vuetify,
  router: createRouter()
})
