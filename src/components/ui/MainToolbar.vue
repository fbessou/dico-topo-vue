<template>
  <v-app-bar app>
    <v-toolbar-title
      class="headline text-uppercase"
      @click="$router.push({ name: 'landing' })"
      style="cursor: pointer; "
    >
      <img
        src="@/assets/logo-dicotopo-cut.png"
        height="55px"
        style="padding-top: 8px; padding-left: 40px"
      />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      prepend-inner-icon="search"
      type="text"
      placeholder="Ex. Laon"
      v-model="inputTerm"
      :autofocus="true"
      clearable
      style="width: 0; padding-top: 16px"
      color="rgb(211, 47, 47)"
      @keyup.enter.native="onSearchEventPressEnter"
    >
    </v-text-field>

    <v-chip
      v-show="!!meta && $router.currentRoute.name === 'home'"
      class="subheading grey--text text--darken-2 ml-3 mr-2"
    >
      {{ meta.totalCount }}
    </v-chip>

    <span class="toolbar-buttons">
      <span v-if="showGroupBy">
        <v-layout row>
          <v-flex>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">Lieux</span>
              </template>
              <span
                >Les résultats de la recherche sont groupés par lieu
                identifié</span
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
    </span>

    <v-spacer></v-spacer>

    <v-btn text to="/contact" class="mr-2">
      <span class="pr-2 pl-2">Contact</span>
    </v-btn>

    <v-btn text to="/documentation">
      <span class="pr-2 pl-2">API</span>
      <v-icon>code</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainToolbar',
  props: {
    showGroupBy: { type: Boolean, default: false },
    showTimeRange: { type: Boolean, default: false },
    search: { type: Function, default: undefined }
  },
  components: {},
  data () {
    return {
      inputTerm: undefined,
      groupByOption: undefined,
      selectedTimeRange: []
    }
  },
  mounted () {
    this.groupByOption = !this.groupbyPlace
    this.inputTerm = this.term
  },
  methods: {
    onSearchEventPressEnter () {
      this.search()
    },
    ...mapActions('searchParameters', [
      'setTerm',
      'setGroupbyPlace',
      'setRange',
      'removeRange'
    ])
  },
  watch: {
    inputTerm (oldVal, newVal) {
      if (newVal) {
        if (!this.search) {
          if (this.$router.currentRoute.name !== 'home') {
            this.$router.push({ name: 'home' })
          }
        }
        this.setTerm(this.inputTerm)
      }
    },
    term () {
      this.search()
    },
    groupByOption () {
      if (this.$props.showGroupBy) {
        this.setGroupbyPlace(!this.groupByOption)
      }
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
      knownYears: 'knownYears'
    }),
    ...mapState('searchParameters', [
      'term',
      'groupbyPlace',
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

.toolbar-buttons > span {
  display: flex;
  line-height: 32px;
  margin-top: 20px;
  margin-left: 32px;
  color: grey;
  font-family: Roboto, sans-serif;
}

.toolbar-buttons span {
  display: inline-block;
  vertical-align: middle;
}
.toolbar-buttons .v-slider__thumb {
  height: 20px;
  width: 20px;
}
</style>
