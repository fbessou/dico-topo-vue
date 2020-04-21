<template>
  <v-app-bar app>
    <v-toolbar-title
      class="headline text-uppercase mr-5"
      @click="$router.push({ name: 'landing' })"
      style="cursor: pointer; "
    >
      <img
        src="@/assets/logo-dicotopo-cut.png"
        height="55px"
        style="padding-top: 8px; padding-left: 40px"
      />
    </v-toolbar-title>

    <v-text-field
      type="text"
      placeholder="Ex. Saint Simon"
      v-model="inputTerm"
      style="min-width: 80px; width: 360px; max-width: 360px; padding-top: 26px; margin-left: 10px "
      color="rgb(211, 47, 47)"
      @keyup.enter.native="onSearchEventPressEnter"
      :disabled="tableResultIsLoading || mapIsLoading"
      :loading="tableResultIsLoading || mapIsLoading"
      autofocus
      dense
      filled
      clearable
    >
      <template v-slot:append>
        <v-icon  @click="onSearchEventPressEnter" color="rgb(211, 47, 47)" class="search-icon">search</v-icon>
      </template>
    </v-text-field>

<!--
    <v-chip
      v-show="!!meta && $router.currentRoute.name === 'home'"
      class="subheading grey--text text--darken-2 ml-3 mr-2"
    >
      {{ meta.totalCount }}
    </v-chip>
-->
    <span v-if="showFilters" class="toolbar-buttons">
      <department-filter-menu />
    </span>

    <v-spacer></v-spacer>

    <v-btn text to="/contact" class="mr-2"  color="grey darken-2">
      <span class="pr-2 pl-2">Contact</span>
    </v-btn>

    <v-btn text to="/documentation" color="grey darken-2">
      <span class="pr-2 pl-2" >API</span>
      <v-icon>mdi-code-braces</v-icon>
    </v-btn>

  </v-app-bar>
</template>text

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import DepartmentFilterMenu from '../DepartmentFilterMenu'
export default {
  name: 'MainToolbar',
  props: {
    showTimeRange: { type: Boolean, default: false },
    search: { type: Function, default: undefined },
    showFilters: { type: Boolean, default: false }
  },
  components: { DepartmentFilterMenu },
  data () {
    return {
      inputTerm: undefined,
      showDepartmentFilterMenu: false,
      selectedTimeRange: []
    }
  },
  mounted () {
    this.inputTerm = this.term
  },
  methods: {
    onSearchEventPressEnter () {
      if (this.inputTerm) {
        if (!this.search) {
          if (this.$router.currentRoute.name !== 'home') {
            this.$router.push({ name: 'home' })
          }
        }
      }
      this.setTerm(this.inputTerm)
      this.search()
    },
    ...mapActions('searchParameters', [
      'setTerm',
      'setRange',
      'removeRange'
    ])
  },
  watch: {
    term () {
      this.search()
    },
    computedFilterParam () {
      this.search()
    },
    selectedTimeRange () {
      if (this.$props.showTimeRange && this.selectedTimeRange.length === 2) {
        const newRange = {
          key: 'text-date',
          operators: [
            `gte:${this.selectedTimeRange[0]}`,
            `lte:${this.selectedTimeRange[1]}`
          ]
        }
        this.setRange(newRange)
      }
    },
    knownYears () {
      if (this.selectedTimeRange.length === 0 && this.knownYears.length >= 2) {
        console.log('KY', this.knownYears)
        const lowerBound = this.knownYears[0].year
        const upperBound = this.knownYears[this.knownYears.length - 1].year
        this.selectedTimeRange = [lowerBound, upperBound]
      }
    },
    range (oldVal, newVal) {
      if (this.$props.showTimeRange) {
        if (
          oldVal !== newVal &&
          !!this.inputTerm &&
          this.inputTerm.length > 2
        ) {
          this.search()
        }
      }
    }
  },
  computed: {
    ...mapState('places', {
      meta: 'meta',
      knownYears: 'knownYears',
      tableResultIsLoading: 'isLoading'
    }),
    ...mapState('mapmarkers', {
      mapIsLoading: 'isLoading'
    }),
    ...mapState('searchParameters', [
      'term',
      'minTermLength',
      'range'
    ]),
    ...mapGetters('searchParameters', [
      'computedFilterParam',
      'computedRangeParam'
    ]),
    timeFilterData () {
      const lowerBound = this.knownYears[0].year
      const upperBound = this.knownYears[this.knownYears.length - 1].year

      return {
        labels: this.knownYears.map(y => ''),
        datasets: [
          {
            backgroundColor: '#d32f2f',
            data: this.knownYears.map(y => y.count),
            _meta: {
              start: lowerBound,
              end: upperBound,
              selectionStart: this.selectedTimeRange[0],
              selectionEnd: this.selectedTimeRange[1]
            }
          }
        ]
      }
    }
  }
}
</script>

<style >
html {
  background: lightgrey;
}
body:after {
  z-index: 100000;
  content: "beta";
  position: fixed;
  width: 100px;
  height: 28px;
  background: #ee8e4a;
  top: 7px;
  left: -28px;
  text-align: center;
  font-size: 13px;
  font-family: sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  line-height: 30px;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.toolbar-buttons {
  display: flex;
  line-height: 32px;
  position: relative;
  left: 30px;
}

.toolbar-buttons span {
  display: inline-block;
  vertical-align: middle;
}
.toolbar-buttons .v-slider__thumb {
  height: 20px;
  width: 20px;
}
.search-bar {
  cursor: pointer;
  color:brown;
}
</style>
