<template>
  <v-data-table
    class="fixed-header v-table__overflow elevation-2"
    :class="fullscreen ? 'fullscreen-table' : 'normal-table'"
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
      <div class="toggle-table-down elevation-5 grey lighten-3 text-center">
        <slot></slot>
      </div>
      <thead>
        <tr>
          <th
            v-for="(h, index) in headers"
            :key="index"
            class="overline font-weight-regular grey lighten-3"
            :class="fullscreen ? `fullscreen-table-th ${h.class}` : h.class"
          >
            <v-icon small v-if="h.prependIcon">{{ h.prependIcon }}</v-icon>

            <span class="mr-1">{{ h.text }}</span>
            <!--
            <group-by-widget v-if="index === 1" />
            -->

            <sort-button
              v-if="!!h.sortable"
              desc-icon="arrow_downward"
              asc-icon="arrow_upward"
              :sort-state="h.sorted"
              :action="value => toggleSortField(index, value)"
            >
            </sort-button>
            <span
              v-show="!!h.sortable && h.sorted !== 'NONE'"
              small
              :ripple="false"
              text-color="primary"
              class="sortOrderNum"
            >
              {{getSortOrderOfSort(h.sortKey)}}
            </span>

            <span v-if="!!h.filter">
              <v-btn
                icon
                small
                @click="filterStates[h.value] = !filterStates[h.value]"
              >
                <v-icon
                  small
                  color="blue"
                  v-if="filterSelections[h.value].length > 0"
                  >mdi-filter-menu</v-icon
                >
                <v-icon small v-else>mdi-filter</v-icon>
              </v-btn>
              <filter-result
                v-show="!!filterStates[h.value]"
                :items="h.filter"
                :on-change="h.filterCallback"
                :key="query"
              ></filter-result>
            </span>

            <v-btn
              small
              icon
              text
              class="fullscreen-table-btn mr-3"
              v-if="index === headers.length - 1"
              @click="toggleFullscreen"
            >
              <v-icon>mdi-arrow-expand</v-icon>
            </v-btn>
          </th>
        </tr>
      </thead>
    </template>

    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="text-center">
            <v-btn
              icon
              fab
              class="blue--text very-small"
              @click="() => selectItemWrapper(item)"
              :disabled="!item.coordinates"
            >
              <v-icon>location_on</v-icon>
            </v-btn>
          </td>
          <td v-if="!groupbyPlace" class="text-xs-left">
            <span v-html="clean(item.label)"></span>
          </td>
          <td class="text-xs-left">
            <router-link
              :to="`/places/${item.type === 'place' ? item.id : item.placeId}`"
            >
              {{ clean(item.type === "place" ? item.label : item.placeLabel) }}
            </router-link>
          </td>
          <td v-if="groupbyPlace" class="text-xs-left">
            <span v-html="clean(item.oldLabels.join(' ; '))"></span>
          </td>
          <td class="text-center">{{ item.department }}</td>
          <td class="text-xs-left">{{ item.canton }}</td>
          <td class="text-xs-left">
            <span v-html="clean(item.communeLabel)"></span>
          </td>
          <td class="text-xs-left">
            <span v-html="clean(item.description)"></span>
          </td>
        </tr>
      </tbody>
    </template>

    <template v-slot:footer>
      <div v-show="!!showTable" class="fixed-agg-footer grey lighten-3">
        <span
          class="overline font-weight-regular text-xs-right d-flex justify-end mr-5"
        >
          <span v-if="!!groupbyPlace">
            <span v-show="meta.totalCount">
              Lieux {{ numAggPage * pagination.rowsPerPage + 1 }} -
              {{ numAggPage * pagination.rowsPerPage + items.length }} sur
              {{ totalItems }}
            </span>
            <v-btn icon @click="goToPageBefore" :disabled="numAggPage === 0">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="goToPageAfter"
              :disabled="
                !meta.after ||
                  numAggPage * pagination.rowsPerPage + items.length >=
                    totalItems
              "
            >
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </span>

          <span v-else>
            <span v-show="meta.totalCount">
              Toponymes
              {{ (pagination.page - 1) * pagination.rowsPerPage + 1 }} -
              {{
                (pagination.page - 1) * pagination.rowsPerPage + items.length
              }}
              sur {{ totalItems }}
            </span>
            <v-btn
              icon
              @click="goToPageBefore"
              :disabled="pagination.page <= 1"
            >
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="goToPageAfter"
              :disabled="
                (pagination.page - 1) * pagination.rowsPerPage + items.length >=
                  totalItems
              "
            >
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </span>
        </span>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SortButton from './ui/SortButton'
import FilterResult from './ui/FilterResult'
// import GroupByWidget from './ui/GroupByWidget'

import { cleanStr } from '../utils/helpers'

import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'PlaceSearchTable',
  components: { SortButton, FilterResult },
  props: {
    selectItemCallback: { type: Function }
  },
  data () {
    return {
      loading: true,
      showTable: true,
      fullscreen: false,

      numAggPage: 0,

      filterStates: {
        department: false,
        canton: false
      },
      filterSelections: {
        department: [],
        canton: []
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

      // Vue.set(this.filterSelections, 'department', [])
      // this.setFilter({ filter: 'department', value: [] })
      // Vue.set(this.filterSelections, 'canton', [])
      // this.setFilter({ filter: 'canton', value: [] })

      this.fetchTableResults()
    },
    computedSortParam () {
      this.pagination.page = 1
      this.fetchTableResults()
    },
    computedFilterParam () {
      this.pagination.page = 1
      console.log('computed filter param', this.computedFilterParam)
      this.fetchTableResults()
    },
    groupbyPlace () {
      this.numAggPage = 0
      this.pagination.page = 1
      this.fetchTableResults()
    },
    range () {
      if (!!this.query && this.query.length > 2) {
        this.fetchTableResults()
      }
    }
  },

  methods: {
    ...mapActions('searchParameters', ['searchCallback', 'fetchTableResults']),
    clean (str) {
      return cleanStr(str)
    },
    goToPageAfter () {
      if (this.groupbyPlace) {
        if (this.meta.after) {
          console.log('goto page after', this.afterKey)
          this.fetchTableResults(this.afterKey)
          this.numAggPage += 1
        }
      } else {
        this.pagination.page += 1
        this.fetchTableResults()
      }
    },
    goToPageBefore () {
      if (this.groupbyPlace) {
        this.selectPreviousAggPage()
        console.log('goto page before', this.afterKey)
        this.fetchTableResults(this.afterKey)
        this.numAggPage += -1
      } else {
        this.pagination.page += -1
        this.fetchTableResults()
      }
    },
    selectItemWrapper (obj) {
      if (this.selectItemCallback) {
        const item = {
          id: obj.type === 'place' ? obj.id : obj.placeId,
          coordinates: [
            parseFloat(obj.coordinates[1]),
            parseFloat(obj.coordinates[0])
          ]
        }
        this.selectItemCallback(item)
        this.setFlyToItem(item)
      }
    },

    toggleSortField (headerIndex, value) {
      const header = this.headers[headerIndex]
      console.log(header, value)
      if (header.sortable) {
        if (value !== 'ASC' && value !== 'DESC') {
          this.removeSortField(header.sortKey)
        } else {
          const p = this.getSortOrder(header.sortKey)
          const sortField = {
            field: header.sortKey,
            order: value
          }
          if (p !== null) {
            this.updateSortField(sortField)
          } else {
            this.addSortField(sortField)
          }
        }
      }
    },
    filterDepChanged (selected) {
      Vue.set(this.filterSelections, 'department', selected || [])
      this.setFilter({
        filter: 'department',
        value: this.filterSelections.department.map(d => d.value)
      })
    },
    filterCtnChanged (selected) {
      Vue.set(this.filterSelections, 'canton', selected || [])
      this.setFilter({
        filter: 'canton',
        value: this.filterSelections.canton.map(d => d.value)
      })
    },
    toggleFullscreen () {
      // this.unselectPlace()
      this.fullscreen = !this.fullscreen
    },
    ...mapActions('mapmarkers', ['setFlyToItem']),
    ...mapActions('places', [
      'fetchPlace',
      'searchPlace',
      'clearAll',
      'selectPreviousAggPage',
      'recordCurrentAggPage',
      'unselectPlace'
    ]),
    ...mapActions('searchParameters', [
      'addSortField',
      'updateSortField',
      'removeSortField',
      'setFilter',
      'setPagination'
    ])
  },
  computed: {
    headers () {
      const localisation = {
        text: '',
        prependIcon: 'location_on',
        align: 'center',
        value: 'icon',
        sortable: false,
        class: 'localisation-header'
      }

      const toponym = {
        text: 'Toponyme',
        align: 'left',
        value: 'label',
        sortable: true,
        sortKey: 'label.keyword',
        sorted: this.getSortOrder('label.keyword') || 'NONE',
        class: 'place-header'
      }
      const article = {
        text: 'Lieu',
        align: 'left',
        value: 'lieu',
        sortable: true,
        sortKey: 'place-label.keyword',
        sorted: this.getSortOrder('place-label.keyword') || 'NONE',
        class: 'place-header'
      }
      const oldLabels = {
        text: 'Formes anciennes',
        value: 'old-labels',
        align: 'left',
        sortable: false,
        class: 'old-labels-header'
      }
      const dep = {
        text: 'Dép.',
        value: 'department',
        align: 'left',
        sortable: true,
        sortKey: 'dep-id.keyword',
        sorted: this.getSortOrder('dep-id.keyword') || 'NONE',
        filter: this.uniqueDepartments,
        filtered: undefined,
        filterCallback: _.debounce(this.filterDepChanged, 200),
        class: 'departement-header'
      }
      const canton = {
        text: 'Canton',
        value: 'canton',
        align: 'left',
        sortable: true,
        sortKey: 'ctn-label.keyword',
        sorted: this.getSortOrder('ctn-label.keyword') || 'NONE',
        filter: this.uniqueCantons,
        filtered: undefined,
        filterCallback: _.debounce(this.filterCtnChanged, 200),
        class: 'canton-header'
      }
      const commune = {
        text: 'Commune',
        align: 'left',
        value: 'commune',
        sortable: true,
        sortKey: 'commune-label.keyword',
        sorted: this.getSortOrder('commune-label.keyword') || 'NONE',
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
        return [localisation, article, oldLabels, dep, canton, commune, desc]
      } else {
        return [localisation, toponym, article, dep, canton, commune, desc]
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
      uniqueDepartments: 'uniqueDepartments',
      uniqueCantons: 'uniqueCantons',
      tableResultIsLoading: 'isLoading'
    }),
    ...mapState('searchParameters', [
      'sortFields',
      'groupbyPlace',
      'depFilter',
      'ctnFilter',
      'range',
      'term'
    ]),
    ...mapState('searchParameters', { storedPagination: 'pagination' }),
    ...mapGetters('searchParameters', [
      'computedSortParam',
      'computedRangeParam',
      'computedFilterParam',
      'getSortOrder',
      'getSortOrderOfSort',
      'query'
    ]),
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
.sortOrderNum {
  color: rgb(38, 123, 219);
  font-weight: bold;
  position: relative;
  left: -10px;
  top: 6px
}

.localisation-header {
  width: 60px;
  text-align: center !important;
}
.place-header {
  width: 230px;
  min-width: 170px;
}
.old-labels-header {
  min-width: 190px;
  width: 550px;
}
.departement-header {
  width: 120px;
}
.canton-header {
  width: 200px;
}
.commune-header {
  width: 200px;
  min-width: 100px;
}
.description-header {
  width: 500px;
  min-width: 320px;
}
.very-small {
  height: 26px !important;
  width: 26px !important;
}
dfn {
  font-style: normal !important;
}
.fullscreen-table-btn {
  position: absolute;
  right: 0px;
  clear: both;
  top: 2px;
}

.fullscreen-table {
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.fullscreen-table-th {
  height: 60px !important;
}
.normal-table {
  position: absolute;
  bottom: 0;
  height: 40%;
  width: 100%;
}

.fixed-agg-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border: 1px solid grey;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
}

.toggle-table-down {
  position: absolute;
  top: -26px;
  left: calc(50% - 35px);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.sc {
  font-variant: small-caps;
}

/* Theme */
.fixed-header {
  display: flex;
  flex-direction: column;
}

.fixed-header th {
  position: sticky;
  top: 0;
  z-index: 5;
  color: black !important;
}

.fixed-header th:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
}

.fixed-header tr.v-datatable__progress th {
  height: 1px;
}

.v-data-table__empty-wrapper {
  height: 250px;
}

.fixed-header .v-table__overflow {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.v-data-table--fixed-header .v-data-table__wrapper {
  height: 100%;
}

.fixed-header .v-datatable.v-table {
  flex-grow: 0;
  flex-shrink: 1;
}

.fixed-header .v-datatable.v-table .v-datatable__actions {
  flex-wrap: nowrap;
}

.fixed-header
  .v-datatable.v-table
  .v-datatable__actions
  .v-datatable__actions__pagination {
  white-space: nowrap;
}

.two-columns {
  margin-left: 10px;
  columns: 3;
  -webkit-columns: 3;
  -moz-columns: 3;
}
</style>
