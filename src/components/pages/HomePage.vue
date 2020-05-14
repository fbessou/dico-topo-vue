<template>
  <v-app>
    <main-toolbar :show-time-range="false" :show-filters="true">

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
          v-show="!!showTabularResults && meta.totalCount && term.length > 0"
          :select-item-callback="selectPlaceOnMap"
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
    ...mapActions('places', ['selectPlace', 'unselectPlace'])
  },
  computed: {
    ...mapState('mapmarkers', { 'mapMarkerItems': 'items' }),
    ...mapState('places', { selectedPlace: 'selectedItem', meta: 'meta' }),
    ...mapState('searchParameters', ['term', 'range', 'includeOldLabels', 'groupbyPlace', 'minTermLength', 'zoom', 'center'])
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
