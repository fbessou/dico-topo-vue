<template>
  <v-container fill-height fluid id="homepage-container">
    <v-layout >
      <v-flex xs12>
        <my-awesome-map></my-awesome-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import MyAwesomeMap from './MyAwesomeMap'

  export default {
    name: 'HomePage',
    components: { MyAwesomeMap },
    data: () => {
      return ({})
    },
    created() {
      console.log("fetchplacename", this.$store.dispatch("placenames/fetchPlacename"));
    },
    ...mapActions('placenames', [
      'fetchPlacename'
    ])
  }
</script>

<style>
  #homepage-container {
    padding: 0 !important;
  }
</style>
