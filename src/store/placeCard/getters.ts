// profile/getters.ts
import { GetterTree } from 'vuex'
import { PlaceCardState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<PlaceCardState, RootState> = {
  canvasIndex: (state) => {
    if (!state.placeItem) {
      return 0
    }
    try {
      const resp: any = state.placeItem.responsibility
      const pageOne : any = resp ? resp.attributes.bibl.gallica_page_one.split('.')[0].substr(1) : 0
      return (parseInt(pageOne) - 1) + (resp.attributes['num-start-page'] - 1)
    } catch (e) {
      return 0
    }
  },
  computedBiblRef: (state) => {
    if (!state.placeItem) {
      return null
    }
    try {
      const resp: any = state.placeItem.responsibility
      if (resp.attributes['num-start-page'] === null) {
        return resp.attributes.bibl.abbr
      } else {
        return `${resp.attributes.bibl.abbr}, p. ${resp.attributes['num-start-page']}.`
      }
    } catch (e) {
      return null
    }
  },
  gallicaLink: (state, getters) => {
    if (!state.placeItem) {
      return null
    }
    try {
      const resp: any = state.placeItem.responsibility
      return `https://gallica.bnf.fr/${resp.attributes.bibl.gallica_ark}/f${getters.canvasIndex + 1}.image`
    } catch (e) {
      return null
    }
  },
  IIIFAvailability: (state) => {
    if (!state.placeItem) {
      return false
    }
    try {
      const resp: any = state.placeItem.responsibility
      return resp.attributes.bibl.gallica_IIIF_availability
    } catch (e) {
      return false
    }
  },
  manifestUrl: (state) => {
    if (!state.placeItem) {
      return null
    }
    try {
      const resp: any = state.placeItem.responsibility
      return `https://gallica.bnf.fr/iiif/${resp.attributes.bibl.gallica_ark}/manifest.json`
    } catch (e) {
      return null
    }
  }
}
