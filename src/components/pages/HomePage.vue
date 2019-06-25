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
        :on-options-change="onSearchOptionsChange">
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
          v-show="term && term.length >= minTermLength && meta.totalCount > 0"
          :searched-term="query"
          :select-item-callback="selectPlacenameOnMap">
        </placename-search-table>
      </div>
      <placename-card v-if="selectedPlacename"></placename-card>
    </v-content>
    
  </v-app>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import _ from 'lodash';

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
        maxMarkerPerBatch: 3500,
        
        inputTerm: undefined,
        selectedPlacenameId: undefined,
        showTabularResults: false
      }
    },
    mounted () {
      this.inputTerm = undefined
      this.unselectPlacename()
    },
    methods: {
      startNewSearch: _.debounce(function (newVal, oldVal) {
        this.setTerm(this.inputTerm);
        this.initSearch();
      }, 500),
      initSearch() {
        if (!!this.query) {
          this.unselectPlacename()
          this.clearMapMarkers()
          if (this.inputTerm && this.inputTerm.length >= this.minTermLength) {
            this.searchNextBatchOfMapMarkers()
          }
        }
      },
      searchNextBatchOfMapMarkers(nextLink) {
        this.setMarkersLoading(true)
        return this.searchMapMarker({
          query: this.query,
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
        this.setIncludeOldLabels(options['includeOldLabels'])
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
      ...mapActions('placenameCard', ['clearPlacenameCard']),
      ...mapActions('searchParameters', ['setTerm', 'setIncludeOldLabels'])
    },
    watch: {
      meta(val) {
        if (!this.meta.totalCount) { // when 0
          this.unselectPlacename()
          this.clearMapMarkers()
        }
      },
      inputTerm (val) {
        this.startNewSearch();
      },
      query() {
        if (!this.query) {
          this.unselectPlacename()
          this.clearMapMarkers()
        }
      }
    },
    computed: {
      selectedCoordinates () {
        return !!this.selectedPlacename ? this.selectedPlacename.coordinates : null
      },
      ...mapState('placenames', { selectedPlacename: 'selectedItem', meta: 'meta' }),
      ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items'}),
      ...mapState('searchParameters', ['term', 'includeOldLabels', 'minTermLength']),
      ...mapGetters('searchParameters', ['query'])
  
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
