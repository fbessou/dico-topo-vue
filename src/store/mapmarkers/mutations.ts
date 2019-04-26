import {MutationTree} from 'vuex';
import {MapMarkerState, MapMarker} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";

export function getDefaultState(): MapMarkerState {
  return {
    items: new Map<string, MapMarker>(),
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
  setItems(state: MapMarkerState, {m, links, meta}) {
    /* add new items to the existing ones */

    const newItems = new Map(
      m.map((i: any) => [i.id, i] as [any, any])
    )
    state.items = Object.assign(new Map<string, MapMarker>(), state.items, newItems)
    console.log("map markers setted to", state.items)
    state.links = links
    state.meta = meta
    state.error = undefined
  },
  clearAll(state: MapMarkerState, {links, meta}) {
    console.log("clear map markers")
    state.items = new Map<string, MapMarker>()
    state.links = links
    state.meta = meta
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
