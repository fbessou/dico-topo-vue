import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations, getDefaultState } from './mutations'
import { Place, PlaceState } from './types'
import { RootState } from '../types'

const namespaced: boolean = true

export const places: Module<PlaceState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
}
