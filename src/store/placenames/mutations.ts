import {MutationTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";
import {MapMarker, MapMarkerState} from "@/store/mapmarkers/types";

export function getDefaultState(): PlacenameState {
  return {
    items: new Map<string, Placename>(),
    selectedItem: undefined,

    links: {},
    meta: {totalCount: 0},
    error: undefined,
    isLoading: false
  }
};

export const mutations: MutationTree<PlacenameState> = {
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
  selectItem(state, item) {
    state.selectedItem = item
  },
  unselectItem(state) {
    state.selectedItem = undefined
  },
  setError(state, message: string) {
    state.error = message
    console.error(message)
  },
  setLoading(state, value: boolean) {
    state.isLoading = value
  }
};
