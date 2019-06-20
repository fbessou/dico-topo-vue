<template>
  <div>
  <v-dialog
    v-model="dialog"
    width="800"
    :hide-overlay="true"
    transition="slide-y-transition"
    content-class="search-options-menu"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
        small
        :disabled="mapMarkersAreLoading"
      >
        <v-icon>tune</v-icon>
      </v-btn>
    </template>
    
    <v-card>
      <v-card-text>
        <v-switch
          v-model="oldLabels"
          color="info"
          label="Inclure les formes anciennes"
          :disabled="mapMarkersAreLoading">
        </v-switch>
        <v-switch
          v-model="groupby"
          color="info"
          label="Grouper par article"
          :disabled="mapMarkersAreLoading">
        </v-switch>
      </v-card-text>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    name: 'SearchOptionsMenu',
    props: {
      onOptionsChange : { type: Function },
      onOpen : { type: Function },
    },
    data: () => ({
      dialog: false
    }),
    created() {
    },
    methods: {
      ...mapActions('searchParameters', ['setIncludeOldLabels', 'setGroupbyPlacename'])
    },
    computed: {
      oldLabels: {
        get: function () {
          return this.includeOldLabels
        },
        set(newValue) {
          this.setIncludeOldLabels(newValue)
        }
      },
      groupby: {
        get: function () {
          return this.groupbyPlacename
        },
        set (newValue) {
          this.setGroupbyPlacename(newValue)
        }
      },
      ...mapState('mapmarkers', { mapMarkersAreLoading: 'isLoading' }),
      ...mapState('searchParameters', ['includeOldLabels', 'groupbyPlacename'])
    },
    watch: {
      dialog(val) {
        if (val) {
          if (this.$props.onOpen) {
            this.$props.onOpen()
          }
        }
      },
      oldLabels() {
        if (this.onOptionsChange) {
          this.onOptionsChange({
            includeOldLabels: this.oldLabels,
            groupbyPlacename:  this.groupby
          })
        }
      },
      groupby() {
        if (this.onOptionsChange) {
          this.onOptionsChange({
            includeOldLabels: this.oldLabels,
            groupbyPlacename: this.groupby
          })
        }
      }
    }
  }
</script>

<style>
.search-options-menu {
  position: absolute;
  top: 39px;
  max-height: unset !important;
}
</style>
