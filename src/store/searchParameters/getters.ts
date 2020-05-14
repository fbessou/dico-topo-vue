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
    query = `label.folded:${state.term}`
    // query = `(place-label.folded:${state.term} AND NOT (type:"place-old-label")) OR (label.folded:${state.term} AND type:"place-old-label")` // include old labels means "do not filter on the type field"
    // query = `label:${state.term} AND NOT (type:"place-old-label")` // do not include old labels means "filter out the place-old-label type"
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
    if (!state.depFilter && !state.ctnFilter) {
      return ''
    }
    const depFilter = state.depFilter.map((value: any) => `dep-id:${value}`).join(' OR ')
    const ctnFilter = state.ctnFilter.map((value: any) => `ctn-id:${value}`).join(' OR ')

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
