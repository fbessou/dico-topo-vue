import { MutationTree } from 'vuex'
import Vue from 'vue'

import { BiblState } from '@/store/bibls/types'
export function getDefaultState (): BiblState {
  return {
    bibl: undefined,
    bibls: []
  }
};

export const mutations: MutationTree<BiblState> = {
  clear (state: BiblState) {
    Object.assign(state, getDefaultState())
  },
  setBibl (state: BiblState, t) {
    state.bibl = Object.assign({}, state.bibl, t)
  }
}
