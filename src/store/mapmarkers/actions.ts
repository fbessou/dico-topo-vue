import {ActionTree} from 'vuex';
import {MapMarkerState, MapMarker} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiErrorResponse, ApiOkResponse, ApiResponse} from "apisauce";


function partialSearchMarker(commit: any, url: string): Promise<ApiErrorResponse<any> | ApiOkResponse<any> | void> {
  return api.get(url)
    .then((res: ApiResponse<any>) => {
      const {ok, data} = res;
      if (ok) {
        const items: Array<MapMarker> = data.data.map((m: any) => {
          const longlat: any = m.attributes["longlat"]
          let coords: [string, string] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
          return {
            id: m.id,
            coordinates: [parseFloat(coords[1]), parseFloat(coords[0])]
          }
        })
        commit('setItems', {m: items, links: data.links, meta: {totalCount: data.meta["total-count"]}})
        if (data.links.next) {
          console.log("fetching next data (mapmarkers)")
          return partialSearchMarker(commit, data.links.next)
        }
      } else {
        commit('clearAll', {links: {}, meta: {}})
        commit('setError', data)
      }
      //commit('setLoading', false)
    })
    .catch((error: any) => {
      commit('clearAll', {links: {}, meta: {}})
      commit('setError', error.message)
    })
}

export const actions: ActionTree<MapMarkerState, RootState> = {
  fetchMapMarker({commit, rootState}, id: string): any {

  },
  searchMapMarker({commit, rootState}, {query, pageSize, pageNumber}): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`
    const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_MAP_PAGE_SIZE
    const searchPageSize = pageSize > maxPageSize || pageSize === -1 ? maxPageSize: pageSize
    const searchPageNumber = pageNumber > 0 ? pageNumber : 1

    const initialUrl = `/search?query=label:${query}&index=${index}&sort=label.keyword&page[size]=${searchPageSize}&page[number]=${searchPageNumber}&facade=map&filter[longlat]`
    commit('clearAll', {links: {}, meta: {}})
    return partialSearchMarker(commit, initialUrl).then(r => {
      commit("setLoading", false)
    })
  }
};
