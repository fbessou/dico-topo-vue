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

  export default {
    name: 'MainToolbar',
    props: {
    },
    components: {
    },
    data () {
      return {
        maxMarkerPerBatch: 5000,
        inputTerm: undefined,
        groupByOption: undefined
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
        this.initSearch(reloadMap);
        if (this.$router.currentRoute.name !== 'home') {
          this.$router.push({name: 'home'});
        }
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
      ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlacename'])
    },
    watch: {
      inputTerm (oldVal, newVal) {
        if (!!newVal) {
          this.startNewSearch();
        }
      },
      groupByOption () {
        this.setGroupbyPlacename(!this.groupByOption)
        //this.startNewSearch(false);
      },
      computedFilterParam () {
        this.startNewSearch();
      },
    },
    computed: {
      ...mapState('placenames', { selectedPlacename: 'selectedItem', meta: 'meta' }),
      ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading', mapMarkerItems: 'items' }),
      ...mapState('searchParameters', ['term', 'includeOldLabels', 'groupbyPlacename', 'minTermLength']),
      ...mapGetters('searchParameters', ['query', 'computedFilterParam'])
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
</style>
