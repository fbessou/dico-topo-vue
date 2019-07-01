<template>
  <div class="text-xs-center">

      <v-container >
        <v-layout wrap>
         
          <v-flex xs12>
            <v-combobox
              v-model="selected"
              :items="items"
              multiple
              chips
              clearable
              dense
              flat
              deletable-chips
              small-chips
              cache-items
            ></v-combobox>
          </v-flex>
          
        </v-layout>
      </v-container>
    
  </div>
</template>

<script>
  export default {
    name: 'FilterResult',
    props:  {
      items: {default: [], required: true},
      onChange: {type: Function, required: true}
    },
    data: () => ({
      menu: false,
      selected: [],
    }),
    watch: {
      selected() {
        this.onChange(this.selected);
      }
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  .v-menu__content {
    background-color: #fafafa;
  }
  .container {
    padding: 0px 8px;
    margin: 0px;
  }
</style>
