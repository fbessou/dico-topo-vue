import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations, getDefaultState } from './mutations'
import { Placename, PlacenameState } from './types'
import { RootState } from '../types'

const namespaced: boolean = true

export const placenames: Module<PlacenameState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
}
