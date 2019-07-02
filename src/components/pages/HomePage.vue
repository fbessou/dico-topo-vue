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
        style="width: 0"
        color="rgb(211, 47, 47)"
      >
      </v-text-field>
  
      <v-chip v-show="!!inputTerm && inputTerm.length > 2" class="subheading grey--text text--darken-2 ml-3 mr-2">
        {{ meta.totalCount }}
      </v-chip>
  
      <span  class="toolbar-buttons">
        
          <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">Lieux</span>
          </template>
          <span>Les résultats de la recherche sont groupés par lieu identifié</span>
         </v-tooltip>
        
          <v-switch
            class="ml-2"
            style="color: #d32f2f !important"
            v-model="groupByOption"
            color="lightgrey"
            :disabled="mapMarkersAreLoading">
          </v-switch>
        
         <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">Toponymes</span>
          </template>
          <span>Les résultats de la recherche ne sont pas groupés par lieu identifié mais par forme toponymique</span>
         </v-tooltip>

      </span>

    </main-toolbar>
    
    <v-content>
      <div style="height:100%">
        <my-awesome-map
          :on-marker-click="selectPlacename"
          :on-map-click="onMapClickCallback"
          :use-fly-animation="false"
        >
        </my-awesome-map>
  
 
        <placename-search-table
          v-show="!!term && term.length >= minTermLength && !!showTabularResults"
          :searched-term="query"
          :select-item-callback="selectPlacenameOnMap"
        >
          <v-btn
            depressed small
            @click="showTabularResults = false"
            class="red--text white darken-2"
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </placename-search-table>
  
        <div class="toggle-table-up">
          <v-btn
            v-if="!!term && term.length >= minTermLength && !showTabularResults"
            depressed small
            @click="showTabularResults = true"
            class="red--text white darken-2"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
        </div>
        
      </div>
      <placename-card v-if="selectedPlacename"></placename-card>
    </v-content>
    
  </v-app>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import _ from 'lodash';
  import Vue from 'vue';
  
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
        showTabularResults: true,
  
        groupByOption: 0
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
          filterParam: this.computedFilterParam,
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
      selectPlacenameOnMap (obj) {
        if (!!obj) {
          this.selectPlacename(obj)
          Vue.set(this, "showTabularResults", false)
          this.showTabularResults = false;
        } else {
          this.unselectPlacename()
        }
      },
      onMapClickCallback() {
        this.unselectPlacename();
        Vue.set(this, "showTabularResults", false)
        this.showTabularResults = false;
      },
      ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers', 'setMarkersLoading']),
      ...mapActions('placenames', ['selectPlacename', 'unselectPlacename']),
      ...mapActions('placenameCard', ['clearPlacenameCard']),
      ...mapActions('searchParameters', ['setTerm', 'setIncludeOldLabels', 'setGroupbyPlacename'])
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
      groupByOption() {
        //this.setIncludeOldLabels(options['includeOldLabels'])
        this.setGroupbyPlacename(!this.groupByOption)
        this.initSearch()
      },
      computedFilterParam() {
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
      ...mapState('searchParameters', ['term', 'includeOldLabels', 'groupbyPlacename', 'minTermLength']),
      ...mapGetters('searchParameters', ['query', 'computedFilterParam'])
    }
  }
</script>

<style>
  .toolbar-buttons {
    display: flex;
    line-height: 32px;
    margin-top: 20px;
    margin-left: 32px;
    color: grey;
    font-family: Roboto, sans-serif;
  }

  .toolbar-buttons span {
    display: inline-block;
    vertical-align: middle;
  }


  .toggle-table-up {
    position: fixed;
    bottom: 0;
    width: 100px;
    margin: auto;
    /* z-index: 1000; */
    left: calc(50% - 44px);
  
  }
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
