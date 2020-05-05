// profile/getters.ts
import { GetterTree } from 'vuex'
import { BiblState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<BiblState, RootState> = {
  getCanvasIndex: (state) => (numPage: number) => {
    const pageOne : any = state.bibl ? state.bibl.gallica_page_one.split('.')[0].substr(1) : 0
    console.log('page', pageOne, numPage)
    return (parseInt(pageOne) - 1) + (numPage - 1)
  }
}
