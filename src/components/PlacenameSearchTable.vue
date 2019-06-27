<template>
    <v-layout row wrap>
      <v-flex xs12>
      
      </v-flex>
      <v-flex xs12>
          <v-data-table
            class="elevation-1 fixed-header v-table__overflow"
            style="position: fixed; bottom: 0;  max-height: 60%;"
            v-show="showTable"
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            :total-items="totalItems"
            :loading="loading"
            rows-per-page-text="Nombre d'éléments par page"
            :rows-per-page-items="[100,200,maxPageSize]"
            :hide-actions="!!groupbyPlacename"
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
        
          <div v-if="!!groupbyPlacename"
               class="fixed-agg-footer">
              <v-layout row>
                <v-flex grow pa-1>
                  <slot></slot>
                </v-flex>
                <v-flex v-show="!!showTable" shrink pa-1 mr-3>
                  <span class="align-right justify-end">
                    <v-btn icon @click="goToPageBefore" :disabled="loading || afterHistory.length === 0">
                      <v-icon>keyboard_arrow_left</v-icon>
                    </v-btn>
                    <v-btn icon @click="goToPageAfter" :disabled="loading || !meta.after">
                      <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </span>
                </v-flex>
              </v-layout>
          </div>
        
      </v-flex>
    </v-layout>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import LinkingMenu from './ui/LinkingMenu'
  import ExportMenu from './ui/ExportMenu'
  import StatefulButton from './ui/StatefulButton'
  
  export default {
    name: "PlacenameSearchTable",
    components: { StatefulButton, LinkingMenu, ExportMenu },
    props: {
      searchedTerm: {type: String, default: ''},
      selectItemCallback: {type: Function},
      showTable: {type: Boolean}
    },
    data () {
      return {
        totalItems: 0,
        loading: true,
        items: [],
        pagination: { rowsPerPage: 100},
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
        this.fetchData()
      },
      computedSortParam() {
        this.fetchData();
      },
      groupbyPlacename() {
        this.fetchData();
      }
    },
    mounted () {
    },
    methods: {
      capitalizeFirstLetter(str) {
        return str === null || str === undefined ? '' : str.charAt(0).toUpperCase() + str.slice(1)
      },
      cleanStr(str) {
        return str === null || str === undefined ? '' : this.capitalizeFirstLetter(str.replace(/<[^>]*>/g, '').trim())
      },
      goToPageAfter() {
        if (!!this.meta.after) {
          console.log("goto page after", this.afterKey);
          this.fetchData(this.afterKey);
        }
      },
      goToPageBefore() {
        this.selectPreviousAggPage()
        console.log("goto page before", this.afterKey);
        this.fetchData(this.afterKey);
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
      
      fetchData(after) {
        this.getDataFromApi(after)
          .then(data => {
            this.items = data.items
            this.totalItems = data.total
          })
      },
      
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
      
      ...mapActions('placenames', ['fetchPlacename', 'searchPlacename', 'clearAll', 'selectPreviousAggPage', 'recordCurrentAggPage']),
      ...mapActions('searchParameters', ['addSortField', 'updateSortField', 'removeSortField'])
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
          text: 'Lieux',
          align: 'left',
          value: 'lieux',
          sortable: true,
          sortKey: 'placename-label.keyword',
          sorted: true,
        };
        const oldLabels = {
          text: 'Forme(s) ancienne(s)',
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
      ...
        mapState('placenames', { placenameItems: 'items', meta: 'meta', selectedPlacename: 'selectedItem', afterHistory: 'afterHistory' }),
      ...
        mapState('searchParameters', ['sortFields', 'groupbyPlacename']),
      ...
        mapGetters('searchParameters', ['computedSortParam', 'getSortParam'])
    }
  }
</script>

<style>
  
  .fixed-agg-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 56px;
    background-color: #fafafa;
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
    background-color: #fafafa;
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
