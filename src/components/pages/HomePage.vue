<template>
  <v-app>
    <main-toolbar :show-time-range="false" :show-group-by="true">
    
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
  import Vue from 'vue';
  
  import PlacenameSearchTable from '../PlacenameSearchTable'
  import MyAwesomeMap from '../MyAwesomeMap'
  import PlacenameCard from '../PlacenameCard'
  import MainToolbar from '../ui/MainToolbar'
  
  export default {
    name: 'HomePage',
    components: {
      MainToolbar,
      PlacenameSearchTable,
      PlacenameCard,
      MyAwesomeMap
    },
    data () {
      return {
        showTabularResults: true,
      }
    },
    mounted () {
      this.unselectPlacename()
      this.inputTerm = this.term
    },
    methods: {
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
      ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlacename'])
    },
    computed: {
      ...mapState('placenames', { selectedPlacename: 'selectedItem', meta: 'meta' }),
      ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items'}),
      ...mapState('searchParameters', ['term', 'includeOldLabels', 'groupbyPlacename', 'minTermLength']),
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
