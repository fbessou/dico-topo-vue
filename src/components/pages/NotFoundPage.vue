<template>
  <v-app>
    <main-toolbar></main-toolbar>
  
    <v-content>
      <v-container fluid>
        <span class="title text-xs-center orange--text">Page non trouvée</span>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import MainToolbar from '../ui/MainToolbar'
  
  export default {
    name: 'NotFoundPage',
    components: {MainToolbar}
  }
</script>

<style scoped>

</style>
