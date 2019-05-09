import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/highlight'

//import App from './App.vue'
import store from './store/index'
import Vuetify from 'vuetify'

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import HomePage from "@/components/pages/HomePage.vue";
import PlacenamePage from "@/components/pages/PlacenamePage.vue";

import {RouteConfig, RouterOptions} from "vue-router";
import VueRouter from "vue-router"
import {Placename} from "@/store/placenames/types";
import {createRouter} from "@/router";



Vue.config.productionTip = true
//Vue.use(Vuetify)

// this part resolve an issue where the markers would not appear
// delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


new Vue({
  el: '#app',
  store: store,
  router: createRouter()
})
