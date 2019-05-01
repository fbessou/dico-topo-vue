import {ActionTree} from 'vuex';
import {PlacenameCardState, PlacenameOldLabel} from './types';
import {Placename} from "@/store/placenames/types";
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";

const index = `${process.env.VUE_APP_PLACENAME_INDEX}`

function buildPlacename(obj: any) {
  const longlat: any = obj.attributes["longlat"]
  let coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
  return {
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

}

export const actions: ActionTree<PlacenameCardState, RootState> = {
  clearPlacenameCard({commit}) {
    commit('clearAll')
  },
  fetchPlacenameCard({commit, rootState}, id: any): any {
    commit('setLoading', true)
    return api.get(`/search?query=(id:"${id}" AND type:placename)&index=${index}&page[size]=1`)
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const obj = data.data[0];
          if (obj) {
            const p: Placename = buildPlacename(obj)
            commit('setItem', p)
            return p;
          } else {
            commit('setError', data)
            commit('setLoading', false)
            return null;
          }
        } else {
          commit('setError', data)
          commit('setLoading', false)
          return null;
        }
        //commit('setLoading', false)
      })
      .then(r => {
        return api.get(`/placenames/${id}/old-labels?without-relationships`)
          .then((res: ApiResponse<any>) => {
            const {ok, data} = res;
            if (ok) {
              const items: Array<PlacenameOldLabel> = data.data.map((p: any) => {
                return {
                  id: p.id,
                  label: p.attributes["rich-label"],
                  labelNode: p.attributes["text-label-node"],
                  date: p.attributes["text-date"],
                  reference: p.attributes["rich-reference"],
                }
              })
              commit('setOldLabels', items)
            }
          })
      })
      .then( r => {
        return api.get(`/placenames/${id}/linked-placenames?without-relationships`)
          .then((res: ApiResponse<any>) => {
            const {ok, data} = res;
            if (ok) {
              const items: Array<Placename> = data.data.map((obj: any) => {
                return buildPlacename(obj)
              })

              commit('setLinkedPlacenames', items)
            }
          })
      })
      .then(r => {
        commit('setLoading', false)
      })
      .catch((error: any) => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  }
};
