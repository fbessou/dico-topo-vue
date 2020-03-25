<template>
    <div>
        <v-data-table
            class="fixed-header v-table__overflow"
            style="position: absolute; bottom: 0; max-height: 55%; width:100%"

            hide-default-header
            hide-default-footer
            :headers="headers"
            :items="items"

            :server-items-length="totalItems"
            :footer-props="footerProps"
            color="rgb(211, 47, 47)"
            dense
          >

            <template v-slot:header="{ props: { headers } }">
              <div class="toggle-table-down elevation-5">
                <slot></slot>
              </div>
              <thead class="elevation-2">
                <tr>
                  <th v-for="(h, index) in headers" :key="index" class="table-header">

                    <v-icon small v-if="h.prependIcon">{{h.prependIcon}}</v-icon>
                    {{h.text}}

                    <stateful-button v-if="!!h.sortable"
                                    inactive-icon="arrow_downward"
                                    active-icon="arrow_upward"
                                    :active="!!h.sorted"
                                    :disabled="true"
                                    :action="(value) => toggleSortField(index, value)"
                    >
                    </stateful-button>

                    <span v-if="!!h.filter">
                      <v-btn icon small @click="filterStates[h.value] = !filterStates[h.value]">
                        <v-icon small color="primary" v-if="filterSelections[h.value].length > 0">filter_list</v-icon>
                        <v-icon small  v-else>filter_list</v-icon>
                      </v-btn>
                      <filter-result
                        v-show="!!filterStates[h.value]"
                        :items="h.filter"
                        :on-change="h.filterCallback"
                        :key="searchedTerm"
                      ></filter-result>
                    </span>

                  </th>
                </tr>
              </thead>
            </template>

            <template v-slot:items="props">
              <td class="text-xs-left" style="width: 50px; !important">
                <v-flex shrink>
                  <v-btn flat fab small class="elevation-0 blue--text"
                         @click="() => selectItemWrapper(props.item)"
                         :disabled="!props.item.coordinates">
                    <v-icon>location_on</v-icon>
                  </v-btn>
                </v-flex>
              </td>
              <td v-if="!groupbyPlace" class="text-xs-left" style="width: 15%; !important;">
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <span v-html="clean(props.item.label)"></span>
                  </v-flex>
                </v-layout>
              </td>
              <td class="text-xs-left" style="width: 12%;">
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <router-link
                      :to="`/places/${props.item.type === 'place' ? props.item.id: props.item.placeId}`">
                      {{ clean(props.item.type === 'place' ? props.item.label : props.item.placeLabel ) }}
                    </router-link>
                  </v-flex>
                </v-layout>
              </td>
              <td v-if="!!groupbyPlace" class="text-xs-left" style="width: 25%;">
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <ul class="two-columns">
                      <li v-for="(oldLabel, index) in props.item.oldLabels"
                          :key="index"
                          v-if="!!clean(oldLabel)"
                          style="margin-right: 8px;"
                      >
                        <span v-html="clean(oldLabel)"></span>
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>
              </td>
              <td class="text-xs-center" style="width: 50px;">{{ props.item.department }}</td>
              <td class="text-xs-left">
                <span v-html=" clean(props.item.description)"></span>
              </td>
            </template>
            <template v-slot:footer>
              <div v-show="!!showTable" class="fixed-agg-footer elevation-5">
                  <v-layout row justify-space-between text-xs-center>
                    <v-flex  xs3 pa-1> </v-flex>
                    <v-flex xs3 pa-1></v-flex>
                    <v-flex xs3 pa-1 mr-3 class="text-xs-right">
                      <span>
                        <span v-if="!!groupbyPlace">
                          <span>
                            Lieux {{(numAggPage * pagination.rowsPerPage) + 1}} - {{(numAggPage * pagination.rowsPerPage)  + items.length}}  sur {{ totalItems }}
                          </span>
                          <v-btn icon @click="goToPageBefore" :disabled="loading || numAggPage === 0">
                            <v-icon>keyboard_arrow_left</v-icon>
                          </v-btn>
                          <v-btn icon @click="goToPageAfter"
                                :disabled="loading || !meta.after || ((numAggPage * pagination.rowsPerPage)  + items.length) >= totalItems">
                            <v-icon>keyboard_arrow_right</v-icon>
                          </v-btn>
                        </span>

                        <span v-else>
                          <span>
                            Toponymes {{(pagination.page - 1) * pagination.rowsPerPage + 1}} - {{((pagination.page -1) * pagination.rowsPerPage) + items.length}}  sur {{ totalItems }}
                          </span>
                          <v-btn icon @click="goToPageBefore" :disabled="loading || pagination.page <= 1">
                            <v-icon>keyboard_arrow_left</v-icon>
                          </v-btn>
                          <v-btn icon @click="goToPageAfter"
                                :disabled="loading || (((pagination.page - 1) * pagination.rowsPerPage) + items.length) >= totalItems">
                            <v-icon>keyboard_arrow_right</v-icon>
                          </v-btn>
                        </span>
                      </span>
                    </v-flex>
                  </v-layout>
              </div>
            </template>
          </v-data-table>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import LinkingMenu from './ui/LinkingMenu'
import ExportMenu from './ui/ExportMenu'
import StatefulButton from './ui/StatefulButton'
import FilterResult from './ui/FilterResult'
import { cleanStr } from '../utils/helpers'

import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'PlaceSearchTable',
  components: { StatefulButton, LinkingMenu, ExportMenu, FilterResult },
  props: {
    searchedTerm: { type: String, default: '' },
    selectItemCallback: { type: Function }
  },
  data () {
    return {
      totalItems: 0,
      loading: true,
      items: [],
      showTable: true,

      pagination: { rowsPerPage: 100 },
      numAggPage: 0,

      filterStates: {
        department: false
      },
      filterSelections: {
        department: []
      },

      maxPageSize: process.env.VUE_APP_PLACE_INDEX_PAGE_SIZE > 0 ? process.env.VUE_APP_PLACE_INDEX_PAGE_SIZE : 200
    }
  },
  mounted () {
    console.log('search table mounted')
  },
  watch: {
    pagination: {
      handler () {
        console.log('pagination:', this.pagination)
        this.fetchData()
      },
      deep: true
    },
    searchedTerm () {
      this.clearAll()
      this.numAggPage = 0
      this.pagination.page = 1

      Vue.set(this.filterSelections, 'department', [])
      this.setFilter({ filter: 'department', value: [] })
      this.fetchData()
    },
    computedSortParam () {
      this.pagination.page = 1
      this.fetchData()
    },
    computedFilterParam () {
      this.pagination.page = 1
      console.log('computed filter param', this.computedFilterParam)
      this.fetchData()
    },
    groupbyPlace () {
      this.numAggPage = 0
      this.pagination.page = 1
      this.fetchData()
    },
    range () {
      if (!!this.searchedTerm && this.searchedTerm.length > 2) {
        this.fetchData()
      }
    }
  },

  methods: {
    clean (str) {
      return cleanStr(str)
    },
    goToPageAfter () {
      if (this.groupbyPlace) {
        if (this.meta.after) {
          console.log('goto page after', this.afterKey)
          this.fetchData(this.afterKey)
          this.numAggPage += 1
        }
      } else {
        this.pagination.page += 1
        this.fetchData()
      }
    },
    goToPageBefore () {
      if (this.groupbyPlace) {
        this.selectPreviousAggPage()
        console.log('goto page before', this.afterKey)
        this.fetchData(this.afterKey)
        this.numAggPage += -1
      } else {
        this.pagination.page += -1
        this.fetchData()
      }
    },
    getDataFromApi (after = null) {
      this.loading = true
      if (this.groupbyPlace) {
        this.recordCurrentAggPage()
      }

      return new Promise((resolve, reject) => {
        if (this.searchedTerm.length < 3) {
          this.loading = false
          return
        }
        const { sortBy, descending, page, rowsPerPage } = this.pagination
        this.searchPlace({
          query: this.searchedTerm,
          rangeParam: this.computedRangeParam,
          filterParam: this.computedFilterParam,
          groupbyPlace: this.groupbyPlace,
          sortParam: this.computedSortParam,
          pageNumber: page,
          pageSize: rowsPerPage,
          after: after
        }).then(r => {
          let items = Array.from(this.placeItems.values())
          const total = this.meta.totalCount ? this.meta.totalCount : 0
          resolve({
            items,
            total
          })
          this.loading = false
        })
      })
    },

    fetchData: _.debounce(function (after) {
      this.getDataFromApi(after)
        .then(data => {
          this.items = data.items
          this.totalItems = data.total
        })
    }, 500
    ),
    selectItemWrapper (obj) {
      if (this.selectItemCallback) {
        const item = {
          id: obj.type === 'place' ? obj.id : obj.placeId,
          coordinates: [parseFloat(obj.coordinates[1]), parseFloat(obj.coordinates[0])]
        }
        this.selectItemCallback(item)
      }
    },

    toggleSortField (headerIndex, value) {
      const header = this.headers[headerIndex]
      console.log(header, value)
      if (header.sortable) {
        if (value === null) {
          this.removeSortField(header.sortKey)
        } else {
          const p = this.getSortParam(header.sortKey)
          if (p !== undefined) {
            this.updateSortField({ field: header.sortKey, order: value ? '-' : '' })
          } else {
            this.addSortField({ field: header.sortKey, order: value ? '-' : '' })
          }
        }
      }
    },
    filterDepChanged (selected) {
      Vue.set(this.filterSelections, 'department', selected || [])
      this.setFilter({ filter: 'department', value: this.filterSelections.department })
    },
    ...mapActions('places', ['fetchPlace', 'searchPlace', 'clearAll', 'selectPreviousAggPage', 'recordCurrentAggPage']),
    ...mapActions('searchParameters', ['addSortField', 'updateSortField', 'removeSortField', 'setFilter'])
  },
  computed: {
    headers () {
      const localisation = {
        text: '',
        prependIcon: 'location_on',
        align: 'center',
        value: 'icon',
        sortable: false,
        sortKey: 'is-localized',
        sorted: undefined
      }
      const toponym = {
        text: 'Toponyme',
        align: 'left',
        value: 'label',
        sortable: true,
        sortKey: 'label.keyword',
        sorted: undefined
      }
      const article = {
        text: 'Lieu',
        align: 'left',
        value: 'lieu',
        sortable: true,
        sortKey: 'place-label.keyword',
        sorted: true
      }
      const oldLabels = {
        text: 'Formes anciennes',
        value: 'old-labels',
        align: 'center',
        sortable: false,
        sortKey: 'label.keyword',
        sorted: undefined
      }
      const dep = {
        text: 'Département',
        value: 'department',
        align: 'center',
        sortable: true,
        sortKey: 'dep-id.keyword',
        sorted: undefined,
        filter: this.uniqueDepartments,
        filtered: undefined,
        filterCallback: _.debounce(this.filterDepChanged, 200)
      }
      const desc = {
        text: 'Description',
        value: 'description',
        align: 'left',
        sortable: false
      }
      if (this.groupbyPlace) {
        return [localisation, article, oldLabels, dep, desc]
      } else {
        return [localisation, toponym, article, dep, desc]
      }
    },

    footerProps () {
      return {
        itemsPerPageText: "Nombre d'éléments par page",
        itemsPerPageOptions: [100, 200, this.maxPageSize]
        /*
          pagination: {
            page: number
            itemsPerPage: number
            pageStart: number
            pageStop: number
            pageCount: number
            itemsLength: number
          }
         */
      }
    },

    afterKey () {
      return this.meta.after ? Object.values(this.meta.after).join(',') : null
    },
    ...mapState('places', {
      placeItems: 'items',
      meta: 'meta',
      selectedPlace: 'selectedItem',
      afterHistory: 'afterHistory',
      uniqueDepartments: 'uniqueDepartments'
    }),
    ...mapState('searchParameters', ['sortFields', 'groupbyPlace', 'depFilter', 'range']),
    ...mapGetters('searchParameters', ['computedSortParam', 'computedRangeParam', 'computedFilterParam', 'getSortParam'])
  }
}
</script>

<style>

  .fixed-agg-footer {
    width: 100%;
    background-color: #f5f5f5;
    border-top: 1px solid lightgrey;
    color: grey;
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }

  .toggle-table-down {
    position: absolute;
    top: -23px;
    left: calc(50% - 44px);
  }

  /* Theme */
  .fixed-header {
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .fixed-header table {
    background-color: #fafafa;
  }

  .fixed-header th {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: #f5f5f5;
  }

  .fixed-header th:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;

  }

  .fixed-header tr.v-datatable__progress th {
    height: 1px;
  }

  .v-data-table__empty-wrapper  {
    height: 250px;
  }

  .fixed-header .v-table__overflow {
    flex-grow: 1;
    flex-shrink: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .fixed-header .v-datatable.v-table {
    flex-grow: 0;
    flex-shrink: 1;
  }

  .fixed-header .v-datatable.v-table .v-datatable__actions {
    flex-wrap: nowrap;
  }

  .fixed-header .v-datatable.v-table .v-datatable__actions .v-datatable__actions__pagination {
    white-space: nowrap;
  }

  .two-columns {
    margin-left: 10px;
    columns: 3;
    -webkit-columns: 3;
    -moz-columns: 3;
  }
</style>
