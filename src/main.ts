import Vue from 'vue'
import '@/plugins/highlight'

// import App from './App.vue'
import store from './store/index'

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { createRouter } from '@/router'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = true

// this part resolve an issue where the markers would not appear
// delete Icon.Default.prototype._getIconUrl
/*
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
*/

new Vue({
  el: '#app',
  store: store,
  vuetify,
  router: createRouter()
})
