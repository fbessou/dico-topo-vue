import {MutationTree} from 'vuex';
import {PlacenameCardState} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";
import {MapMarker, MapMarkerState} from "@/store/mapmarkers/types";

export function getDefaultState(): PlacenameCardState {
  return {
    placenameItem: undefined,

    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<PlacenameCardState> = {
  setItem(state: PlacenameCardState, p) {
    state.placenameItem = p
    state.error = undefined
  },
  clearAll(state: PlacenameCardState) {
    state.placenameItem = undefined
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
