// profile/getters.ts
import { GetterTree } from 'vuex'
import { PlaceCardState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<PlaceCardState, RootState> = {
  canvasIndex: (state) => {
    try {
      const resp = state.placeItem.responsibility
      const pageOne : any = resp ? resp.attributes.bibl.gallica_page_one.split('.')[0].substr(1) : 0
      return (parseInt(pageOne) - 1) + (resp.attributes['num-start-page'] - 1)
    } catch (e) {
      return 0
    }
  },
  computedBiblRef: (state) => {
    try {
      const resp = state.placeItem.responsibility
      return `${resp.attributes.bibl.abbr}, p. ${resp.attributes['num-start-page']}.`
    } catch (e) {
      return null
    }
  },
  gallicaLink: (state, getters) => {
    try {
      const resp = state.placeItem.responsibility
      return `https://gallica.bnf.fr/${resp.attributes.bibl.gallica_ark}/f${getters.canvasIndex + 1}.image`
    } catch (e) {
      return null
    }
  },
  IIIFAvailability: (state) => {
    try {
      return state.placeItem.responsibility.attributes.bibl.gallica_IIIF_availability
    } catch (e) {
      return false
    }
  },
  manifestUrl: (state) => {
    try {
      return `https://gallica.bnf.fr/iiif/${state.placeItem.responsibility.attributes.bibl.gallica_ark}/manifest.json`
    } catch (e) {
      return null
    }
  }
}
