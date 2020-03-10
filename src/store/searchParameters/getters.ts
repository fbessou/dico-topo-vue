// profile/getters.ts
import { GetterTree } from 'vuex'
import { QueryState, SortableField } from './types'
import { RootState } from '../types'

const minTermLength = 2

export const getters: GetterTree<QueryState, RootState> = {
  query (state): any {
    let query
    if (!state.term || state.term.length < minTermLength) {
      return undefined
    }
    query = `label:${state.term}` // include old labels means "do not filter on the type field"
    // query = `label:${state.term} AND NOT (type:"place-old-label")` // do not include old labels means "filter out hte place-old-label type"
    return query
  },
  getSortParam: (state) => (key: any) => {
    const idx = state.sortFields.findIndex((o) => o.key === key)
    return idx > -1 ? state.sortFields[idx] : undefined
  },
  computedSortParam (state): any {
    return state.sortFields.map((o) => `${o.order}${o.key}`).join(',')
  },
  computedFilterParam (state): any {
    if (!state.depFilter) {
      return ''
    }
    const depFilter = state.depFilter.map((value: any) => `dep-id:${value.split(' ')[0]}`).join(' OR ')

    let filters = []
    if (depFilter) {
      filters.push(depFilter)
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
