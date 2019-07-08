<template>
  <v-toolbar app>
    
    <v-toolbar-title class="headline text-uppercase" @click="$router.push({name: 'landing'})"
                     style="cursor: pointer; ">
  
      <img src="@/assets/logo-dicotopo-cut.png" height="55px" style="padding-top: 8px; padding-left: 40px"/>
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
