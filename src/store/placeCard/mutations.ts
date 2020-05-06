import { MutationTree } from 'vuex'
import { PlaceCardState } from './types'
import Vue from 'vue'
import { Links } from '@/store/types'
import { MapMarkerState } from '@/store/mapmarkers/types'

export function getDefaultState (): PlaceCardState {
  return {
    placeItem: undefined,
    placeOldLabels: [],
    linkedPlaces: [],

    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<PlaceCardState> = {
  setItem (state: PlaceCardState, p) {
    state.placeItem = p
    state.error = undefined
  },
  setOldLabels (state: PlaceCardState, labels) {
    state.placeOldLabels = labels
    state.error = undefined
  },
  setLinkedPlaces (state: PlaceCardState, linkedPlaces) {
    state.linkedPlaces = linkedPlaces
    state.error = undefined
  },
  clearAll (state: PlaceCardState) {
    // todo: should use the default state instead
    state.placeItem = undefined
    state.placeOldLabels = []
    state.linkedPlaces = []
    state.error = undefined
    state.isLoading = false
  },
  setError (state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading (state, value: boolean) {
    state.isLoading = value
  }
}
