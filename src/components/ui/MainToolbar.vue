<template>
  <v-toolbar app>
    
    <v-toolbar-title class="headline text-uppercase" @click="$router.push({name: 'home'})"
                     style="cursor: pointer; padding-left: 40px">
  
      <img src="@/assets/logo-dicotopo.png" height="55px" style="padding-top: 8px"/>
      
      <!--
      <span>DICTIONNAIRE</span>
      <span class="font-weight-light"> TOPONYMIQUE</span>
      -->
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <slot></slot>
    
    <v-spacer></v-spacer>
    
    <v-btn flat to="/documentation" target="_blank">
      <span class="mr-2">API</span>
      <v-icon>code</v-icon>
    </v-btn>
  </v-toolbar>

</template>

<script>
  export default {
    name: 'MainToolbar'
  }
</script>

<style scoped>

</style>
