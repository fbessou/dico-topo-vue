import {ActionTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<PlacenameState, RootState> = {
  selectPlacename({commit, state, rootState}, placename): any {
    commit('selectItem', placename)
  },
  unselectPlacename({commit, state, rootState}): any {
    commit('unselectItem')
  },
  searchPlacename({commit, rootState}, {query, groupbyPlacename, sortParam, pageSize, pageNumber, after}): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`
    const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE
    const searchPageSize = pageSize > maxPageSize || pageSize === -1 ? maxPageSize: pageSize
    const searchPageNumber = pageNumber > 0 ? pageNumber : 1
    const sort = !!sortParam ? `&sort=${sortParam}` : '';

    let agg = groupbyPlacename ? `&groupby[model]=placename&groupby[field]=placename-id.keyword` : '';
    if (!!after) {
      agg = agg + `&groupby[after]=${after}`;
    }

    return api.get(`/search?query=${query}${agg}&index=${index}${sort}&page[size]=${searchPageSize}&page[number]=${searchPageNumber}`)
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const items : Array<Placename> = data.data.map((p: any) => {
            const longlat: any = p.attributes["longlat"]
            let coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
            let item
            switch (p.type) {
              case "placename":
                item = {
                  id: p.id,
                  type: p.type,

                  label: p.attributes["placename-label"],
                  description: p.attributes["desc"],
                  comment: p.attributes["comment"],

                  insee_code: p.attributes["localization-insee-code"],
                  department: p.attributes["dpt"],
                  region: p.attributes["region"],
                  coordinates: coords,

                  geoname_id: p.attributes["geoname-id"],
                  wikidata_item_id: p.attributes["wikidata-item-id"],
                  wikipedia_url: p.attributes["wikipedia-url"],
                  databnf_ark: p.attributes["databnf-ark"],
                  viaf_id: p.attributes["viaf-id"]
                }
                break;
              case "placename-old-label":
                item = {
                  id: p.id,
                  type: p.type,
                  label: p.attributes["rich-label"],

                  placenameId: p.attributes["placename-id"],
                  placenameLabel: p.attributes["placename-label"],
                  description: p.attributes["placename-desc"],

                  insee_code: p.attributes["localization-insee-code"],
                  department: p.attributes["dpt"],
                  region: p.attributes["region"],
                  coordinates: coords,

                  geoname_id: p.attributes["geoname-id"],
                  wikidata_item_id: p.attributes["wikidata-item-id"],
                  wikipedia_url: p.attributes["wikipedia-url"],
                  databnf_ark: p.attributes["databnf-ark"],
                  viaf_id: p.attributes["viaf-id"]
                }
                break;
            }
            return item
          })

          let  meta : any = {
            totalCount: data.meta["total-count"]
          };
          if (!!data.meta["after"]) {
            meta["after"] = data.meta["after"];
          }

          commit('setItems', {p: items, links: data.links, meta: meta})
        } else {
          commit('setError', data)
          commit('setLoading', false)
        }
        commit('setLoading', false)
      })
      .catch((error: any) => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  }
};
