<template>
  <v-footer app padless absolute height="150" color=" grey lighten-2">
    <v-col class="justify-space-around d-flex footer-logos">
        <img  src="@/assets/logo-an-dark.png" height="60"/>
        <img  src="@/assets/logo-enc-noir.png" height="60"/>
        <img  src="@/assets/logo-cths-noir.png" height="60"/>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'CustomFooter'
}
</script>

<style scoped>
  /*.v-footer {margin-top: 200px;}*/

  @media screen and (max-width: 760px) {
    .v-footer {
      height: 260px !important;
    }
    .footer-logos {
      flex-direction: column;
      align-items: center;
    }
    .footer-logos > * {
      margin-bottom: 5px;
      transform-origin: 50%;
      transform: scale(0.8, 0.8);
    }
  }

</style>
