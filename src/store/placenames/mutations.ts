import {MutationTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";
import {MapMarker, MapMarkerState} from "@/store/mapmarkers/types";

export function getDefaultState(): PlacenameState {
  return {
    items: new Map<string, Placename>(),
    selectedItem: undefined,

    uniqueDepartments: [],

    links: {},
    meta: {totalCount: 0, after: undefined},
    afterHistory: [],

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
    state.uniqueDepartments = Object.assign([]);
    state.error = undefined
  },
  pushAfterHistory(state: PlacenameState) {
    if (!!state.meta.after) {
      state.afterHistory.push(state.meta.after)
    }
  }
  ,
  popAfterHistory(state: PlacenameState, meta) {
    if (state.afterHistory.length > 0) {
      state.afterHistory.pop()
    }

    if (state.afterHistory.length > 0) {
      const previous = {after: state.afterHistory.pop()};
      state.meta = Object.assign({}, state.meta, previous);
      console.log("restoring", previous, state.meta);
    } else {
      console.log("going back to the first page");
      state.meta = Object.assign({}, state.meta, {after: undefined});
    }
  },
  addDepartment(state: PlacenameState, d) {
    if (state.uniqueDepartments.indexOf(d) === -1) {
      state.uniqueDepartments.push(d);
    }
  },
  clearDepartment(state: PlacenameState) {
    state.uniqueDepartments = Object.assign([]);
  },
  clearAll(state: PlacenameState, {links, meta}) {
    state.items = new Map<string, Placename>()
    state.links = links
    state.meta = meta
    state.afterHistory = [];
    state.uniqueDepartments = Object.assign([]);
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
