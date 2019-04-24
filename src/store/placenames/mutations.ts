import {MutationTree} from 'vuex';
import {PlacenameState, User} from './types';

export const mutations: MutationTree<PlacenameState> = {
  profileLoaded(state, payload: User) {
    state.error = false;
    state.user = payload;
  },
  profileError(state) {
    state.error = true;
    state.user = undefined;
  }
};
