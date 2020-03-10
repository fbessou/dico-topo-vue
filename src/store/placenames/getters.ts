// profile/getters.ts
import { GetterTree } from 'vuex'
import { PlacenameState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<PlacenameState, RootState> = {
  /*
  fullName(state): string {
    const {user} = state;
    const firstName = (user && user.firstName) || '';
    const lastName = (user && user.lastName) || '';
    return `${firstName} ${lastName}`;
  }
  */
}
