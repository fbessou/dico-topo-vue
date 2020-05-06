import { ActionTree } from 'vuex'
import { BiblState } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<BiblState, RootState> = {
  clear ({ commit }) {
    commit('clear')
  },
  async fetch ({ commit }, placeId) {
    if (placeId) {
      const res = await api.get(`/places/${placeId}/bibl?without-relationships`)
      commit('setBibl', res.data.data.attributes)
    }
  }
}
