// profile/getters.ts
import { GetterTree } from 'vuex'
import { PlaceCardState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<PlaceCardState, RootState> = {
  /*
  fullName(state): string {
    const {user} = state;
    const firstName = (user && user.firstName) || '';
    const lastName = (user && user.lastName) || '';
    return `${firstName} ${lastName}`;
  }
  */
}
