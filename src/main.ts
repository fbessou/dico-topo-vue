import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import Vuetify from 'vuetify'

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

// this part resolve an issue where the markers would not appear
// delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
