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
      >
        <v-icon>tune</v-icon>
      </v-btn>
    </template>
    
    <v-card>
      <v-card-text>
        <v-switch
          v-model="includeOldLabels"
          color="info"
          label="Inclure les formes anciennes">
        </v-switch>
      </v-card-text>
      
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'SearchOptionsMenu',
    props: {
      onOptionsChange : { type: Function },
      onOpen : { type: Function },
      initialData : { type: Object}
    },
    data: () => ({
      dialog: false,
      includeOldLabels: true
    }),
    created() {
      if (this.$props.initialData) {
        this.includeOldLabels = this.$props.initialData.includeOldLabels
      }
    },
    watch: {
      dialog(val) {
        if (val) {
          if (this.$props.onOpen) {
            this.$props.onOpen()
          }
        }
      },
      includeOldLabels() {
        if (this.onOptionsChange) {
          this.onOptionsChange({
            includeOldLabels : this.includeOldLabels
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
