<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase" >
        <span>DICTIONNAIRE</span>
        <span class="font-weight-light"> TOPONYMIQUE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-text-field prepend-inner-icon="search" type="text" placeholder="Ex. Laon" v-model="inputTerm"></v-text-field>
      <search-options-menu :on-open="unselectPlacename" :on-options-change="onSearchOptionsChange" :initial-data="searchOptions"></search-options-menu>
      
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
        <my-awesome-map
          :on-marker-click="selectPlacename"
          :on-map-click="unselectPlacename"
        >
        </my-awesome-map>
        <placename-card v-if="selectedPlacename"></placename-card>
      </div>
      <v-container fluid>
        <placename-search-table
          :searched-term="computedTerm"
          :select-item-callback="selectPlacenameOnMap">
        </placename-search-table>
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
  import Vue from 'vue'
  
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
        inputTerm: '*gnac',
        searchOptions: {
          includeOldLabels: true
        },
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
      onSearchOptionsChange(options){
        this.searchOptions = options
      },
      selectPlacenameOnMap(obj) {
        if (!!obj) {
          this.selectPlacename(obj)
          
        } else {
          this.unselectPlacename()
        }
      },
      ...mapActions('mapmarkers', ['searchMapMarker']),
      ...mapActions('placenames', ['selectPlacename', 'unselectPlacename'])
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
        let term = this.inputTerm
        if (!!this.searchOptions['includeOldLabels']) {
          term = `label:${term} OR old-labels:${term}`
        } else {
          term = `label:${term}`
        }
        return term
      },
      selectedCoordinates() {
        return !!this.selectedPlacename ? this.selectedPlacename.coordinates : null
      },
      ...mapState('placenames', { selectedPlacename: 'selectedItem' })
    }
  }
</script>

<style>
  body {
    background-color: #fafafa !important;
  }
</style>
