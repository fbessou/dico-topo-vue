import { ActionTree } from 'vuex'
import { PlaceCardState, PlaceOldLabel } from './types'
import { Place } from '@/store/places/types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

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
  async fetchPlaceCard ({ commit, rootState }, id: any) {
    commit('setLoading', true)

    const response = await api.get(`/search?query=(id:"${id}" AND type:place)&page[size]=1`)
    const data = response.data
    const obj = data.data[0]
    if (obj) {
      const p: Place = buildPlace(obj)
      commit('setItem', p)

      const oldLabelResponse = await api.get(`/places/${id}/old-labels?without-relationships`)
      const oldLabelData = oldLabelResponse.data
      const oldLabelItems: Array<PlaceOldLabel> = oldLabelData.data.map((p: any) => {
        return {
          id: p.id,
          type: p.type,
          label: p.attributes['rich-label'],
          labelNode: p.attributes['text-label-node'],
          date: p.attributes['text-date'],
          reference: p.attributes['rich-reference']
        }
      })
      commit('setOldLabels', oldLabelItems)

      const lpResponse = await api.get(`/places/${id}/linked-places?without-relationships`)
      const lpData = lpResponse.data
      const lpItems: Array<Place> = lpData.data.map((obj: any) => {
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
      commit('setLinkedPlaces', lpItems)
    }

    commit('setLoading', false)
  }
}
