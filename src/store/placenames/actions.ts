import {ActionTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiOkResponse, ApiResponse} from "apisauce";



function makeUrl(query: String, rangeParam: String, sort: String, pageSize: String, pageNumber: String) {
  return `/search?query=${query}${rangeParam}${sort}${pageSize}${pageNumber}`;
}

function makeAggUrl(query: String, rangeParam: String, groupby: String, sort: String, pageSize: String, pageAfter: String) {
  const agg = `&groupby[doc-type]=placename&groupby[field]=placename-id.keyword`;
  const after = !!pageAfter ? `&page[after]=${pageAfter}` : ''

  return `/search?query=${query}${rangeParam}${agg}${sort}${pageSize}${after}`;
}

function makeUniqueDptUrl(query: String) {
  const dptUrl = `&groupby[doc-type]=insee-ref&groupby[field]=dep-id.keyword&page[size]=1000&without-relationships`;

  return `/search?query=${query}${dptUrl}`;
}

function makeTimeFilterLowerBoundary(query: String) {
  return `/search?query=${query}&page[size]=1&sort=text-date`;
}

function makeTimeFilterIntermediateStep(query: String, lastStep:Number, step: Number) {
  return `/search?query=${query}&page[size]=1&sort=-text-date`;
}

function makeTimeFilterHigherBoundary(query: String) {
  return `/search?query=${query}&page[size]=1&sort=-text-date`;
}

export const actions: ActionTree<PlacenameState, RootState> = {
  selectPlacename({commit, state, rootState}, placename): any {
    commit('selectItem', placename)
  },
  unselectPlacename({commit, state, rootState}): any {
    commit('unselectItem')
  },
  clearAll({commit}, meta) {
    commit('clearAll', {
      links: {},
      meta: {totalCount: 0, ...meta}
    });
  },
  selectPreviousAggPage({commit, state, rootState}) {
    commit("popAfterHistory");
  },
  recordCurrentAggPage({commit, state, rootState}, after) {
    commit("pushAfterHistory");
  },
  searchPlacename({commit, rootState}, {query, filterParam, rangeParam, groupbyPlacename, sortParam, pageSize, pageNumber, after}): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`;
    const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE;

    const psize = `&page[size]=${pageSize > maxPageSize || pageSize === -1 ? maxPageSize : pageSize}`;
    const pnum = `&page[number]=${pageNumber > 0 ? pageNumber : 1}`;
    const sort = !!sortParam ? `&sort=${sortParam}` : '';
    const filteredQuery = !!filterParam ? `${query} AND ${filterParam}` : query;
    const range = !!rangeParam ? `&${rangeParam}` : '';

    const url = !!groupbyPlacename ? makeAggUrl(filteredQuery, range, groupbyPlacename, sort, psize, after) : makeUrl(filteredQuery, range, sort, psize, pnum);

      return api.get(url)
        .then((res: ApiResponse<any>) => {
          const {ok, data} = res;
          if (ok) {
            const items: Array<Placename> = data.data.map((p: any) => {
              const longlat: any = p.attributes["longlat"]
              let coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
              let item
              switch (p.type) {
                case "placename":
                  const oldLabels = p.attributes["old-labels"];
                  item = {
                    id: p.id,
                    type: p.type,

                    label: p.attributes["placename-label"],
                    placenameLabel: p.attributes["placename-label"],
                    oldLabels: !!oldLabels ? oldLabels.reverse() : [],
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
                    date: p.attributes["text-date"],

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

            let meta: any = {
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
        }).then(() => {

          /* fetch data to feed the TimeFilter */
          api.get(makeTimeFilterLowerBoundary(filteredQuery)).then((response: ApiResponse<any>) => {
            response.data = parseInt(response.data.data[0].attributes['text-date'])
            console.log("lower time filter boundary:", response.data);
            return response;
          }).then((response: ApiResponse<any>) => {

            // add the lower boundary
            let knownYears = [response.data];

            return api.get(makeTimeFilterHigherBoundary(filteredQuery)).then((response: ApiResponse<any>) => {
              response.data = parseInt(response.data.data[0].attributes['text-date'])
              console.log("higher time filter boundary:", response.data);
              return response;
            }).then((response: ApiResponse<any>) => {
              // add the higher boundary
              knownYears.push(response.data);
              commit('setKnownYears', knownYears);
            })

          })

          return api.get(makeUniqueDptUrl(filteredQuery)).then((res: ApiResponse<any>) => {
            const {ok, data} = res;
            if (ok) {
              data.data.map((d: any) => {
                commit('addDepartment', `${d.attributes['insee-code']} - ${d.attributes['label']}`);
              });
              commit('setLoading', false);
            }
          })
        })
        .catch((error: any) => {
          commit('setError', error.message)
          commit('setLoading', false)
        })




  }
};
