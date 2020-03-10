// profile/getters.ts
import { GetterTree } from 'vuex'
import { PlaceState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<PlaceState, RootState> = {
  /*
  fullName(state): string {
    const {user} = state;
    const firstName = (user && user.firstName) || '';
    const lastName = (user && user.lastName) || '';
    return `${firstName} ${lastName}`;
  }
  */
}
