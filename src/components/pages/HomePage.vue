<template>
  <v-app>
    <main-toolbar :show-time-range="false" :show-group-by="true">

    </main-toolbar>

    <v-content>
      <div style="height:100%">
        <my-awesome-map
          :mapMarkerItems="mapMarkerItems"
          :on-marker-click="selectPlace"
          :on-map-click="onMapClickCallback"
          :use-fly-animation="false"
        >
        </my-awesome-map>

        <place-search-table
          v-show="!!term && term.length >= minTermLength && !!showTabularResults"
          :searched-term="query"
          :select-item-callback="selectPlaceOnMap"
        >
          <v-btn
            depressed small
            @click="showTabularResults = false"
            class="red--text white darken-2"
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </place-search-table>

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
      <place-card v-if="selectedPlace"></place-card>
    </v-content>

  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'

import PlaceSearchTable from '../PlaceSearchTable'
import MyAwesomeMap from '../MyAwesomeMap'
import PlaceCard from '../PlaceCard'
import MainToolbar from '../ui/MainToolbar'

export default {
  name: 'HomePage',
  components: {
    MainToolbar,
    PlaceSearchTable,
    PlaceCard,
    MyAwesomeMap
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
    selectPlaceOnMap (obj) {
      if (obj) {
        this.selectPlace(obj)
        Vue.set(this, 'showTabularResults', false)
        this.showTabularResults = false
      } else {
        this.unselectPlace()
      }
    },
    onMapClickCallback () {
      this.unselectPlace()
      Vue.set(this, 'showTabularResults', false)
      this.showTabularResults = false
    },
    ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers', 'setMarkersLoading']),
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['clearPlaceCard']),
    ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlace'])
  },
  computed: {
    ...mapState('places', { selectedPlace: 'selectedItem', meta: 'meta' }),
    ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items' }),
    ...mapState('searchParameters', ['term', 'includeOldLabels', 'groupbyPlace', 'minTermLength']),
    ...mapGetters('searchParameters', ['query', 'computedFilterParam'])
  }
}
</script>

<style>

  .toggle-table-up {
    position: fixed;
    bottom: 0;
    width: 100px;
    margin: auto;
    /* z-index: 1000; */
    left: calc(50% - 44px);

  }
</style>
