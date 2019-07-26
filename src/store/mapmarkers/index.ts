import {Module} from 'vuex';
import {getters} from './getters';
import {actions} from './actions';
import {mutations, getDefaultState} from './mutations';
import {MapMarkerState} from './types';
import {RootState} from '../types';


const namespaced: boolean = true;

export const mapmarkers: Module<MapMarkerState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  actions,
  mutations
};
