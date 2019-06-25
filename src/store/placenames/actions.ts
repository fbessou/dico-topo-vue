import {ActionTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";



function makeUrl(query: String, sort: String, pageSize: String, pageNumber: String) {
  return `/search?query=${query}${sort}${pageSize}${pageNumber}`;
}

function makeAggUrl(query: String, groupby: String, sort: String, pageSize: String, pageAfter: String) {
  const agg = `&groupby[doc-type]=placename&groupby[field]=placename-id.keyword`;
  const after = !!pageAfter ? `&page[after]=${pageAfter}` : ''

  return `/search?query=${query}${agg}${sort}${pageSize}${after}`;
}

export const actions: ActionTree<PlacenameState, RootState> = {
  selectPlacename({commit, state, rootState}, placename): any {
    commit('selectItem', placename)
  },
  unselectPlacename({commit, state, rootState}): any {
    commit('unselectItem')
  },
  searchPlacename({commit, rootState}, {query, groupbyPlacename, sortParam, pageSize, pageNumber, after}): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`;
    const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE;

    const psize = `&page[size]=${pageSize > maxPageSize || pageSize === -1 ? maxPageSize : pageSize}`;
    const pnum = `&page[number]=${pageNumber > 0 ? pageNumber : 1}`;
    const sort = !!sortParam ? `&sort=${sortParam}` : '';

    const url = !!groupbyPlacename ? makeAggUrl(query, groupbyPlacename, sort, psize, after) : makeUrl(query, sort, psize, pnum);

    console.log(groupbyPlacename);

    return api.get(url)
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
                  placenameLabel: p.attributes["placename-label"],
                  oldLabels: p.attributes["old-labels"].reverse(),
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
                  oldLabels: [],
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
