<template>
  <v-app>
    <main-toolbar>
      <v-text-field
        prepend-inner-icon="search"
        type="text"
        placeholder="Ex. Laon"
        v-model="inputTerm">
        :autofocus="true"
      </v-text-field>
      <search-options-menu
        :on-open="unselectPlacename"
        :on-options-change="onSearchOptionsChange"
        :initial-data="searchOptions">
      </search-options-menu>
    </main-toolbar>
    
    <v-content>
      <div style="height:100%">
        <my-awesome-map
          :on-marker-click="selectPlacename"
          :on-map-click="unselectPlacename"
        >
        </my-awesome-map>
        <placename-search-table
          :searched-term="computedTerm"
          :select-item-callback="selectPlacenameOnMap">
        </placename-search-table>
      </div>
      <placename-card v-if="selectedPlacename"></placename-card>
    </v-content>
    
  </v-app>
</template>

<script>
  
  import PlacenameSearchTable from '../PlacenameSearchTable'
  import MyAwesomeMap from '../MyAwesomeMap'
  import PlacenameCard from '../PlacenameCard'
  import SearchOptionsMenu from '../ui/SearchOptionsMenu'
  import { mapState, mapActions } from 'vuex'
  import MainToolbar from '../ui/MainToolbar'
  
  export default {
    name: 'HomePage',
    components: {
      MainToolbar,
      
      SearchOptionsMenu,
      PlacenameSearchTable,
      PlacenameCard,
      MyAwesomeMap
    },
    data () {
      return {
        inputTerm: '',
        searchOptions: {
          includeOldLabels: true
        },
        selectedPlacenameId: undefined
      }
    },
    mounted () {
      this.unselectPlacename()
      //this.searchMapMarkers(this.computedTerm, 750, 1)
    },
    methods: {
      searchMapMarkers (term, pageSize, pageNumber) {
        return this.searchMapMarker({
          query: term,
          pageNumber: pageNumber,
          pageSize: pageSize
        })
      },
      onSearchOptionsChange (options) {
        this.searchOptions = options
      },
      selectPlacenameOnMap (obj) {
        if (!!obj) {
          this.selectPlacename(obj)
        } else {
          this.unselectPlacename()
        }
      },
      ...mapActions('mapmarkers', ['searchMapMarker']),
      ...mapActions('placenames', ['selectPlacename', 'unselectPlacename']),
      ...mapActions('placenameCard', ['clearPlacenameCard'])
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
      computedTerm () {
        let term = this.inputTerm
        if (!!this.searchOptions['includeOldLabels']) {
          term = `label:${term} OR old-labels:${term}`
        } else {
          term = `label:${term}`
        }
        return term
      },
      selectedCoordinates () {
        return !!this.selectedPlacename ? this.selectedPlacename.coordinates : null
      },
      ...mapState('placenames', { selectedPlacename: 'selectedItem', meta: 'meta' })
    }
  }
</script>

<style>

  body:after {
    z-index: 100000;
    content: 'beta';
    position: fixed;
    width: 100px;
    height: 28px;
    background: #EE8E4A;
    top: 7px;
    left: -28px;
    text-align: center;
    font-size: 13px;
    font-family: sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    line-height: 30px;
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
