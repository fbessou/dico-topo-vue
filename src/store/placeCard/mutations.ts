import { MutationTree } from 'vuex'
import { PlaceCardState } from './types'
import Vue from 'vue'
import { Links } from '@/store/types'
import { MapMarkerState } from '@/store/mapmarkers/types'

export function getDefaultState (): PlaceCardState {
  return {
    placeItem: undefined,
    placeOldLabels: undefined,
    linkedPlaces: undefined,

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
    state.placeItem = undefined
    state.placeOldLabels = undefined
    state.linkedPlaces = undefined
    state.error = undefined
  },
  setError (state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading (state, value: boolean) {
    state.isLoading = value
  }
}
