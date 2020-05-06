import { ActionTree } from 'vuex'
import { CommuneState } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<CommuneState, RootState> = {
  clear ({ commit }) {
    commit('clear')
  },
  setLoading ({ commit }, t) {
    commit('setLoading', t)
  },
  async fetch ({ commit }, inseeCode) {
    if (inseeCode) {
      commit('setLoading', true)
      const res = await api.get(`/communes/${inseeCode}?include=departement,arrondissement,canton&without-relationships`)
      commit('setCommune', res.data)
      res.data.included.forEach((element: any) => {
        switch (element.attributes['reference-type']) {
          case 'DEP':
            commit('setDepartement', { id: element.id, ...element.attributes })
            break
          case 'REG':
            commit('setRegion', { id: element.id, ...element.attributes })
            break
          case 'AR':
            commit('setArrondissement', { id: element.id, ...element.attributes })
            break
          case 'CT':
          case 'CTNP':
            commit('setCanton', { id: element.id, ...element.attributes })
            break
        }
      })
      commit('setLoading', false)
    }
  }
}
