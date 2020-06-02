import { ActionTree } from 'vuex'
import { PlaceState, Place } from './types'
import { RootState } from '../types'
import { api } from '@/utils/http-common'

function makeUrl (query: String, rangeParam: String, sort: String, pageSize: String, pageNumber: String) {
  return `/search?query=${query}${rangeParam}${sort}${pageSize}${pageNumber}`
}

function makeAggUrl (query: String, rangeParam: String, groupby: String, sort: String, pageSize: String, pageAfter: String) {
  const agg = `&groupby[doc-type]=place&groupby[field]=place-id.keyword`
  const after = pageAfter ? `&page[after]=${pageAfter}` : ''

  return `/search?query=${query}${rangeParam}${agg}${sort}${pageSize}${after}`
}

function makeUniqueDptUrl (query: String) {
  const dptUrl = `&groupby[doc-type]=insee-ref&groupby[field]=dep-id.keyword&groupby[id-mapping]=department&page[size]=1000&without-relationships`

  return `/search?query=${query}${dptUrl}`
}

function makeUniqueCantonUrl (query: String) {
  const ctnUrl = `&groupby[doc-type]=insee-ref&groupby[field]=ctn-id.keyword&page[size]=10000&without-relationships`
  return `/search?query=${query}${ctnUrl}`
}

function makeTimeFilterLowerBoundary (query: String) {
  return `/search?query=${query}&page[size]=1&sort=text-date&without-relationships`
}

function makeTimeFilterIntermediateStep (query: String, lastStep : number, step: number, lte: boolean = false) {
  return `/search?query=${query}&page[size]=1&range[text-date]=gte:${lastStep},${lte ? 'lte' : 'lt'}:${lastStep + step}&without-relationships`
}

function makeTimeFilterUpperBoundary (query: String) {
  return `/search?query=${query}&page[size]=1&sort=-text-date&without-relationships`
}

export const actions: ActionTree<PlaceState, RootState> = {
  selectPlace ({ commit, state, rootState }, place): any {
    commit('selectItem', place)
  },
  unselectPlace ({ commit, state, rootState }): any {
    commit('unselectItem')
  },
  clearAll ({ commit }, meta) {
    commit('clearAll', {
      links: {},
      meta: { totalCount: 0, ...meta }
    })
  },
  selectPreviousAggPage ({ commit, state, rootState }) {
    commit('popAfterHistory')
  },
  recordCurrentAggPage ({ commit, state, rootState }, after) {
    commit('pushAfterHistory')
  },
  async fetchUniqueLists ({ commit, rootState }, { query }) {
    commit('setLoading', true)
    try {
      /* generate the departement list to use for filtering operations */
      let res = await api.get(makeUniqueDptUrl(query))
      let data = res.data

      commit('setDepartmentList', data.data.map((d: any) => {
        return {
          id: d.attributes['insee-code'],
          label: `${d.attributes['insee-code']} - ${d.attributes['label']}`
        }
      }))

      /* generate the canton list to use for filtering operations */
      res = await api.get(makeUniqueCantonUrl(query))
      data = res.data

      commit('setCantonList', data.data.map((d: any) => {
        return {
          id: d.id,
          label: d.attributes['label'],
          depId: d.attributes['dep-insee-code']
        }
      }))
    } catch (error) {

    } finally {
      commit('setLoading', false)
    }
  },
  async searchPlace ({ commit, rootState }, { query, filterParam, rangeParam, groupbyPlace, sortParam, pageSize, pageNumber, after }) {
    commit('setLoading', true)
    // const index = `${process.env.VUE_APP_PLACE_INDEX}`
    const maxPageSize: number = process.env.VUE_APP_PLACE_INDEX_PAGE_SIZE

    const psize = `&page[size]=${pageSize > maxPageSize || pageSize === -1 ? maxPageSize : pageSize}`
    const pnum = `&page[number]=${pageNumber > 0 ? pageNumber : 1}`
    const sort = sortParam ? `&sort=${sortParam}` : ''
    const filteredQuery = filterParam ? `${query} AND ${filterParam}` : query
    const range = rangeParam ? `&${rangeParam}` : ''

    const url = groupbyPlace ? makeAggUrl(filteredQuery, range, groupbyPlace, sort, psize, after) : makeUrl(filteredQuery, range, sort, psize, pnum)

    let meta : any

    try {
      let res = await api.get(url)
      let data = res.data
      const items: Array<Place> = data.data.map((p: any) => {
        const longlat: any = p.attributes['longlat']
        let coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
        let item
        switch (p.type) {
          case 'place':
            const oldLabels = p.attributes['old-labels']
            item = {
              id: p.id,
              type: p.type,

              label: p.attributes['place-label'],
              placeLabel: p.attributes['place-label'],
              oldLabels: oldLabels ? oldLabels.reverse() : [],
              description: p.attributes['desc'],
              comment: p.attributes['comment'],

              insee_code: p.attributes['localization-insee-code'],
              communeLabel: p.attributes['commune-label'],
              department: p.attributes['dpt'],
              canton: p.attributes['canton'],
              region: p.attributes['region'],
              coordinates: coords
            }
            break
          case 'place-old-label':
            item = {
              id: p.id,
              type: p.type,
              label: p.attributes['rich-label'],

              placeId: p.attributes['place-id'],
              oldLabels: [],
              placeLabel: p.attributes['place-label'],
              description: p.attributes['place-desc'],
              date: p.attributes['text-date'],

              insee_code: p.attributes['localization-insee-code'],
              communeLabel: p.attributes['commune-label'],
              department: p.attributes['dpt'],
              canton: p.attributes['canton'],
              region: p.attributes['region'],
              coordinates: coords
            }
            break
        }
        return item
      })

      meta = {
        totalCount: data.meta['total-count']
      }
      if (data.meta['after']) {
        meta['after'] = data.meta['after']
      }
      // finally commit data to the store
      commit('setItems', { p: items, links: data.links, meta: meta })
    } catch (error) {

    } finally {
      commit('setLoading', false)
    }
  }

}
