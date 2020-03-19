<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'AdministrativeBreadcrumbs',
  props: ['inseeCode'],
  components: [],

  create () {
    this.$store.dispatch('commune/fetch', this.$props.inseeCode)
  },
  computed: {
    ...mapState('commune', ['region', 'arrondissement', 'canton', 'departement', 'commune']),
    items () {
      return [this.region, this.departement, this.canton, this.arrondissement]
    }
  }
}

</script>
