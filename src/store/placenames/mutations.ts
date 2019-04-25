import {MutationTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import Vue from 'vue';
import {Links} from "@/store/types";

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
    Object.assign(state.meta, {totalCount: 1})
    state.error = undefined
  },
  setItems(state: PlacenameState, {p, links, meta}) {
    let newItems = new Map<string, Placename>()
    p.map((i: any) => {
      newItems.set(i.id, i)
    })
    Object.assign(state.items, newItems)
    Object.assign(state.links, links)
    Object.assign(state.meta, meta)
    state.error = undefined
  },
  clearAll(state: PlacenameState, p: Placename) {
    Object.assign(state.items, getDefaultState())
    Object.assign(state.meta, {totalCount: 0})
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
