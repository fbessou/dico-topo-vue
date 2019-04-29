<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :total-items="totalItems"
      :loading="loading"
      class="elevation-1"
      rows-per-page-text="Nombre d'éléments par page"
      :rows-per-page-items="[5,
                             10,
                             25,
                             maxPageSize]"

    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ stripTags(props.item.label) }}</td>
        
        
        <td class="text-xs-center" v-if=" props.item.type === 'placename-old-label'">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">history</v-icon>
            </template>
            <span>Forme ancienne</span>
          </v-tooltip>
        </td>
        <td class="text-xs-left" v-else>
        </td>
        
        <td class="text-xs-left" v-if=" props.item.type === 'placename-old-label'">
          Forme ancienne de '{{ stripTags(props.item.placenameLabel) }}'. {{ stripTags(props.item.description) }}
        </td>
        <td class="text-xs-left" v-else>{{ stripTags(props.item.description) }}</td>
  
        <td class="text-xs-center">{{ props.item.department }}</td>
        <td class="text-xs-center">{{ props.item.region }}</td>
        <td class="text-xs-right">
          <linking-menu
            :geoname-id="props.item.geoname_id"
            :wikidata-item-id="props.item.wikidata_item_id"
            :wikipedia-url="props.item.wikipedia_url"
            :databnf-ark="props.item.databnf_ark"
            :viaf-id="props.item.viaf_id"
          >
          </linking-menu>
        </td>
      </template>
  
      <template v-slot:pageText="props">
        Toponymes {{ props.pageStart }} - {{ props.pageStop }} sur {{ props.itemsLength }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import LinkingMenu from './ui/LinkingMenu'
  
  export default {
    name: "PlacenameSearchTable",
    components: { LinkingMenu },
    props: {
      searchedTerm: {type: String, default: ''},
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
            sortable: false,
            value: 'label'
          },
          { text: 'Type', value: 'item_type', align: 'center',sortable: false },
          { text: 'Description', value: 'description', align: 'left',sortable: false },
          { text: 'Département', value: 'department', align: 'center',sortable: false },
          { text: 'Région', value: 'region', align: 'center',sortable: false },
          { text: 'Liens', value: 'linking', align: 'center',sortable: false },
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
      }
    },
    mounted () {
      //this.fetchData()
    },
    methods: {
      capitalizeFirstLetter(str) {
        return str === null || str === undefined ? '' : str.charAt(0).toUpperCase() + str.slice(1)
      },
      stripTags(str) {
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
            pageNumber: page,
            pageSize: rowsPerPage
          }).then(r => {
            let items = Array.from(this.placenameItems.values())
            const total = this.meta.totalCount ? this.meta.totalCount : 0
            
            if (this.pagination.sortBy) {
              items = items.sort((a, b) => {
                const sortA = a[sortBy]
                const sortB = b[sortBy]
      
                if (descending) {
                  if (sortA < sortB) return 1
                  if (sortA > sortB) return -1
                  return 0
                } else {
                  if (sortA < sortB) return -1
                  if (sortA > sortB) return 1
                  return 0
                }
              })
            }
  
            if (rowsPerPage > 0) {
              //items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            }
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
      
      ...mapActions('placenames', ['fetchPlacename', 'searchPlacename']),
  
    },
  
    computed: {
      ...mapState('placenames', {placenameItems: 'items', meta: 'meta'}),
    }
  }
</script>

<style scoped>

</style>
