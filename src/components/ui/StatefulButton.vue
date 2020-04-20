<template>
  <v-btn icon small :ripple="false" @click="callAction" :class="myClasses">
    <v-icon small v-if="state === 1">{{activeIcon}}</v-icon>
    <v-icon small v-else>{{inactiveIcon}}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'StatefulButton',
  props: {
    activeIcon: { type: String },
    inactiveIcon: { type: String },
    label: { type: String },
    action: { type: Function },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      state: 2
    }
  },
  mounted () {
    if (!this.disabled) {
      this.state = this.active ? 1 : 0
    } else {
      this.state = 2
    }
  },
  methods: {
    callAction () {
      switch (this.state) {
        case 0: // STATE A  --> STATE B
          this.state = 1
          break
        case 1: // STATE B --> DISABLED
          this.state = 2
          break
        case 2: // DISABLED --> STATE A
          this.state = 0
          break
      }

      const val = this.state === 1
      this.$props.action(this.state === 2 ? null : val)
    }
  },
  computed: {
    myClasses () {
      if (this.state === 2) {
        return 'disabled-state'
      } else {
        return 'enabled-state'
      }
    }
  }
}
</script>

<style>
  .disabled-state {
    color: dimgrey !important;
  }

  .enabled-state {
    color: dodgerblue !important;
  }
</style>
