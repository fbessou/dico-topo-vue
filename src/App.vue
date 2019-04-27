<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase" >
        <span>DICTIONNAIRE</span>
        <span class="font-weight-light"> TOPONYMIQUE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-text-field prepend-inner-icon="search" type="text" placeholder="Ex. Laon" v-model="searchedTerm"></v-text-field>
      <search-options-menu :on-options-change="onSearchOptionsChange"></search-options-menu>
      
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Documentation</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-content>
      <div style="height: 520px">
        <my-awesome-map :on-marker-click="selectPlacename" :on-map-click="unselectPlacename"></my-awesome-map>
        <placename-card v-if="selectedPlacenameId" :placename-id="selectedPlacenameId"></placename-card>
      </div>
      <v-container fluid>
        <placename-search-table :searched-term="computedTerm"></placename-search-table>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  
  import PlacenameSearchTable from './components/PlacenameSearchTable'
  import MyAwesomeMap from './components/MyAwesomeMap'
  import PlacenameCard from './components/PlacenameCard'
  import SearchOptionsMenu from './components/ui/SearchOptionsMenu'

  export default {
    name: 'App',
    components: {
      SearchOptionsMenu,
      PlacenameSearchTable,
      PlacenameCard,
      MyAwesomeMap
    },
    data () {
      return {
        searchedTerm: '*gnac',
        searchOptions: {},
        selectedPlacenameId: undefined
      }
    },
    mounted() {
      this.searchMapMarkers(this.computedTerm, 750, 1)
    },
    methods: {
      searchMapMarkers (term, pageSize, pageNumber) {
          return this.searchMapMarker({
            query: term,
            pageNumber: pageNumber,
            pageSize: pageSize
          }).then(r => {
          
          })
      },
      selectPlacename(placenameId) {
        console.log("selecting placename", placenameId)
        this.selectedPlacenameId = placenameId
      },
      unselectPlacename () {
        this.selectedPlacenameId = undefined
      },
      onSearchOptionsChange(options){
        console.log(options)
        this.searchOptions = options
      },
      ...mapActions('mapmarkers', ['searchMapMarker'])
    },
    watch: {
      inputTerm (val) {
        if (val.length >= 3) {
          this.unselectPlacename()
          this.searchMapMarkers(this.computedTerm, 750, 1)
        }
      },
    },
    computed: {
      computedTerm() {
        let term = this.searchedTerm
        if (!!this.searchOptions['includeOldLabels']) {
          term = `label:${term} OR old-labels:${term}`
        } else {
          term = `label:${term}`
        }
        console.log(this.searchOptions, term)
        return term
      }
    }
  }
</script>

<style>
  body {
    background-color: #fafafa !important;
  }
</style>
