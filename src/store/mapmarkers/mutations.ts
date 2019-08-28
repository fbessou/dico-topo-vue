import {MutationTree} from 'vuex';
import {MapMarkerState} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";

  export function getDefaultState(): MapMarkerState {
  return {
    items: [],
    links: {},
    meta: {totalCount: 0},
    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<MapMarkerState> = {
  setItems(state: MapMarkerState, {m, links, meta, query}) {
    /* add new items to the existing ones */
    //Vue.set(state, 'items', [...new Set([...state.items, ...m])]);
    state.items = Object.assign([], [...new Set([...state.items, ...m])])
    //console.log("set markers in vuex", state.items.length);
    state.links = links
    state.meta = meta
    state.error = undefined
  },
  clearAll(state: MapMarkerState) {
    state.items = [];
    state.links = {};
    state.meta = {totalCount: 0};
    state.error = undefined;
    console.log("clear markers in vuex");
  },
  setError(state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading(state, value: boolean) {
    state.isLoading = value
  }
};
