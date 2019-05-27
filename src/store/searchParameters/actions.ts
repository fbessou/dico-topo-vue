import {ActionTree} from 'vuex';
import {QueryState} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<QueryState, RootState> = {
  setTerm({commit, state, rootState}, t): any {
    commit('setTerm', t)
  },
  setIncludeOldLabels({commit, state, rootState}, t): any {
    commit('setIncludeOldLabels', t)
  }
};
