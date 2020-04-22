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
    items () {
      let items = []
      // departement
      if (this.departement) {
        items.push({
          text: `${this.departement.label} (${this.departement['insee-code']})`
        })
      }
      // canton
      if (this.canton) {
        items.push({
          text: this.canton.label
        })
      }
      // commune de rattachement
      if (this.commune.data) {
        let newItem = { text: this.commune.data.attributes['NCCENR'] }
        if (this.commune.data.attributes['place-id']) {
          const route = this.$router.resolve({ name: 'place', params: { placeId: this.commune.data.attributes['place-id'] } })
          newItem['href'] = route.href
        }
        items.push(newItem)
      }
      // lieu
      if (this.placeItem) {
        let newItem = { text: this.placeItem.label }

        const route = this.$router.resolve({ name: 'place', params: { placeId: this.placeItem.id } })
        newItem['href'] = route.href

        items.push(newItem)
      }

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
