import { ActionTree } from 'vuex'
import { PlaceCardState, PlaceOldLabel } from './types'
import { Place } from '@/store/places/types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'
import { ApiResponse } from 'apisauce'

const index = `${process.env.VUE_APP_PLACE_INDEX}`

function buildCoords (obj: any) {
  const longlat: any = obj.attributes['longlat']
  const coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
  return coords
}

function buildPlace (obj: any) {
  let coords = buildCoords(obj)
  return {
    id: obj.id,
    type: obj.type,
    label: obj.attributes['place-label'],
    old_labels: [],
    description: obj.attributes['desc'],
    comment: obj.attributes['comment'],

    insee_code: obj.attributes['localization-insee-code'],
    department: obj.attributes['dpt'],
    region: obj.attributes['region'],

    coordinates: coords,
    geoname_id: obj.attributes['geoname-id'],
    wikidata_item_id: obj.attributes['wikidata-item-id'],
    wikipedia_url: obj.attributes['wikipedia-url'],
    databnf_ark: obj.attributes['databnf-ark'],
    viaf_id: obj.attributes['viaf-id']
  }
}

export const actions: ActionTree<PlaceCardState, RootState> = {
  clearPlaceCard ({ commit }) {
    commit('clearAll')
  },
  fetchPlaceCard ({ commit, rootState }, id: any): any {
    commit('setLoading', true)
    return api.get(`/search?query=(id:"${id}" AND type:place)&page[size]=1`)
      .then((res: ApiResponse<any>) => {
        const { ok, data } = res
        if (ok) {
          const obj = data.data[0]
          if (obj) {
            const p: Place = buildPlace(obj)
            commit('setItem', p)
            return p
          } else {
            commit('setError', data)
            commit('setLoading', false)
            return null
          }
        } else {
          commit('setError', data)
          commit('setLoading', false)
          return null
        }
        // commit('setLoading', false)
      })
      .then(r => {
        return api.get(`/places/${id}/old-labels?without-relationships`)
          .then((res: ApiResponse<any>) => {
            const { ok, data } = res
            if (ok) {
              const items: Array<PlaceOldLabel> = data.data.map((p: any) => {
                return {
                  id: p.id,
                  type: p.type,
                  label: p.attributes['rich-label'],
                  labelNode: p.attributes['text-label-node'],
                  date: p.attributes['text-date'],
                  reference: p.attributes['rich-reference']
                }
              })
              commit('setOldLabels', items)
            }
          })
      })
      .then(r => {
        return api.get(`/places/${id}/linked-places?without-relationships`)
          .then((res: ApiResponse<any>) => {
            const { ok, data } = res
            if (ok) {
              const items: Array<Place> = data.data.map((obj: any) => {
                // TODO: pas de coords car pas de champ longlat dans ces objets (pas retournés par l'api search)
                const coords = buildCoords(obj)
                return {
                  id: obj.id,
                  type: obj.type,
                  label: obj.attributes['label'],
                  description: obj.attributes['desc'],
                  comment: obj.attributes['comment'],

                  insee_code: obj.attributes['localization-insee-code'],
                  coordinates: coords
                }
              })

              commit('setLinkedPlaces', items)
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
}
