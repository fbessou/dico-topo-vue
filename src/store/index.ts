import Vue from 'vue'
import Vuex from 'vuex'
import placenames from './modules/placenames'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    placenames
  },
  strict: debug
})
