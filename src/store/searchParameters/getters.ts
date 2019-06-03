// profile/getters.ts
import {GetterTree} from 'vuex';
import {QueryState, SortableField} from './types';
import {RootState} from '../types';


const minTermLength = 2;

export const getters: GetterTree<QueryState, RootState> = {
  query(state): any {

    let query = undefined;

    if (!state.term || state.term.length < minTermLength) {
      return undefined
    }

    if (!!state.includeOldLabels) {
      query = `label:${state.term} OR old-labels:${state.term}`
    } else {
      query = `label:${state.term}`
    }
    return query;
  },
  getSortParam: (state) => (key: any) => {
    const idx = state.sortFields.findIndex((o) => o.key === key);
    return idx > -1 ? state.sortFields[idx] : undefined;
  },
  computedSortParam(state): any {
    return state.sortFields.map((o) => `${o.order}${o.key}`).join(',')
  }
};
