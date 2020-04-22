<template>
  <v-breadcrumbs class="overline font-weight-small" :items="items">
     <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled"
      >
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'AdministrativeBreadcrumbs',
  components: {},

  computed: {
    ...mapState('commune', ['region', 'arrondissement', 'canton', 'departement', 'commune']),
    ...mapState('PlaceCard', ['placeItem']),
    data () {
      return {

      }
    },
    items () {
      let items = []
      // if (this.region) { items.push({ text: this.region.label }) }
      if (this.departement) { items.push({ text: `${this.departement.label} (${this.departement['insee-code']}) ` }) }

      if (this.canton) { items.push({ text: this.canton.label }) }
      if (this.commune.data) { items.push({ text: this.commune.data.attributes['NCCENR'] }) }
      if (this.placeItem) { items.push({ text: this.placeItem.label }) }

      return items
    }
  }
}

</script>

<style scoped>
  ul {
    padding-left: 2px !important;
  }
  .v-breadcrumbs {
    padding-top: 10px;
  }
</style>
