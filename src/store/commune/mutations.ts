import { MutationTree } from 'vuex'
import Vue from 'vue'

import { CommuneState, InseeRefObject } from '@/store/commune/types'
export function getDefaultState (): CommuneState {
  return {
    commune: {}
  }
};

export const mutations: MutationTree<CommuneState> = {
  setCommune (state: CommuneState, t) {
    state.commune = t
  }
}
