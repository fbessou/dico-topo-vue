<template>
    <span class="fuzziness">
        <v-slider
        v-model="model"
        :max="2"
        step="1"
        dense
        color="red darken-2"
        track-color="grey"
        :label="thumbLabel"
      ></v-slider>
    </span>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'FuzzinessWidget',
  data () {
    return {
      model: 0
    }
  },
  computed: {
    ...mapState('searchParameters', ['fuzziness']),
    thumbLabel () {
      if (this.model <= 0) {
        return 'Exact'
      }
      if (this.model <= 1) {
        return 'Flou'
      }
      return 'Très flou'
    }
  },
  watch: {
    model () {
      this.setFuzziness(this.model)
    },
    fuzziness () {
      this.model = this.fuzziness
    }
  },
  mounted () {
    this.model = this.fuzziness
  },
  methods: {
    ...mapActions('searchParameters', ['setFuzziness'])
  }

}
</script>

<style lang="scss">
 .v-slider__thumb {
  height: 12px;
  width: 12px;
}
.fuzziness {
    min-width: 160px;
    margin-top: 2px;
    margin-right: 42px;
    .v-messages {
    display: none !important;
}
}
</style>
