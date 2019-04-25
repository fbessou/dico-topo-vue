import {ActionTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<PlacenameState, RootState> = {
  fetchPlacename({commit, rootState}, id: string): any {
    commit('setLoading', true)
    return api.get(`/placenames/${id}`)
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const obj = data.data;
          const p: Placename = {
            id: obj.id,
            label: obj.attributes.label,

            coordinates: [0, 0],
            databnf_ark: "",
            description: "",
            geoname_id: "",
            insee_code: "",
            region: "",
            viaf_id: "",
            wikidata_item_id: "",
            wikipedia_url: "",
            department: "",
          }
          commit('setItem', {p: p, links:data.links, meta:{}})
        } else {
          commit('setError', data)
        }
        commit('setLoading', false)
      })
      .catch((error: any) => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  searchPlacename({commit, rootState}, {query, pageSize, pageNumber}): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`
    const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE
    const searchPageSize = pageSize > maxPageSize || pageSize === -1 ? maxPageSize: pageSize
    const searchPageNumber = pageNumber > 0 ? pageNumber : 1
    return api.get(`/search?query=label:${query}&index=${index}&sort=label.keyword&page[size]=${searchPageSize}&page[number]=${searchPageNumber}`)
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const items : Array<Placename> = data.data.map((p: any) => {
            const longlat: any = p.attributes["longlat"]
            let coords: [number, number] = longlat ? longlat.substr(1, longlat - 2).split(',') : null
            return {
              id: p.id,
              label: p.attributes["placename-label"],
              department: p.attributes["dpt"],
              region: p.attributes["region"],

              insee_code: p.attributes["localization-insee-code"],
              description: p.attributes["desc"],

              coordinates: coords,
              geoname_id: p.attributes["geoname-id"],
              wikidata_item_id: p.attributes["wikidata-item-id"],
              wikipedia_url:  p.attributes["wikipedia-url"],
              databnf_ark: p.attributes["databnf-ark"],
              viaf_id: p.attributes["viaf-id"]
            }
          })
          commit('setItems', {p: items, links: data.links, meta: {totalCount: data.meta["total-count"]}})
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
