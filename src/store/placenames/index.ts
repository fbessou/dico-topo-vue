import {Module} from 'vuex';
import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';
import {Placename, PlacenameState} from './types';
import {RootState} from '../types';

export const state: PlacenameState = {
  items: new Map<string, Placename>(),
  error: false,
  isLoading: false
};

const namespaced: boolean = true;

export const placenames: Module<PlacenameState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
