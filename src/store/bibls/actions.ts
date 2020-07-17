import { ActionTree } from 'vuex'
import { BiblState } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<BiblState, RootState> = {
  clear ({ commit }) {
    commit('clear')
  }
}
