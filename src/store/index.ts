import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { places } from './places/index'
import { mapmarkers } from './mapmarkers/index'
import { PlaceCard } from './placeCard/index'
import { searchParameters } from '@/store/searchParameters'
import { commune } from '@/store/commune/index'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    places,
    mapmarkers,
    PlaceCard,
    searchParameters,
    commune
  }
}

export default new Vuex.Store<RootState>(store)
