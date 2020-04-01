<template>
        <v-data-table
            class="fixed-header v-table__overflow elevation-2"
            style="position: absolute; bottom: 0; max-height: 50%; width:100%"

            hide-default-header
            hide-default-footer
            fixed-header

            :headers="headers"
            :items="items"

            :server-items-length="totalItems"
            color="rgb(211, 47, 47)"
            dense
          >
            <template v-slot:header="{ props: { headers } }">
              <div class="toggle-table-down elevation-5">
                <slot></slot>
              </div>
              <thead>
                <tr>
                  <th v-for="(h, index) in headers" :key="index" :class="h.class">

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
                        :key="query"
                      ></filter-result>
                    </span>

                  </th>
                </tr>
              </thead>
            </template>

            <template  v-slot:body="{items}">
             <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td class="text-center" >
                      <v-btn icon fab class="blue--text very-small"
                            @click="() => selectItemWrapper(item)"
                            :disabled="!item.coordinates">
                        <v-icon>location_on</v-icon>
                      </v-btn>
                  </td>
                  <td v-if="!groupbyPlace" class="text-xs-left">
                    <span v-html="clean(item.label)"></span>
                  </td>
                  <td class="text-xs-left">
                    <router-link
                      :to="`/places/${item.type === 'place' ? item.id: item.placeId}`">
                        {{ clean(item.type === 'place' ? item.label : item.placeLabel ) }}
                    </router-link>
                  </td>
                  <td v-if="groupbyPlace" class="text-xs-left" >
                      <span v-html="clean(item.oldLabels.join('; '))"></span>
                  </td>
                  <td class="text-center" >{{ item.department }}</td>
                  <td class="text-xs-left">
                    <span v-html="clean(item.communeLabel)"></span>
                  </td>
                  <td class="text-xs-left">
                    <span v-html=" clean(item.description)"></span>
                  </td>
                </tr>
              </tbody>
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
                          <v-btn icon @click="goToPageBefore" :disabled="numAggPage === 0">
                            <v-icon>keyboard_arrow_left</v-icon>
                          </v-btn>
                          <v-btn icon @click="goToPageAfter"
                                :disabled="!meta.after || ((numAggPage * pagination.rowsPerPage)  + items.length) >= totalItems">
                            <v-icon>keyboard_arrow_right</v-icon>
                          </v-btn>
                        </span>

                        <span v-else>
                          <span>
                            Toponymes {{(pagination.page - 1) * pagination.rowsPerPage + 1}} - {{((pagination.page -1) * pagination.rowsPerPage) + items.length}}  sur {{ totalItems }}
                          </span>
                          <v-btn icon @click="goToPageBefore" :disabled="pagination.page <= 1">
                            <v-icon>keyboard_arrow_left</v-icon>
                          </v-btn>
                          <v-btn icon @click="goToPageAfter"
                                :disabled="(((pagination.page - 1) * pagination.rowsPerPage) + items.length) >= totalItems">
                            <v-icon>keyboard_arrow_right</v-icon>
                          </v-btn>
                        </span>
                      </span>
                    </v-flex>
                  </v-layout>
              </div>
            </template>
          </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import StatefulButton from './ui/StatefulButton'
import FilterResult from './ui/FilterResult'
import { cleanStr } from '../utils/helpers'

import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'PlaceSearchTable',
  components: { StatefulButton, FilterResult },
  props: {
    selectItemCallback: { type: Function },
    search: { type: Function, default: () => {} }
  },
  data () {
    return {
      loading: true,
      showTable: true,

      numAggPage: 0,

      filterStates: {
        department: false
      },
      filterSelections: {
        department: []
      }
    }
  },
  mounted () {
    console.log('search table mounted')
  },
  watch: {
    term () {
      console.log('term changed')
      this.clearAll()
      this.numAggPage = 0
      this.pagination.page = 1

      Vue.set(this.filterSelections, 'department', [])
      this.setFilter({ filter: 'department', value: [] })
      this.search()
    },
    computedSortParam () {
      this.pagination.page = 1
      this.search()
    },
    computedFilterParam () {
      this.pagination.page = 1
      console.log('computed filter param', this.computedFilterParam)
      this.search()
    },
    groupbyPlace () {
      this.numAggPage = 0
      this.pagination.page = 1
      this.search()
    },
    range () {
      if (!!this.query && this.query.length > 2) {
        this.search()
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
          this.search(this.afterKey)
          this.numAggPage += 1
        }
      } else {
        this.pagination.page += 1
        this.search()
      }
    },
    goToPageBefore () {
      if (this.groupbyPlace) {
        this.selectPreviousAggPage()
        console.log('goto page before', this.afterKey)
        this.search(this.afterKey)
        this.numAggPage += -1
      } else {
        this.pagination.page += -1
        this.search()
      }
    },
    selectItemWrapper (obj) {
      if (this.selectItemCallback) {
        const item = {
          id: obj.type === 'place' ? obj.id : obj.placeId,
          coordinates: [parseFloat(obj.coordinates[1]), parseFloat(obj.coordinates[0])]
        }
        this.selectItemCallback(item)
        this.setFlyToItem(item)
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
    ...mapActions('mapmarkers', ['setFlyToItem']),
    ...mapActions('places', ['fetchPlace', 'searchPlace', 'clearAll', 'selectPreviousAggPage', 'recordCurrentAggPage']),
    ...mapActions('searchParameters', ['addSortField', 'updateSortField', 'removeSortField', 'setFilter', 'setPagination'])
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
        sorted: undefined,
        class: 'localisation-header'
      }
      const toponym = {
        text: 'Toponyme',
        align: 'left',
        value: 'label',
        sortable: true,
        sortKey: 'label.keyword',
        sorted: undefined,
        class: 'place-header'

      }
      const article = {
        text: 'Lieu',
        align: 'left',
        value: 'lieu',
        sortable: true,
        sortKey: 'place-label.keyword',
        sorted: true,
        class: 'place-header'
      }
      const oldLabels = {
        text: 'Formes anciennes',
        value: 'old-labels',
        align: 'left',
        sortable: false,
        sortKey: 'label.keyword',
        sorted: undefined,
        class: 'old-labels-header'
      }
      const dep = {
        text: 'Dép.',
        value: 'department',
        align: 'left',
        sortable: true,
        sortKey: 'dep-id.keyword',
        sorted: undefined,
        filter: this.uniqueDepartments,
        filtered: undefined,
        filterCallback: _.debounce(this.filterDepChanged, 200),
        class: 'departement-header'
      }
      const commune = {
        text: 'Commune',
        align: 'left',
        value: 'commune',
        sortable: true,
        sortKey: 'commune-label.keyword',
        sorted: undefined,
        class: 'commune-header'
      }
      const desc = {
        text: 'Description',
        value: 'description',
        align: 'left',
        sortable: false,
        class: 'description-header'
      }
      if (this.groupbyPlace) {
        return [localisation, article, oldLabels, dep, commune, desc]
      } else {
        return [localisation, toponym, article, dep, commune, desc]
      }
    },
    items () {
      return this.placeItems ? Array.from(this.placeItems.values()) : []
    },
    totalItems () {
      return this.meta && this.meta.totalCount ? this.meta.totalCount : 0
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
    ...mapState('searchParameters', ['sortFields', 'groupbyPlace', 'depFilter', 'range', 'term']),
    ...mapState('searchParameters', { storedPagination: 'pagination' }),
    ...mapGetters('searchParameters', ['computedSortParam', 'computedRangeParam', 'computedFilterParam', 'getSortParam', 'query']),
    pagination: {
      get () {
        return this.storedPagination
      },
      set (value) {
        this.setPagination(value)
      }
    }
  }
}
</script>

<style>
  .localisation-header {
    min-width: 60px;
    text-align: center !important;
  }
  .place-header {
    min-width: 230px;
  }
  .old-labels-header {
    min-width: 400px;
  }
  .departement-header {
    min-width: 120px;
  }
  .commune-header {
    min-width: 200px;
  }
  .description-header {
    min-width: 650px;
  }
  .very-small {
    height: 26px !important;
    width: 26px !important;
  }
  dfn {
    font-style: normal !important;
  }

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
