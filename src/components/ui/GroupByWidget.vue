<template>
  <!-- // version pour le tableau de resulta
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-switch class="mr-3" v-model="groupByOption" dense inset> </v-switch>
    </template>
    <span
      >Les résultats de la recherche ne sont pas groupés par lieu identifié mais
      par forme toponymique</span
    >
  </v-tooltip>
 !-->
  <span>
    <v-layout row>
      <v-flex>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">Lieux</span>
          </template>
          <span
            >Les résultats de la recherche sont groupés par lieu identifié</span
          >
        </v-tooltip>
      </v-flex>
      <v-flex>
        <v-switch
          class="ml-2"
          style="color: #d32f2f !important"
          v-model="groupByOption"
          color="lightgrey"
        >
        </v-switch>
      </v-flex>
      <v-flex>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">Toponymes</span>
          </template>
          <span
            >Les résultats de la recherche ne sont pas groupés par lieu
            identifié mais par forme toponymique</span
          >
        </v-tooltip>
      </v-flex>
    </v-layout>
  </span>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'GroupByWidget',
  data () {
    return {
      groupByOption: undefined
    }
  },
  mounted () {
    this.groupByOption = !this.groupbyPlace
  },
  computed: {
    ...mapState('searchParameters', ['groupbyPlace'])
  },
  watch: {
    groupByOption () {
      this.setGroupbyPlace(!this.groupByOption)
    }
  },
  methods: {
    ...mapActions('searchParameters', ['setGroupbyPlace'])
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  margin: 0px;
  position: relative;
  height: 10px;
  top: 5px;
  left: 12px;
  display: inline-flex;
  transform: scale(0.8);
  transform-origin: left;
}
</style>
