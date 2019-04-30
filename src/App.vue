<template>
  <v-app>
    <home-page></home-page>
  </v-app>
</template>

<script>
  
  import HomePage from './components/pages/HomePage'
  
  export default {
    name: 'App',
    components: {
      HomePage
    }
  }
  
</script>

<style>
  body {
    background-color: #fafafa !important;
  }
</style>
