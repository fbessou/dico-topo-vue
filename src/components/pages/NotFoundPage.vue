<template>
  <default-layout>
    <v-container fluid>
      <span class="title text-xs-center orange--text">Page non trouvée</span>
    </v-container>
  </default-layout>
</template>

<script>
import MainToolbar from '../ui/MainToolbar'
import DefaultLayout from '../DefaultLayout'

export default {
  name: 'NotFoundPage',
  components: { DefaultLayout }
}
</script>

<style scoped>

</style>
