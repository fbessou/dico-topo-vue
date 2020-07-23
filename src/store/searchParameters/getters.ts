// profile/getters.ts
import { GetterTree } from 'vuex'
import { QueryState } from './types'
import { RootState } from '../types'

const minTermLength = 2

export const getters: GetterTree<QueryState, RootState> = {
  query (state): any {
    let query
    if (!state.term || state.term.length < minTermLength) {
      return undefined
    }
    const fuzz = Math.max(state.fuzziness, 0)
    query = `label.folded:${state.term}${fuzz > 0 ? `~${fuzz}` : ''}`
    // query = `(place-label.folded:${state.term} AND NOT (type:"place-old-label")) OR (label.folded:${state.term} AND type:"place-old-label")` // include old labels means "do not filter on the type field"
    // query = `label:${state.term} AND NOT (type:"place-old-label")` // do not include old labels means "filter out the place-old-label type"
    return query
  },
  getSortOrder: (state) => (key: any) => {
    const idx = state.sortFields.findIndex((o) => o.key === key)
    return idx > -1 ? state.sortFields[idx].order : null
  },
  getSortOrderOfSort: (state) => (key: any) => {
    let num = state.sortFields.findIndex((o) => o.key === key) + 1
    // if in groupby mode then check if toponym column is currently sorted
    // if it is, as the column is hidden, the sort num must be num -1
    if (state.groupbyPlace && state.sortFields.findIndex((o) => o.key === 'label.keyword') !== -1 && key !== 'label.keyword') {
      num = num - 1
    }
    return num
  },
  computedSortParam (state): any {
    return state.sortFields.map((o) => `${o.order === 'ASC' ? '-' : ''}${o.key}`).join(',')
  },
  computedFilterParam (state): any {
    if (!state.depFilter && !state.ctnFilter) {
      return ''
    }
    const depFilter = state.depFilter.map((item: any) => `dep-id:${item.value}`).join(' OR ')
    const ctnFilter = state.ctnFilter.map((item: any) => `ctn-id:${item.value}`).join(' OR ')

    let filters = []
    if (depFilter) {
      filters.push(`(${depFilter})`)
    }
    if (ctnFilter) {
      filters.push(`(${ctnFilter})`)
    }

    const result = filters.join(' AND ')

    return result ? `(${result})` : ''
  },
  computedRangeParam (state): any {
    let result = ''
    if (state.range.operators.length >= 1) {
      result = `range[${state.range.key}]=${state.range.operators.join(',')}`
    }
    return result
  }
}
