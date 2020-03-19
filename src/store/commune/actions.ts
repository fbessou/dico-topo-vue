import { ActionTree } from 'vuex'
import { CommuneState } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<CommuneState, RootState> = {
  async fetch ({ commit, state, rootState }, inseeCode) {
    const res = await api.get(`/communes/${inseeCode}?include=departement,arrondissement,canton&without-relationships`)
    console.log(res.data)
    commit('setCommune', res.data)
  }
}
