import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations, getDefaultState } from './mutations'
import { RootState } from '../types'
import { CommuneState } from '@/store/commune/types'

const namespaced: boolean = true

export const commune: Module<CommuneState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
}
