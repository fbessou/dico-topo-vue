<template>
  <v-app  class="ggg">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>DICTIONNAIRE</span>
        <span class="font-weight-light"> TOPONYMIQUE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
  
      
      <v-text-field
                    prepend-inner-icon="search"
                    type="text"
                    placeholder="Ex. Clacy"
                    v-model="searchedTerm"
      ></v-text-field>
      
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Documentation</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>
 

    <v-content>
      <div style="height: 55%">
        <my-awesome-map></my-awesome-map>
      </div>
       <v-container fluid>
         <placename-search-table :searched-term="searchedTerm"></placename-search-table>
       </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import 'leaflet/dist/leaflet.css'
  import { mapActions, mapState } from 'vuex'

  import PlacenameSearchTable from './components/PlacenameSearchTable'
  import MyAwesomeMap from './components/MyAwesomeMap'
  
  export default {
  name: 'App',
  components: {
    PlacenameSearchTable,
    MyAwesomeMap
  },
  data () {
    return {
      searchedTerm: 'Clacy'
    }
  },
  computed: {
  },
  methods: {
  
  }
}
</script>

<style>
  body {
    background-color: #fafafa !important;
  }

  #homepage-container {
    padding: 0 !important;
  }
</style>
