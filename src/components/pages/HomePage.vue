<template>
  <v-app>
    <main-toolbar>
      
      <v-text-field
        prepend-inner-icon="search"
        type="text"
        placeholder="Ex. Laon"
        v-model="inputTerm"
        :autofocus="true"
        :loading="mapMarkersAreLoading"
        clearable
        @keyup.native="startNewSearch()"
      >

      </v-text-field>
      
      <v-btn
        v-if="inputTerm && inputTerm.length >= minTermLength"
        color="primary"
        outline
        dark
        style="margin-left: 20px; margin-right: 12px"
        small
        depressed
        @click="showTabularResults = !showTabularResults && meta.totalCount > 0"
      >
        <v-icon>list</v-icon>
        {{meta.totalCount}} résultat(s) {{ /*  markers:  Array.from(mapMarkerItems.values()).length */ }}
      </v-btn>
  
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
          :use-fly-animation="false"
        >
        </my-awesome-map>
        <placename-search-table
          v-show="inputTerm && inputTerm.length >= minTermLength && showTabularResults"
          :searched-term="computedTerm"
          :select-item-callback="selectPlacenameOnMap">
        </placename-search-table>
      </div>
      <placename-card v-if="selectedPlacename"></placename-card>
    </v-content>
    
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  
  import PlacenameSearchTable from '../PlacenameSearchTable'
  import MyAwesomeMap from '../MyAwesomeMap'
  import PlacenameCard from '../PlacenameCard'
  import SearchOptionsMenu from '../ui/SearchOptionsMenu'
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
        cT: undefined,
        oT: undefined,
        
        minTermLength: 2,
        maxMarkerPerBatch: 700,
        
        inputTerm: undefined,
        searchOptions: {
          includeOldLabels: true
        },
        selectedPlacenameId: undefined,
        showTabularResults: false
      }
    },
    mounted () {
      this.inputTerm = undefined
      this.unselectPlacename()
      //this.searchMapMarkers(this.computedTerm, 750, 1)
    },
    methods: {
      delay(callback, ms) {
        var timer = 0;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            callback.apply(context, args);
          }, ms || 0);
        };
      },
      startNewSearch() {
        const init = this.initSearch;
        return this.delay(function (e) { init() }, 1500)()
      },
      initSearch() {
        if (this.computedTerm !== this.oT) {
          this.unselectPlacename()
          this.clearMapMarkers()
          if (this.inputTerm && this.inputTerm.length >= this.minTermLength) {
            console.log("search", this.computedTerm)
            this.searchNextBatchOfMapMarkers()
          }
          this.oT = this.computedTerm
        }
      },
      searchNextBatchOfMapMarkers(nextLink) {
        this.setMarkersLoading(true)
        return this.searchMapMarker({
          query: this.computedTerm,
          nextLink: nextLink,
          pageSize: this.maxMarkerPerBatch
        }).then(next => {
          if (!!next) {
            this.searchNextBatchOfMapMarkers(next)
          }
        }).catch(r => {
          console.warn(r)
        }).finally(r => {
          this.setMarkersLoading(false)
        })
      },
      onSearchOptionsChange (options) {
        this.searchOptions = options
        this.oT = undefined
        this.initSearch()
      },
      selectPlacenameOnMap (obj) {
        if (!!obj) {
          this.selectPlacename(obj)
        } else {
          this.unselectPlacename()
        }
      },
      ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers', 'setMarkersLoading']),
      ...mapActions('placenames', ['selectPlacename', 'unselectPlacename']),
      ...mapActions('placenameCard', ['clearPlacenameCard'])
    },
    watch: {
      meta(val) {
        if (!this.meta.totalCount) { // when 0
          this.unselectPlacename()
          this.clearMapMarkers()
        }
      },
      inputTerm (val) {
        this.oT = undefined
      },
      computedTerm() {
        if (!this.computedTerm) {
          this.unselectPlacename()
          this.clearMapMarkers()
        }
      }
    },
    computed: {
      computedTerm() {
        let term = this.inputTerm
        
        if (!term || term.length < this.minTermLength) {
          return undefined
        }
        
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
      ...mapState('placenames', { selectedPlacename: 'selectedItem', meta: 'meta' }),
      ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items'})
  
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
