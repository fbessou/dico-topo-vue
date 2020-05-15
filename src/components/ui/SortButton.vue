<template>
  <v-btn icon small :ripple="false" @click="debouncedAction" :class="myClasses" :disabled="disabled">
    <v-icon small v-if="internalState === 'DESC'">{{descIcon}}</v-icon>
    <v-icon small v-else-if="internalState === 'ASC'">{{ascIcon}}</v-icon>
    <v-icon small v-else>{{descIcon}}</v-icon>
  </v-btn>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SortButton',
  props: {
    descIcon: { type: String },
    ascIcon: { type: String },
    label: { type: String },
    action: { type: Function },
    sortState: { type: String, default: 'NONE' },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      internalState: null,
      debouncedAction: _.debounce(this.callAction, 100)
    }
  },
  created () {
    this.internalState = this.$props.sortState
  },
  methods: {
    callAction () {
      switch (this.internalState) {
        case 'DESC':
          this.internalState = 'ASC'
          break
        case 'ASC':
          this.internalState = 'NONE'
          break
        case 'NONE':
          this.internalState = 'DESC'
          break
      }
      this.$props.action(this.internalState)
    }
  },
  computed: {
    myClasses () {
      if (this.internalState === 'NONE') {
        return 'none-state'
      } else {
        return 'active-state'
      }
    }
  }
}
</script>

<style>
  .none-state {
    color: dimgrey !important;
  }

  .active-state {
    color: dodgerblue !important;
  }
</style>
