<template>
  <v-toolbar app>
    
    <v-toolbar-title class="headline text-uppercase" @click="$router.push({name: 'landing'})"
                     style="cursor: pointer; ">
  
      <img src="@/assets/logo-dicotopo-cut.png" height="55px" style="padding-top: 8px; padding-left: 40px"/>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
  
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
      @keyup.enter.native="onSearchEventPressEnter"
    >
    </v-text-field>
  
    <v-chip v-show="!!inputTerm && inputTerm.length > 3" class="subheading grey--text text--darken-2 ml-3 mr-2">
      {{ meta.totalCount }}
    </v-chip>
  
    <span class="toolbar-buttons">
        
        <span v-if="showGroupBy">
          <v-layout row>
            <v-flex>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">Lieux</span>
                </template>
                <span>Les résultats de la recherche sont groupés par lieu identifié</span>
              </v-tooltip>
            </v-flex>
            <v-flex>
               <v-switch
                 class="ml-2"
                 style="color: #d32f2f !important"
                 v-model="groupByOption"
                 color="lightgrey"
                 :disabled="mapMarkersAreLoading">
               </v-switch>
            </v-flex>
            <v-flex>
               <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">Toponymes</span>
                </template>
                <span>Les résultats de la recherche ne sont pas groupés par lieu identifié mais par forme toponymique</span>
                </v-tooltip>
            </v-flex>
          </v-layout>
        </span>
      
        <span v-if="showTimeRange && !!knownYears && knownYears.length >= 2" style="width:200px">
          <v-layout row>
            <v-flex pr-2 pt-2 style="min-width:40px;">
               {{selectedTimeRange[0]}}
            </v-flex>
            <v-flex>
              <div>
            <time-filter
              :chart-data="timeFilterData"
              :styles="{height: '32px', position: 'relative'}"></time-filter>
          </div>
          <div>
            <v-range-slider
              :min="knownYears[0].year"
              :max="knownYears[knownYears.length - 1].year"
              v-model="selectedTimeRange"
         
              color="#d32f2f"
              height="22px"
            ></v-range-slider>
          </div>
            </v-flex>
            <v-flex pl-2 pt-2 style="min-width:40px;">
               {{selectedTimeRange[1]}}
            </v-flex>
          </v-layout>
          
        </span>

      </span>
    
    <v-spacer></v-spacer>
    
    <v-btn flat to="/documentation" target="_blank">
      <span class="mr-2">API</span>
      <v-icon>code</v-icon>
    </v-btn>
  </v-toolbar>

</template>

<script>
  
  import _ from 'lodash';
  import { mapState, mapGetters, mapActions } from 'vuex'
  import TimeFilter from './TimeFilter.vue'

  export default {
    name: 'MainToolbar',
    props: {
      showGroupBy: {type: Boolean, default: false},
      showTimeRange: { type: Boolean, default: false }
    },
    components: {
      TimeFilter
    },
    data () {
      return {
        maxMarkerPerBatch: 5000,
        inputTerm: undefined,
        groupByOption: undefined,
        selectedTimeRange: [],
      }
    },
    mounted() {
      this.groupByOption = !this.groupbyPlacename;
      this.unselectPlacename()
      this.inputTerm = this.term
    },
    methods: {
      startNewSearch: _.debounce(function (reloadMap = true) {
        this.setTerm(this.inputTerm);
        if (this.$router.currentRoute.name !== 'home') {
          this.$router.push({name: 'home'});
        }
        this.initSearch(reloadMap);
      }, 500),
      initSearch (reloadMap) {
        if (!!this.query) {
          this.unselectPlacename()
          if (!!reloadMap) {
            this.clearMapMarkers()
            if (this.inputTerm && this.inputTerm.length >= this.minTermLength) {
              this.searchNextBatchOfMapMarkers()
            }
          }
        }
      },
      searchNextBatchOfMapMarkers (nextLink) {
        this.setMarkersLoading(true)
        return this.searchMapMarker({
          query: this.query,
          filterParam: this.computedFilterParam,
          rangeParam: this.computedRangeParam,
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
      onSearchEventPressEnter() {
          this.startNewSearch();
      },
      ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers', 'setMarkersLoading']),
      ...mapActions('placenames', ['selectPlacename', 'unselectPlacename']),
      ...mapActions('placenameCard', ['clearPlacenameCard']),
      ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlacename', 'setRange', 'removeRange'])
    },
    watch: {
      inputTerm (oldVal, newVal) {
        if (!!newVal) {
          this.startNewSearch();
        }
      },
      groupByOption () {
        if (!!this.$props.showGroupBy) {
          this.setGroupbyPlacename(!this.groupByOption)
        }
      },
      computedFilterParam () {
        this.startNewSearch();
      },
      selectedTimeRange() {
        if (this.$props.showTimeRange && this.selectedTimeRange.length === 2) {
          const newRange = {
            key: "text-date",
            operators: [`gte:${this.selectedTimeRange[0]}`, `lte:${this.selectedTimeRange[1]}`]
          };
          this.setRange(newRange)
        }
      },
      knownYears() {
        if (this.selectedTimeRange.length === 0 && this.knownYears.length >= 2) {
          console.log("KY", this.knownYears);
          const lowerBound = this.knownYears[0].year;
          const upperBound = this.knownYears[this.knownYears.length - 1].year;
          this.selectedTimeRange = [lowerBound, upperBound];
        }
      },
      range(oldVal, newVal) {
        if (this.$props.showTimeRange) {
          if (oldVal !== newVal && !!this.inputTerm && this.inputTerm.length > 2) {
            this.startNewSearch();
          }
        }
      },
     },
    computed: {
      ...mapState('placenames', { selectedPlacename: 'selectedItem', meta: 'meta', knownYears: 'knownYears' }),
      ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items' }),
      ...mapState('searchParameters', ['term', 'groupbyPlacename', 'minTermLength', 'range']),
      ...mapGetters('searchParameters', ['query', 'computedFilterParam', 'computedRangeParam']),
      timeFilterData() {
        const lowerBound = this.knownYears[0].year;
        const upperBound = this.knownYears[this.knownYears.length - 1].year;
        
        return {
          labels: this.knownYears.map(y => ''),
          datasets: [
            {
              backgroundColor: '#d32f2f',
              data: this.knownYears.map(y => y.count),
              _meta: {
                start: lowerBound,
                end: upperBound,
                selectionStart: this.selectedTimeRange[0],
                selectionEnd: this.selectedTimeRange[1]
              }
            }
          ]
        }
      }
    }
  }
</script>

<style >
  html {
    background: lightgrey;
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

  .toolbar-buttons > span {
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
  .toolbar-buttons .v-slider__thumb {
    height: 20px;
    width: 20px;
  }

</style>
