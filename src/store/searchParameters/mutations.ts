import {MutationTree} from 'vuex';
import Vue from 'vue';
import {Links} from "@/store/types";
import {MapMarker, MapMarkerState} from "@/store/mapmarkers/types";
import {QueryState} from "@/store/searchParameters/types";
import {PlacenameState} from "@/store/placenames/types";



export function getDefaultState(): QueryState {
  return {
    term: '',
    includeOldLabels: true,

    minTermLength: 2,
  }
};

export const mutations: MutationTree<QueryState> = {
  setTerm(state: QueryState, t) {
    state.term = t;
  },
  setIncludeOldLabels(state: QueryState, b) {
    state.includeOldLabels = b;
  },
};
