import { MutationTree } from 'vuex'
import Vue from 'vue'

import { BiblState } from '@/store/bibls/types'
export function getDefaultState (): BiblState {
  return {
    bibls: []
  }
};

export const mutations: MutationTree<BiblState> = {
  clear (state: BiblState) {
    Object.assign(state, getDefaultState())
  }
}
