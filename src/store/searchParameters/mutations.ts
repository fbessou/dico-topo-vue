import { MutationTree } from 'vuex'
import Vue from 'vue'
import { Links } from '@/store/types'
import { MapMarkerState } from '@/store/mapmarkers/types'
import { QueryState, SortableField, RangeParameter } from '@/store/searchParameters/types'
import { Placename, PlacenameState } from '@/store/placenames/types'

export function getDefaultState (): QueryState {
  return {
    term: '',
    groupbyPlacename: true,
    sortFields: new Array <SortableField>(),

    range: { key: '', operators: [] },

    depFilter: [],

    minTermLength: 2
  }
};

export const mutations: MutationTree<QueryState> = {
  setTerm (state: QueryState, t) {
    state.term = t
  },
  setGroupbyPlacename (state: QueryState, b) {
    state.groupbyPlacename = b
  },
  addSortField (state: QueryState, { field, order }) {
    console.log('add sort field', { key: field, order: order })
    state.sortFields.push({ key: field, order: order })
  },
  updateSortField (state: QueryState, { field, order }) {
    console.log(field, state.sortFields)
    const idx = state.sortFields.findIndex((f) => f.key === field)
    console.log('update sort field ->', idx, state.sortFields)
    if (idx > -1) {
      Vue.set(state.sortFields, idx, { key: field, order: order })// .splice(idx, 1);
      console.log('sort field updated ->', state.sortFields)
    }
  },
  removeSortField (state: QueryState, field) {
    console.log(field, state.sortFields)
    const idx = state.sortFields.findIndex((f) => f.key === field)
    console.log('remove sort field ->', idx, state.sortFields)
    if (idx > -1) {
      state.sortFields.splice(idx, 1)
      console.log('sort field removed ->', state.sortFields)
    }
  },
  setRange (state: QueryState, range: RangeParameter) {
    state.range = Object.assign({}, state.range, range)
  },
  removeRange (state: QueryState) {
    console.log('remove range')
    state.range = Object.assign({}, state.range, { key: '', operators: [] })
  },
  setDepFilter (state: QueryState, value) {
    Vue.set(state, 'depFilter', value)
  }
}
