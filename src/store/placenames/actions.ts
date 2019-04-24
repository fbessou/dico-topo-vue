import {ActionTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<PlacenameState, RootState> = {
  fetchPlacename({commit, rootState}): any {
    api
      .get('/placenames/DT02-02878')
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const obj = data.data;
          const p: Placename = {
            country: "",
            department: "",
            id: obj.id,
            label: obj.attributes.label
          }
          commit('setPlacename', p)
        } else {
          commit('setError', data)
        }
      })
      .catch((error: any) => {
        commit('setError', error.message)
      })
  }
};
