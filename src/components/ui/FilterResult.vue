<template>
  <div class="text-xs-center">

      <v-container >
        <v-layout wrap>

          <v-flex xs12>
            <v-combobox
              v-model="selected"
              :items="data"
              multiple
              chips
              clearable
              :open-on-clear="false"
              dense
              flat
              deletable-chips
              small-chips
              hide-selected
              :cache-items="cache"
            ></v-combobox>
          </v-flex>

        </v-layout>
      </v-container>

  </div>
</template>

<script>
export default {
  name: 'FilterResult',
  props: {
    items: { default: [], required: true },
    onChange: { type: Function, required: true }
  },
  data: () => ({
    menu: false,
    selected: [],
    cache: true
  }),
  created () {
    this.selected = []
  },
  watch: {
    selected () {
      this.onChange(this.selected)
    }
  },
  methods: {
    handleBlur () {

    }
  },
  computed: {
    data () {
      return this.items.map(i => { return { text: i.label, value: i.id } })
    }
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
