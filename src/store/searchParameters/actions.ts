import { ActionTree } from 'vuex'
import { QueryState, SortableField } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'
import _ from 'lodash'

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
  },
  searchCallback: ({ commit, state, rootState, getters, dispatch }) => {
    console.log('fullsearch')
    // start the search from here
    dispatch('fetchMapResults')
    dispatch('fetchTableResults')
  },
  fetchMapResults: _.debounce(async ({ rootState, getters, dispatch }) => {
    // send a fake query just to get the total count
    const meta = await dispatch('mapmarkers/searchMapMarker', {
      query: getters.query,
      filterParam: getters.computedFilterParam,
      rangeParam: getters.computedRangeParam,
      pageSize: 1
    }, { root: true })
    // currently does not handle larger result sets
    const max = 10000
    if (rootState.places.meta['total-count'] > max) {
      console.error('result is too large: ', meta['total-count'])
      return
    }
    dispatch('mapmarkers/clearMapMarkers', null, { root: true })
    const nbPages = rootState.places.meta['total-count'] >= max / 2 ? 2 : 1
    const pPromises = [...Array(nbPages).keys()].map(k => {
      return dispatch('mapmarkers/searchMapMarker', {
        query: getters.query,
        filterParam: getters.computedFilterParam,
        rangeParam: getters.computedRangeParam,
        pageSize: Math.ceil(max / nbPages),
        pageNumber: k + 1
      }, { root: true })
    })
    await Promise.all(pPromises)
  }, 25),
  fetchTableResults: _.debounce(async ({ state, getters, dispatch }, after) => {
    if (state.groupbyPlace) {
      dispatch('places/recordCurrentAggPage', null, { root: true })
    }
    dispatch('places/searchPlace', {
      query: getters.query,
      rangeParam: getters.computedRangeParam,
      filterParam: getters.computedFilterParam,
      groupbyPlace: state.groupbyPlace,
      sortParam: getters.computedSortParam,
      pageNumber: state.pagination.page,
      pageSize: state.pagination.rowsPerPage,
      after: after
    }, { root: true })
  }, 25)
}
