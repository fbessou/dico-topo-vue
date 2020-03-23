<template>
  <v-app>
    <main-toolbar />
    <v-content>
      <slot/>
    </v-content>
    <custom-footer></custom-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import CustomFooter from './ui/CustomFooter'
import MainToolbar from './ui/MainToolbar'

export default {
  name: 'DefaultLayout',
  props: {

  },
  components: {
    CustomFooter,
    MainToolbar
  },
  data () {
    return {

    }
  },
  mounted () {

  }
}
</script>
