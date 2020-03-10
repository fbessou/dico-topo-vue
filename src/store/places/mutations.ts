import { MutationTree } from 'vuex'
import { PlaceState, Place } from './types'
import Vue from 'vue'
import { Links } from '@/store/types'
import { MapMarkerState } from '@/store/mapmarkers/types'

export function getDefaultState (): PlaceState {
  return {
    items: new Map<string, Place>(),
    selectedItem: undefined,

    uniqueDepartments: [],

    knownYears: [],

    links: {},
    meta: { totalCount: 0, after: undefined },
    afterHistory: [],

    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<PlaceState> = {
  setItems (state: PlaceState, { p, links, meta }) {
    let newItems = new Map<string, Place>()
    /* replace all items at once */
    p.map((i: any) => {
      newItems.set(i.id, i)
    })
    state.items = newItems
    state.links = links
    state.meta = meta
    state.uniqueDepartments = Object.assign([])
    state.error = undefined
  },
  setKnownYears (state: PlaceState, years) {
    state.knownYears = years
  },
  pushAfterHistory (state: PlaceState) {
    if (state.meta.after) {
      state.afterHistory.push(state.meta.after)
    }
  },
  popAfterHistory (state: PlaceState, meta) {
    if (state.afterHistory.length > 0) {
      state.afterHistory.pop()
    }

    if (state.afterHistory.length > 0) {
      const previous = { after: state.afterHistory.pop() }
      state.meta = Object.assign({}, state.meta, previous)
      console.log('restoring', previous, state.meta)
    } else {
      console.log('going back to the first page')
      state.meta = Object.assign({}, state.meta, { after: undefined })
    }
  },
  addDepartment (state: PlaceState, d) {
    if (state.uniqueDepartments.indexOf(d) === -1) {
      state.uniqueDepartments.push(d)
    }
  },
  clearDepartment (state: PlaceState) {
    state.uniqueDepartments = Object.assign([])
  },
  clearAll (state: PlaceState, { links, meta }) {
    state.items = new Map<string, Place>()
    state.links = links
    state.meta = meta
    state.afterHistory = []
    state.uniqueDepartments = Object.assign([])
    state.knownYears = []
    state.error = undefined
  },
  selectItem (state, item) {
    state.selectedItem = item
  },
  unselectItem (state) {
    state.selectedItem = undefined
  },
  setError (state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading (state, value: boolean) {
    state.isLoading = value
  }
}
