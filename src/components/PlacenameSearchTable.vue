<template>
    <div>
        <div v-if="showTable" class="toggle-table-down" @click="showTable = !showTable">
          <slot></slot>
        </div>
      
        <v-data-table
            class="elevation-4 fixed-header v-table__overflow"
            style="position: fixed; bottom: 0;  max-height: 60%;"
            v-show="showTable"
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            :total-items="totalItems"
            rows-per-page-text="Nombre d'éléments par page"
            :rows-per-page-items="[100,200,maxPageSize]"
            hide-actions
            color="rgb(211, 47, 47)"
          >
          <template v-slot:headers>
              <th v-for="(h, index) in headers" :key="h.text" class="table-header">
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
                   ></filter-result>
                 </span>
                
              </th>
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
              <td v-if="!groupbyPlacename" class="text-xs-left" style="width: 15%; !important;">
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <span>{{ cleanStr(props.item.label) }}</span>
                  </v-flex>
                </v-layout>
              </td>
              <td class="text-xs-left" style="width: 12%;">
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <router-link
                      :to="`/placenames/${props.item.type === 'placename' ? props.item.id: props.item.placenameId}`">
                      {{ cleanStr(props.item.type === 'placename' ? props.item.label : props.item.placenameLabel ) }}
                    </router-link>
                  </v-flex>
                </v-layout>
              </td>
              <td v-if="!!groupbyPlacename" class="text-xs-left" style="width: 25%;">
                <v-layout row wrap align-center>
                  <v-flex grow>
                    <ul class="two-columns">
                      <li v-for="(oldLabel, index) in props.item.oldLabels"
                          :key="index"
                          v-if="!!cleanStr(oldLabel)"
                          style="margin-right: 8px;"
                      >
                        {{cleanStr(oldLabel)}}
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>
              </td>
              <td class="text-xs-center" style="width: 50px;">{{ props.item.department }}</td>
              <td class="text-xs-left">{{ cleanStr(props.item.description) }}</td>
              <td style="width: 240px;">
                <v-layout align-center justify-end row fill-height>
                  <v-flex  sm3>
                    <linking-menu
                      :geoname-id="props.item.geoname_id"
                      :wikidata-item-id="props.item.wikidata_item_id"
                      :wikipedia-url="props.item.wikipedia_url"
                      :databnf-ark="props.item.databnf_ark"
                      :viaf-id="props.item.viaf_id"
                    >
                    </linking-menu>
                  </v-flex>
                  <v-flex sm3>
                    <export-menu
                      :placename-id="props.item.type === 'placename' ? props.item.id: props.item.placenameId">
                    </export-menu>
                  </v-flex>
                </v-layout>
              </td>
            </template>
            <template v-slot:pageText="props">
              Toponymes {{ props.pageStart }} - {{ props.pageStop }} sur {{ props.itemsLength }}
            </template>
          </v-data-table>
        <!-- FOOTER  -->
        <div v-show="!showTable" class="toggle-table-up" @click="showTable = !showTable">
          <slot></slot>
        </div>
        <div v-show="!!showTable"
               class="fixed-agg-footer elevation-3">
              <v-layout row justify-space-between text-xs-center>
                <v-flex  xs3 pa-1>
                </v-flex>
                
                <v-flex xs3 pa-1>
                </v-flex>
                
                <v-flex xs3 pa-1 mr-3 class="text-xs-right">
                  <span >
        
                    <span v-if="!!groupbyPlacename">
                      <span >
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
    </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import LinkingMenu from './ui/LinkingMenu'
  import ExportMenu from './ui/ExportMenu'
  import StatefulButton from './ui/StatefulButton'
  import FilterResult from './ui/FilterResult'
  import Vue from 'vue';
  import _ from 'lodash';

  export default {
    name: "PlacenameSearchTable",
    components: { StatefulButton, LinkingMenu, ExportMenu, FilterResult },
    props: {
      searchedTerm: {type: String, default: ''},
      selectItemCallback: {type: Function}
    },
    data () {
      return {
        totalItems: 0,
        loading: true,
        items: [],
        showTable: true,
        
        pagination: { rowsPerPage: 100},
        numAggPage: 0,
  
        filterStates: {
          department: false,
        },
        filterSelections: {
          department: [],
        },
        
        maxPageSize: process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE > 0 ? process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE : 200,
      }
    },
    watch: {
      pagination: {
        handler () {
          console.log("pagination:", this.pagination)
          this.fetchData()
        },
        deep: true
      },
      searchedTerm() {
        this.clearAll();
        this.numAggPage = 0;
        this.pagination.page = 1;
        this.fetchData()
      },
      computedSortParam() {
       this.pagination.page = 1;
       this.fetchData();
      },
      computedFilterParam() {
        this.pagination.page = 1;
        console.log(this.computedFilterParam);
        this.fetchData();
      },
      groupbyPlacename() {
        this.numAggPage = 0;
        this.pagination.page = 1;
        this.fetchData();
      }
    },

    methods: {
      capitalizeFirstLetter(str) {
        return str === null || str === undefined ? '' : str.charAt(0).toUpperCase() + str.slice(1)
      },
      cleanStr(str) {
        return str === null || str === undefined ? '' : this.capitalizeFirstLetter(str.replace(/<[^>]*>/g, '').trim())
      },
      goToPageAfter() {
        if (!!this.groupbyPlacename) {
          if (!!this.meta.after) {
            console.log("goto page after", this.afterKey);
            this.fetchData(this.afterKey);
            this.numAggPage += 1;
          }
        } else {
          this.pagination.page += 1;
          this.fetchData();
        }
      },
      goToPageBefore() {
        if (!!this.groupbyPlacename) {
          this.selectPreviousAggPage()
          console.log("goto page before", this.afterKey);
          this.fetchData(this.afterKey);
          this.numAggPage += -1;
        } else {
          this.pagination.page += -1;
          this.fetchData();
        }
      },
      getDataFromApi(after=null) {
        this.loading = true
  
        if (!!this.groupbyPlacename) {
          this.recordCurrentAggPage();
        }
  
        return new Promise((resolve, reject) => {
          if (this.searchedTerm.length < 3 ) {
            this.loading = false
            return
          }
          const { sortBy, descending, page, rowsPerPage } = this.pagination
          this.searchPlacename({
            query: this.searchedTerm,
            filterParam: this.computedFilterParam,
            groupbyPlacename: this.groupbyPlacename,
            sortParam: this.computedSortParam,
            pageNumber: page,
            pageSize: rowsPerPage,
            after: after
          }).then(r => {
            let items = Array.from(this.placenameItems.values())
            const total = this.meta.totalCount ? this.meta.totalCount : 0
            resolve({
              items,
              total
            })
            this.loading = false;
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
      selectItemWrapper(obj) {
        if (this.selectItemCallback) {
          const item = {
            id: obj.type === "placename" ? obj.id : obj.placenameId,
            coordinates: [parseFloat(obj.coordinates[1]), parseFloat(obj.coordinates[0])]
          }
          this.selectItemCallback(item)
        }
      },
  
      toggleSortField(headerIndex, value) {
        const header = this.headers[headerIndex];
        console.log(header, value)
        if (!!header.sortable) {
          if (value === null) {
            this.removeSortField(header.sortKey);
          } else {
            const p = this.getSortParam(header.sortKey);
            if (p !== undefined) {
              this.updateSortField({ field: header.sortKey, order: value ? '-' : '' });
            } else {
              this.addSortField({ field: header.sortKey, order: value ? '-' : '' });
            }
          }
        }
      },
      filterDepChanged (selected) {
        Vue.set(this.filterSelections, 'department', !!selected ? selected : [])
        this.setFilter({ filter: 'department', value: this.filterSelections.department });
      },
      ...mapActions('placenames', ['fetchPlacename', 'searchPlacename', 'clearAll', 'selectPreviousAggPage', 'recordCurrentAggPage']),
      ...mapActions('searchParameters', ['addSortField', 'updateSortField', 'removeSortField', 'setFilter'])
    },
    
    computed: {
      headers () {
        const localisation = {
          text: 'Localisation',
          align: 'center',
          value: 'icon',
          sortable: false,
          sortKey: 'is-localized',
          sorted: undefined,
        };
        const toponym = {
          text: 'Toponyme',
          align: 'left',
          value: 'label',
          sortable: true,
          sortKey: 'label.keyword',
          sorted: undefined,
        };
        const article = {
          text: 'Lieu',
          align: 'left',
          value: 'lieu',
          sortable: true,
          sortKey: 'placename-label.keyword',
          sorted: true,
        };
        const oldLabels = {
          text: 'Formes anciennes',
          value: 'old-labels',
          align: 'center',
          sortable: false,
          sortKey: 'label.keyword',
          sorted: undefined,
        };
        const dep = {
          text: 'Département',
          value: 'department',
          align: 'center',
          sortable: true,
          sortKey: 'dep-id.keyword',
          sorted: undefined,
          filter: this.uniqueDepartments,
          filtered: undefined,
          filterCallback: this.filterDepChanged,
        };
        const desc = {
          text: 'Description',
          value: 'description',
          align: 'left',
          sortable: false,
        };
        const linking = {
          text: '',
          value: 'linking',
          align: 'right',
          sortable: false
        };
        
        if (!!this.groupbyPlacename) {
          return [localisation, article, oldLabels, dep, desc, linking];
        } else {
          return [localisation, toponym, article, dep, desc, linking];
        }
      },
      
      afterKey() {
        return !!this.meta.after ? Object.values(this.meta.after).join(',') : null
      },
      ...mapState('placenames', { placenameItems: 'items', meta: 'meta', selectedPlacename: 'selectedItem', afterHistory: 'afterHistory' }),
      ...mapState('searchParameters', ['sortFields', 'groupbyPlacename', 'depFilter']),
      ...mapState('mapmarkers', ['uniqueDepartments']),
      ...mapGetters('searchParameters', ['computedSortParam', 'computedFilterParam', 'getSortParam'])
    }
  }
</script>

<style>
  
  .fixed-agg-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 56px;
    background-color: #f5f5f5;
    border-top: 1px solid lightgrey;
    color: grey;
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }
  
  .toggle-table-down {
    position: fixed;
    bottom: 60%;
    width: 100px;
    margin-bottom: 48px;
    left: calc(50% - 44px);
    /* z-index: 1000; */
  }

  .toggle-table-up {
    position: fixed;
    bottom: 0;
    width: 100px;
    margin: auto;
    /* z-index: 1000; */
    left: calc(50% - 44px);
  
  }
  
  /* Theme */
  .fixed-header {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    bottom: 56px !important;
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
    width: 100%;
  }

  .fixed-header tr.v-datatable__progress th {
    height: 1px;
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
