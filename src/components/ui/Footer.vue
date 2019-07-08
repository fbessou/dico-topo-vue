<template>
  <v-footer
    app
    color="#d3d3d3"
    absolute="false"
    height="100px"
  >

    <v-footer-title class="v-footer text-uppercase">

      <v-layout class="mb-1" row wrap align-center justify-center>
        <v-card-media xs2 class="text-xs-center">
          <img src="@/assets/logo-an-dark.png" height="40"/>
        </v-card-media>
        <v-card-media xs2 class="text-xs-center">
          <img src="@/assets/logo-enc-noir.png" height="60"/>
        </v-card-media>
        <v-card-media xs2 class="text-xs-center">
          <img src="@/assets/logo-cths-noir.png" height="150"/>
        </v-card-media>
      </v-layout>

    </v-footer-title>

    <v-spacer></v-spacer>

    <slot></slot>

    <v-spacer></v-spacer>

  </v-footer>

</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>
  /*.v-footer {margin-top: 200px;}*/

</style>
