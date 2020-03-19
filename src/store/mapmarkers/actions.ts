import { ActionTree } from 'vuex'
import { MapMarkerState } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

export const actions: ActionTree<MapMarkerState, RootState> = {
  setMarkersLoading ({ commit }, loading: Boolean) {
    commit('setLoading', loading)
  },
  clearMapMarkers ({ commit }) : any {
    commit('setLoading', true)
    commit('clearAll')
    commit('setLoading', false)
  },
  async searchMapMarker ({ commit, rootState, state }, { query, filterParam, rangeParam, pageSize, nextLink }) {
    let url: any = null

    if (nextLink) {
      url = nextLink
    } else {
      // const index = `${process.env.VUE_APP_PLACE_INDEX}`
      const maxPageSize: number = process.env.VUE_APP_PLACE_INDEX_MAP_PAGE_SIZE
      const searchPageSize = pageSize > maxPageSize || pageSize === -1 ? maxPageSize : pageSize
      const searchPageNumber = 1

      const filteredQuery = filterParam ? `${query} AND ${filterParam}` : query
      const range = rangeParam ? `&${rangeParam}` : ''

      url = `/search?query=${filteredQuery}${range}&sort=label.keyword&page[size]=${searchPageSize}&page[number]=${searchPageNumber}&facade=map&filter[longlat]`
    }

    const response = await api.get(url)
    const data = response.data

    /* parse marker items */
    const items: string[] = data.data.map((m: any) => {
      const longlat: any = m.attributes['longlat']
      let coords: [string, string] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null

      return `${m.type === 'place' ? m.id : m.attributes['place-id']}@${[parseFloat(coords[1]), parseFloat(coords[0])]}`
    })

    /* save marker items */
    commit('setItems', { m: [...new Set(items)], links: data.links, meta: { totalCount: data.meta['total-count'] } })
  }
}
