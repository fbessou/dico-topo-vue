<template>
  <v-app>
    <main-toolbar :show-time-range="false" :show-filters="true" :search="searchCallback">

    </main-toolbar>

    <v-content style="height:100%">
        <div class="map-container">
          <my-awesome-map
            :mapmarker-items="mapMarkerItems"
            :on-marker-click="selectPlace"
            :on-map-click="onMapClickCallback"
            :initial-zoom="zoom"
            :initial-center="center"
            :save-position="true"
            :use-fly-animation="false"
          >
          </my-awesome-map>
        </div>

        <place-search-table
          v-show="!!showTabularResults && meta.totalCount"
          :select-item-callback="selectPlaceOnMap"
          :search="fetchTableResults"
        >
          <v-btn
            depressed small
            @click="showTabularResults = false"
            class="toggle-table grey lighten-3 text-center"
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </place-search-table>

          <v-btn
            v-if="!showTabularResults"
            depressed small
            @click="showTabularResults = true"
            class="toggle-table toggle-table-up elevation-5 grey lighten-3 text-center"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>

        <place-card v-if="selectedPlace"
          :place-id="selectedPlace.id"
          :key="selectedPlace.id"
          :popup="true">
        </place-card>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'

import PlaceSearchTable from '../PlaceSearchTable'
import MainToolbar from '../ui/MainToolbar'
import _ from 'lodash'

export default {
  name: 'HomePage',
  components: {
    MainToolbar,
    PlaceSearchTable,
    'MyAwesomeMap': () => import(/* webpackChunkName: "map-component" */ '../MyAwesomeMap'),
    'PlaceCard': () => import(/* webpackChunkName: "card-component" */ '../PlaceCard')
  },
  data () {
    return {
      showTabularResults: true
    }
  },
  mounted () {
    this.unselectPlace()
    this.inputTerm = this.term
  },
  methods: {
    ...mapActions('places', ['fetchPlace', 'searchPlace', 'clearAll', 'selectPreviousAggPage', 'recordCurrentAggPage']),

    selectPlaceOnMap (obj) {
      if (obj) {
        this.selectPlace(obj)
        // Vue.set(this, 'showTabularResults', false)
        // this.showTabularResults = false
      } else {
        this.unselectPlace()
      }
    },
    onMapClickCallback () {
      // this.unselectPlace()
      // Vue.set(this, 'showTabularResults', false)
      // this.showTabularResults = false
    },
    searchCallback: _.debounce(function (reloadMap = true) {
      console.log('fullsearch')
      // start the search from here
      this.fetchMapResults()
      this.fetchTableResults()
    }, 250),
    async fetchMapResults () {
      // send a fake query just to get the total count
      const meta = await this.searchMapMarker({
        query: this.query,
        filterParam: this.computedFilterParam,
        rangeParam: this.computedRangeParam,
        pageSize: 1
      })
      // currently does not handle larger result sets
      const max = 10000
      if (meta['total-count'] > max) {
        console.error('result is too large: ', meta['total-count'])
        return
      }
      this.clearMapMarkers()
      const nbPages = meta['total-count'] >= max / 2 ? 2 : 1
      const pPromises = [...Array(nbPages).keys()].map(k => {
        return this.searchMapMarker({
          query: this.query,
          filterParam: this.computedFilterParam,
          rangeParam: this.computedRangeParam,
          pageSize: Math.ceil(max / nbPages),
          pageNumber: k + 1
        })
      })
      await Promise.all(pPromises)
    },
    fetchTableResults: _.debounce(function (after = null) {
      if (this.groupbyPlace) {
        this.recordCurrentAggPage()
      }
      this.searchPlace({
        query: this.query,
        rangeParam: this.computedRangeParam,
        filterParam: this.computedFilterParam,
        groupbyPlace: this.groupbyPlace,
        sortParam: this.computedSortParam,
        pageNumber: this.storedPagination.page,
        pageSize: this.storedPagination.rowsPerPage,
        after: after
      })
    }, 500),
    ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers', 'setMarkersLoading']),
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['clearPlaceCard']),
    ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlace'])
  },
  computed: {
    ...mapState('places', { selectedPlace: 'selectedItem', meta: 'meta' }),
    ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items' }),
    ...mapState('searchParameters', ['term', 'range', 'includeOldLabels', 'groupbyPlace', 'minTermLength', 'zoom', 'center']),
    ...mapState('searchParameters', { storedPagination: 'pagination' }),

    ...mapGetters('searchParameters', [
      'query',
      'computedFilterParam',
      'computedSortParam',
      'computedRangeParam'
    ])
  }
}
</script>

<style>
  .map-container {
    width: 100%;
    height: 100%;
  }
  .toggle-table-up {
    position: fixed;
    bottom: 0;
    margin: auto;
    /* z-index: 1000; */
    left: calc(50% - 35px);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .toggle-table {
    width: 70px;
    height: 36px;
  }
</style>
