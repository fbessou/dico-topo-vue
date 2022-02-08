<template>
  <v-layout
    class="subheading mb-1 font-weight-light black--text"
    row
    wrap
    align-center
    justify-center
  >
    <v-flex xs2 class="text-xs-center">
      <span class="font-weight-bold">42</span><span> départements</span>
    </v-flex>
    <v-flex xs2 class="text-xs-center">
      <span class="font-weight-bold">511.944 </span><span> lieux</span>
    </v-flex>
    <v-flex xs2 class="text-xs-center">
      <span class="font-weight-bold">1.207.647 </span><span> formes anciennes</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'PlaceCountInfo'
}
</script>
