import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations, getDefaultState } from './mutations'
import { RootState } from '../types'
import { BiblState } from '@/store/bibls/types'

const namespaced: boolean = true

export const commune: Module<BiblState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
}
