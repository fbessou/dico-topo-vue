import {MutationTree} from 'vuex';
import {MapMarkerState, MapMarker} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";

  export function getDefaultState(): MapMarkerState {
  return {
    items: new Map<string, MapMarker>(),

    uniqueDepartments: [],
    uniqueRegions: [],

    links: {},
    meta: {totalCount: 0},
    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<MapMarkerState> = {
  setItem(state: MapMarkerState, {p, links, meta}) {
    Vue.set(state.items, p.id, p)
    Vue.set(state.links, 'self', links.self)
    state.meta = Object.assign(state.meta, meta, {totalCount: 1})
    state.error = undefined
  },
  setItems(state: MapMarkerState, {m, links, meta, query}) {
    /* add new items to the existing ones */
    const newItems = new Map<string, MapMarker>(
      m.map((i: any) => [i.id, i] as [any, any])
    )
    state.items = new Map([...newItems, ...state.items])
    state.links = links
    state.meta = meta
    state.error = undefined
  },
  addDepartment(state: MapMarkerState, d) {
    if (state.uniqueDepartments.indexOf(d) === -1) {
      state.uniqueDepartments.push(d);
    }
  },
  addRegion(state: MapMarkerState, r) {
    if (state.uniqueRegions.indexOf(r) === -1) {
      state.uniqueRegions.push(r);
    }
  },
  clearAll(state: MapMarkerState) {
    state.items = Object.assign(new Map<string, MapMarker>());
    state.uniqueDepartments = Object.assign([]);
    state.uniqueRegions = Object.assign([]);
    state.links = {};
    state.meta = {totalCount: 0};
    state.error = undefined;
  },
  setError(state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading(state, value: boolean) {
    state.isLoading = value
  }
};
