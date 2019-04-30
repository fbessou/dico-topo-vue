<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase" @click="$router.push({name: 'home'})" style="cursor: pointer">
        <span>DICTIONNAIRE</span>
        <span class="font-weight-light"> TOPONYMIQUE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
  
      <v-btn flat to="/documentation" target="_blank">
        <span class="mr-2">Documentation</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
 
    </v-toolbar>
    
    <v-content>
      <v-container fluid>
      
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'DocumentationPage'
  }
</script>

<style scoped>

</style>
