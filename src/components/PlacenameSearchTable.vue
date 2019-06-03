<template>
  <div class="search-table">
    <v-layout>
          <v-flex>
            <v-data-table
              
              :headers="headers"
              :items="items"
              :pagination.sync="pagination"
              :total-items="totalItems"
              :loading="loading"
              rows-per-page-text="Nombre d'éléments par page"
              :rows-per-page-items="[5,25,50,maxPageSize]"
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
      
                <td class="text-xs-left">
                  <v-layout row wrap align-center>
                    <v-flex grow>
                      <span>{{ cleanStr(props.item.label) }}</span>
                    </v-flex>
                    <v-flex shrink>
                      <v-btn flat fab small class="elevation-0 blue--text"
                             @click="() => selectItemWrapper(props.item)"
                             :disabled="!props.item.coordinates">
                        <v-icon>location_on</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </td>
      
                <td class="text-xs-center" v-if=" props.item.type === 'placename-old-label'">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">history</v-icon>
                    </template>
                    <span>Forme ancienne</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left" v-else></td>
                <td class="text-xs-left" v-if=" props.item.type === 'placename-old-label'">
                  Forme ancienne de '{{ cleanStr(props.item.placenameLabel) }}'. {{ cleanStr(props.item.description) }}
                </td>
                <td class="text-xs-left" v-else>{{ cleanStr(props.item.description) }}</td>
                <td class="text-xs-center">{{ props.item.department }}</td>
                <td class="text-xs-center">{{ props.item.region }}</td>
                <td>
                  <v-layout align-center justify-end row fill-height>
                    <v-flex shrink sm2>
                      <linking-menu
                        :geoname-id="props.item.geoname_id"
                        :wikidata-item-id="props.item.wikidata_item_id"
                        :wikipedia-url="props.item.wikipedia_url"
                        :databnf-ark="props.item.databnf_ark"
                        :viaf-id="props.item.viaf_id"
                      >
                      </linking-menu>
                    </v-flex>
                    <v-flex shrink sm2>
                      <v-btn
                        :to="`/placenames/${props.item.type === 'placename' ? props.item.id: props.item.placenameId}`"
                        flat icon fab small>
                        <v-icon>open_in_new</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex shrink sm2>
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
          </v-flex>
    </v-layout>
  </div>
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
      selectItemCallback: {type: Function}
    },
    data () {
      return {
        totalItems: 0,
        loading: true,
        items: [],
        pagination: { rowsPerPage: 5},
        maxPageSize: process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE > 0 ? process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE : 200,
        
        headers: [
          {
            text: 'Toponyme',
            align: 'left',
            value: 'label',
            sortable: true,
            sortKey: 'label.keyword',
            sorted: undefined,
          },
          { text: 'Type',
            value: 'item_type',
            align: 'center',
            sortable: true ,
            sortKey: 'type.keyword',
            sorted: undefined,
          },
          { text: 'Description',
            value: 'description',
            align: 'left',
            sortable: false,
          },
          { text: 'Département',
            value: 'department',
            align: 'center',
            sortable: true,
            sortKey: 'dep-id.keyword',
            sorted: undefined,
          },
          { text: 'Région',
            value: 'region',
            align: 'center',
            sortable: false,
            sortable: true,
            sortKey: 'reg-label.keyword',
          },
          { text: '',
            value: 'linking',
            align: 'right',
            sortable: false
          },
        ]
      }
    },
    watch: {
      pagination: {
        handler () {
          this.fetchData()
        },
        deep: true
      },
      searchedTerm() {
        this.fetchData()
      },
      computedSortParam() {
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
      
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          if (this.searchedTerm.length < 3 ) {
            this.loading = false
            return
          }
          const { sortBy, descending, page, rowsPerPage } = this.pagination
          this.searchPlacename({
            query: this.searchedTerm,
            sortParam: this.computedSortParam,
            pageNumber: page,
            pageSize: rowsPerPage
          }).then(r => {
            let items = Array.from(this.placenameItems.values())
            const total = this.meta.totalCount ? this.meta.totalCount : 0
            resolve({
              items,
              total
            })
            this.loading = false
          })
          
        })
      },
      
      fetchData() {
        this.getDataFromApi()
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
      
      ...mapActions('placenames', ['fetchPlacename', 'searchPlacename']),
      ...mapActions('searchParameters', ['addSortField', 'updateSortField', 'removeSortField'])
    },
    
    computed: {
      ...mapState('placenames', {placenameItems: 'items', meta: 'meta', selectedPlacename: 'selectedItem'}),
      ...mapState('searchParameters', ['sortFields']),
      ...mapGetters('searchParameters', ['computedSortParam', 'getSortParam'])
    }
  }
</script>

<style>
  .search-table{
    position: fixed;
    bottom: 0;
    width: 100%;

    max-height: 80%;
    overflow: auto
  }
  .v-table__overflow {
    overflow-x: hidden;
  }
  .table-header {
    text-align: left;
  }

</style>
