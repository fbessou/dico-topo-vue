<template>
  <span>
    <!--
    <v-flex>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">Grouper par lieux</span>
        </template>
        <span
          >Les résultats de la recherche sont groupés par lieu identifié</span
        >
      </v-tooltip>
    </v-flex>
    !-->
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <span>
          <v-switch class="mr-3" v-model="groupByOption" dense inset>
          </v-switch>
        </span>
      </template>
      <span
        >Les résultats de la recherche ne sont pas groupés par lieu identifié
        mais par forme toponymique</span
      >
    </v-tooltip>
    <!--
    <v-flex>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">Toponymes</span>
        </template>
        <span
          >Les résultats de la recherche ne sont pas groupés par lieu identifié
          mais par forme toponymique</span
        >
      </v-tooltip>
    </v-flex>
    -->
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
  display: inline-flex;
  transform: scale(0.800);
  transform-origin: left;
}
</style>
