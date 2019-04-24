import {MutationTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import Vue from 'vue';

export const mutations: MutationTree<PlacenameState> = {
  setPlacename(state: PlacenameState, p: Placename) {
    state.error = false;
    Vue.set(state.items, p.id, p);
  },
  setError(state, payload: any) {
    state.error = payload;
  }
};
