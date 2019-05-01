import {MutationTree} from 'vuex';
import {PlacenameCardState} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";
import {MapMarker, MapMarkerState} from "@/store/mapmarkers/types";

export function getDefaultState(): PlacenameCardState {
  return {
    placenameItem: undefined,
    placenameOldLabels: undefined,
    linkedPlacenames: undefined,

    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<PlacenameCardState> = {
  setItem(state: PlacenameCardState, p) {
    state.placenameItem = p
    state.error = undefined
  },
  setOldLabels(state: PlacenameCardState, labels) {
    state.placenameOldLabels = labels
    state.error = undefined
  },
  setLinkedPlacenames(state: PlacenameCardState, linkedPlacenames) {
    state.linkedPlacenames = linkedPlacenames
    state.error = undefined
  },
  clearAll(state: PlacenameCardState) {
    state.placenameItem = undefined
    state.placenameOldLabels = undefined
    state.linkedPlacenames = undefined
    state.error = undefined
  },
  setError(state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading(state, value: boolean) {
    state.isLoading = value
  }
};
