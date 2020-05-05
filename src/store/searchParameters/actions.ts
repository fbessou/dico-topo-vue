import { ActionTree } from 'vuex'
import { QueryState, SortableField } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<QueryState, RootState> = {
  setTerm ({ commit, state, rootState }, t): any {
    commit('setTerm', t)
  },
  setGroupbyPlace ({ commit, state, rootState }, t): any {
    commit('setGroupbyPlace', t)
  },
  setRange ({ commit, state }, { key, operators }): any {
    commit('setRange', { key, operators })
  },
  removeRange ({ commit, state }): any {
    commit('removeRange')
  },
  setPagination ({ commit, state, rootState }, t): any {
    commit('setPagination', t)
  },
  saveZoom ({ commit, state, rootState }, { zoom, center }): any {
    commit('saveZoom', { zoom, center })
  },
  addSortField ({ commit, state, rootState }, { field, order }): any {
    commit('addSortField', { field, order })
  },
  updateSortField ({ commit, state, rootState }, { field, order }): any {
    commit('updateSortField', { field, order })
  },
  removeSortField ({ commit, state, rootState }, field): any {
    commit('removeSortField', field)
  },
  setFilter ({ commit, state, rootState }, { filter, value }): any {
    switch (filter) {
      case 'department':
        commit('setDepFilter', value)
        break
    }
  },
  toggleIIIFViewerVisibility ({ commit }) : any {
    commit('toggleIIIFViewer')
  },
  setIIIFViewerVisibility ({ commit, state }, t) : any {
    commit('setIIIFViewer', t)
  },
  setIIIFViewerAvailability ({ commit, state }, t) : any {
    commit('setIIIFViewerAvailability', t)
  }
}
