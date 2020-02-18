import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations, getDefaultState } from './mutations'
import { RootState } from '../types'
import { QueryState } from '@/store/searchParameters/types'

const namespaced: boolean = true

export const searchParameters: Module<QueryState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
}
