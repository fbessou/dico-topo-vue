import { ActionTree } from 'vuex'
import { CommuneState } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<CommuneState, RootState> = {
  async fetch ({ commit }, inseeCode) {
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
          commit('setCanton', { id: element.id, ...element.attributes })
          break
      }
    })
  }
}
