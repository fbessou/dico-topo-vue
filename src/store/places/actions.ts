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
  const dptUrl = `&groupby[doc-type]=insee-ref&groupby[field]=dep-id.keyword&page[size]=1000&without-relationships`

  return `/search?query=${query}${dptUrl}`
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
            region: p.attributes['region'],
            coordinates: coords,

            geoname_id: p.attributes['geoname-id'],
            wikidata_item_id: p.attributes['wikidata-item-id'],
            wikipedia_url: p.attributes['wikipedia-url'],
            databnf_ark: p.attributes['databnf-ark'],
            viaf_id: p.attributes['viaf-id'],
            siaf_id: p.attributes['siaf-id']
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
            region: p.attributes['region'],
            coordinates: coords,

            geoname_id: p.attributes['geoname-id'],
            wikidata_item_id: p.attributes['wikidata-item-id'],
            wikipedia_url: p.attributes['wikipedia-url'],
            databnf_ark: p.attributes['databnf-ark'],
            viaf_id: p.attributes['viaf-id'],
            siaf_id: p.attributes['siaf-id']
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

    commit('setItems', { p: items, links: data.links, meta: meta })

    res = await api.get(makeUniqueDptUrl(filteredQuery))
    data = res.data
    data.data.map((d: any) => {
      commit('addDepartment', `${d.attributes['insee-code']} - ${d.attributes['label']}`)
    })
  }

  /*
    return api.get(url)
      .then((res: ApiResponse<any>) => {
        const { ok, data } = res
        if (ok) {

        } else {
          commit('setError', data)
          commit('setLoading', false)
        }
      }).then(() => {
        // fetch data to feed the TimeFilter
        api.get(makeTimeFilterLowerBoundary(filteredQuery)).then((response: ApiResponse<any>) => {
          response.data = parseInt(response.data.data[0].attributes['text-date'])
          console.log('lower time filter boundary:', response.data)
          return response
        }).then((response: ApiResponse<any>) => {
          const lowerBound = response.data
          // add the lower boundary

          return api.get(makeTimeFilterUpperBoundary(filteredQuery)).then((response: ApiResponse<any>) => {
            response.data = parseInt(response.data.data[0].attributes['text-date'])
            console.log('upper time filter boundary:', response.data)
            return response
          }).then(async (response: ApiResponse<any>) => {
            const upperBound = response.data

            const d = Math.abs(upperBound) - Math.abs(lowerBound)

            let n
            if (meta.totalCount <= 100) {
              n = 10
            } else if (meta.totalCount <= 200) {
              n = 15
            } else if (meta.toatlCount <= 500) {
              n = 20
            } else if (meta.toatlCount <= 2000) {
              n = 25
            } else {
              n = 50
            }

            let step = Math.floor(d / n) <= 1 ? 1 : Math.floor(d / n)

            let knownYears = []
            let lastStep = lowerBound
            for (let i = 0; i <= n; i++) {
              const stepResp: ApiResponse<any> = await api.get(makeTimeFilterIntermediateStep(filteredQuery, lastStep, step))
              const count = stepResp.data.meta['total-count']
              console.log(lastStep, lastStep + step, count)
              knownYears.push({ year: lastStep, count: count })
              lastStep += step
            }
            const stepResp: ApiResponse<any> = await api.get(makeTimeFilterIntermediateStep(
              filteredQuery,
              lastStep,
              Math.abs(upperBound) - Math.abs(lastStep),
              true)
            )
            const count = stepResp.data.meta['total-count']
            console.log(lastStep, lastStep + Math.abs(upperBound) - Math.abs(lastStep), count)
            knownYears.push({ year: lastStep + Math.abs(upperBound) - Math.abs(lastStep), count: count })

            commit('setKnownYears', knownYears)
          })
        })
*/

}
