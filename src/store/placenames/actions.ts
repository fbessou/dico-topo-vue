import {ActionTree} from 'vuex';
import {PlacenameState, User} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";


export const actions: ActionTree<PlacenameState, RootState> = {
  fetchPlacename({commit}): any {
    /*
    axios({
      url: 'https://....'
    }).then((response) => {
      const payload: User = response && response.data;
      commit('profileLoaded', payload);
    }, (error) => {
      console.log(error);
      commit('profileError');
    });
    */

    api
      .get('/placenames/DT02-02878')
      .then(response => response.data)
      .then(console.log)
  }
};
