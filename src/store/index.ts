import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { placenames } from './placenames/index'
import { mapmarkers } from './mapmarkers/index'
import { placenameCard } from './placenameCard/index'
import { searchParameters } from '@/store/searchParameters'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    placenames,
    mapmarkers,
    placenameCard,
    searchParameters
  }
}

export default new Vuex.Store<RootState>(store)
