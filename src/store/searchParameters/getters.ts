// profile/getters.ts
import {GetterTree} from 'vuex';
import {QueryState} from './types';
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
  }
  /*
  fullName(state): string {
    const {user} = state;
    const firstName = (user && user.firstName) || '';
    const lastName = (user && user.lastName) || '';
    return `${firstName} ${lastName}`;
  }
  */
};
