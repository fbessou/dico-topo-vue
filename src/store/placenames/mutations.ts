import {MutationTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";
import {MapMarker, MapMarkerState} from "@/store/mapmarkers/types";

export function getDefaultState(): PlacenameState {
  return {
    items: new Map<string, Placename>(),
    links: {},
    meta: {totalCount: 0},
    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<PlacenameState> = {
  setItem(state: PlacenameState, {p, links, meta}) {
    Vue.set(state.items, p.id, p)
    Vue.set(state.links, 'self', links.self)
    state.meta = Object.assign(state.meta, meta, {totalCount: 1})
    state.error = undefined
  },
  setItems(state: PlacenameState, {p, links, meta}) {
    let newItems = new Map<string, Placename>()
    /* replace all items at once */
    p.map((i: any) => {
      newItems.set(i.id, i)
    })
    state.items = newItems
    state.links = links
    state.meta = meta
    state.error = undefined
  },
  clearAll(state: PlacenameState, {links, meta}) {
    state.items = new Map<string, Placename>()
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
