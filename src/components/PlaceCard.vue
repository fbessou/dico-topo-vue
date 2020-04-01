<template>
 <v-card v-if="!!placeItem" class="mx-auto" :class="`${popup ? 'place-card-popup' : 'place-card'}`">

                  <div class="d-flex justify-space-between grey lighten-4">
                    <v-card-title class="display-1 font-weight-medium" v-html="placeItem.label"/>
                    <administrative-breadcrumbs class="overline"/>
                  </div>

                  <v-card-subtitle>
                    DT76, 1982, p. n°23 (exemple)
                  </v-card-subtitle>

                  <v-card-text class="text-justify text--primary body-1" style="min-height: 80px" :class="`${popup ? 'scrollable' : ''}`">
                    <p v-html="placeItem.description"/>
                  </v-card-text>

                  <v-expansion-panels accordion flat hover light v-model="panel" :multiple="!popup">
                      <v-expansion-panel :disabled="placeOldLabels && placeOldLabels.length === 0">
                        <v-expansion-panel-header class="grey lighten-4">
                          <div class="subtitle-1 font-weight-medium">Formes anciennes</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="body-2 pt-4" :class="`${popup ? 'scrollable' : ''}`"
                          v-show="placeOldLabels && placeOldLabels.length > 0">
                         <!-- <a class="caption">Table des abréviations</a> -->
                         <ol class="mt-2">
                           <li v-for="oldLabel in placeOldLabels" :key="oldLabel.id" >
                             <span class="font-weight-medium" v-html="oldLabel.label"/>,
                             <span v-html="oldLabel.date"/>
                             (<span v-html="oldLabel.reference"/>)
                           </li>
                         </ol>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel :disabled="placeItem && !placeItem.comment">
                        <v-expansion-panel-header  class="grey lighten-4">
                          <div class="subtitle-1 font-weight-medium">Commentaire</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="text-justify body-1 pt-4" :class="`${popup ? 'scrollable' : ''}`">
                          <p class="" v-html="placeItem.comment" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel :disabled="linkedPlaces && linkedPlaces.length === 0">
                        <v-expansion-panel-header class="grey lighten-4">
                          <div class="subtitle-1 font-weight-medium">Lieux alentours</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="text-justify body-2 pt-4" :class="`${popup ? 'scrollable' : ''}`"
                         v-show="linkedPlaces && linkedPlaces.length > 0">
                          <ol class="mt-2">
                            <li v-for="lp in linkedPlaces" :key="lp.id">
                              <router-link class="font-weight-medium" :to="{name: 'place', params: {placeId: lp.id}}">{{lp.label}}</router-link>
                              <div class="capitalize-first-letter" v-html="lp.description" />
                            </li>
                          </ol>
                        </v-expansion-panel-content>
                  </v-expansion-panel>

                </v-expansion-panels>
              </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { cleanStr } from '../utils/helpers'
import AdministrativeBreadcrumbs from './AdministrativeBreadcrumbs'

export default {
  name: 'PlaceCard',
  components: { AdministrativeBreadcrumbs },
  props: { placeId: { type: String }, popup: { type: Boolean, default: true } },
  data: () => {
    return {
      panel: [0]
    }
  },
  created () {

  },
  mounted () {
    this.fetchData(this.placeId)
  },
  methods: {
    clean (str) {
      return cleanStr(str)
    },
    async fetchData (id) {
      console.log('fetch place page data', id)
      this.clearPlaceCard()
      this.clearCommune()
      await this.fetchPlaceCard(id)
      if (this.placeItem.insee_code) {
        await this.fetchCommune(this.placeItem.insee_code)
      }
    },
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['fetchPlaceCard', 'clearPlaceCard']),
    ...mapActions('commune', { fetchCommune: 'fetch', clearCommune: 'clear' })
  },
  computed: {
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('commune', ['commune'])
  },
  watch: {

  }
}
</script>

<style scoped>
  .place-card-popup{
    position: absolute;
    top: 30px;
    left: 50px;
    width: 600px;
    z-index: 10000;
  }
  .scrollable {
    max-height: 350px;
    overflow-y: auto;
  }
  p::first-letter, .capitalize-first-letter::first-letter {
    text-transform: uppercase ;
  }
  ul {
    list-style-type: none;
  }
  .sc {
    font-variant: small-caps;
  }
</style>
