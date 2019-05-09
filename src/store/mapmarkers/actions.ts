import {ActionTree} from 'vuex';
import {MapMarkerState, MapMarker} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiErrorResponse, ApiOkResponse, ApiResponse} from "apisauce";


export const actions: ActionTree<MapMarkerState, RootState> = {
  setMarkersLoading({commit}, loading: Boolean) {
    commit("setLoading", loading)
  },
  clearMapMarkers({commit}) : any {
    commit("setLoading", true)
    commit('clearAll')
    commit("setLoading", false)
  },
  searchMapMarker({commit, rootState, state}, {query, pageSize, nextLink}): any {
    let url: any = null

    if (!!nextLink) {
      url = nextLink
    } else {
      const index = `${process.env.VUE_APP_PLACENAME_INDEX}`
      const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_MAP_PAGE_SIZE
      const searchPageSize = pageSize > maxPageSize || pageSize === -1 ? maxPageSize : pageSize
      const searchPageNumber = 1
      url = `/search?query=${query}&index=${index}&sort=label.keyword&page[size]=${searchPageSize}&page[number]=${searchPageNumber}&facade=map&filter[longlat]`
    }

    return new Promise<ApiOkResponse<any>>((resolve, reject) => {
      api.get(url)
        .then((res: ApiResponse<any>) => {
          const {ok, data} = res;
          if (ok) {

            /* parse marker items */
            const items: Array<MapMarker> = data.data.map((m: any) => {
              const longlat: any = m.attributes["longlat"]
              let coords: [string, string] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
              return {
                id: m.type === "placename" ? m.id : m.attributes["placename-id"],
                coordinates: [parseFloat(coords[1]), parseFloat(coords[0])]
              }
            })

            /* save marker items */
            commit('setItems', {m: items, links: data.links, meta: {totalCount: data.meta["total-count"]}})
            /* return a link to the next resource if any */
            resolve(data.links.next)
          } else {
            //commit('clearAll')
            commit('setError', data)
            reject(state.error)
          }
          //commit('setLoading', false)
        })
        .catch((error: any) => {
          //commit('clearAll')
          commit('setError', error.message)
          reject(state.error)
        })
    })
  }
};
