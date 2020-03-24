<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'AdministrativeBreadcrumbs',
  components: {},

  computed: {
    ...mapState('commune', ['region', 'arrondissement', 'canton', 'departement', 'commune']),
    items () {
      let items = []
      if (this.region) { items.push({ text: this.region.label }) }
      if (this.departement) { items.push({ text: `${this.departement.label} (${this.departement['insee-code']}) ` }) }
      if (this.arrondissement) { items.push({ text: this.arrondissement.label }) }
      if (this.canton) { items.push({ text: this.canton.label }) }
      if (this.commune.data) { items.push({ text: this.commune.data.attributes['NCCENR'] }) }
      return items
    }
  }
}

</script>

<style scoped>
</style>
