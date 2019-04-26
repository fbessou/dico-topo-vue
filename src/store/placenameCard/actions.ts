import {ActionTree} from 'vuex';
import {PlacenameCardState} from './types';
import {Placename} from "@/store/placenames/types";
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<PlacenameCardState, RootState> = {
  fetchPlacenameCard({commit, rootState}, id: string): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`
    return api.get(`/search?query=id:${id}&index=${index}&page[size]=1`)
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const obj = data.data[0];
          console.log(obj)
          const longlat: any = obj["longlat"]
          let coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
          const p: Placename = {
            id: obj.id,
            label: obj.attributes["placename-label"],
            description: obj.attributes["desc"],
            comment: obj.attributes["comment"],

            insee_code: obj.attributes["localization-insee-code"],
            department: obj.attributes["dpt"],
            region: obj.attributes["region"],

            coordinates: coords,
            geoname_id: obj.attributes["geoname-id"],
            wikidata_item_id: obj.attributes["wikidata-item-id"],
            wikipedia_url: obj.attributes["wikipedia-url"],
            databnf_ark: obj.attributes["databnf-ark"],
            viaf_id: obj.attributes["viaf-id"]
          }
          commit('setItem', p)
        } else {
          commit('setError', data)
        }
        commit('setLoading', false)
      })
      .catch((error: any) => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  }
};
