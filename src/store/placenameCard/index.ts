import {Module} from 'vuex';
import {getters} from './getters';
import {actions} from './actions';
import {mutations, getDefaultState} from './mutations';
import {PlacenameCardState} from './types';
import {RootState} from '../types';


const namespaced: boolean = true;

export const placenameCard: Module<PlacenameCardState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
};
