<template>
 <v-card v-if="!!placeItem" class="mx-auto" :class="`${popup ? 'place-card-popup' : 'place-card'}`">

                  <div class="grey lighten-4">
                    <v-card-title class="display-1 font-weight-medium">
                      <div style="width: 100%">
                        <span class="" v-html="placeItem.label"/>
                        <span v-if="popup" class="title-buttons">
                          <v-btn small icon :to="`/places/${placeItem.id}`">
                            <v-icon>mdi-open-in-new</v-icon>
                          </v-btn>
                          <v-btn small icon class="ml-2" @click="unselectPlace">
                            <v-icon>close</v-icon>
                          </v-btn>
                        </span>
                      </div>
                      <administrative-breadcrumbs/>
                    </v-card-title>
                  </div>

                  <v-card-subtitle v-if="biblItem" v-html="biblItem.bibl"/>

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
                             <span class="font-weight-medium" v-html="oldLabel.label"/>
                             <span v-html="prettifyOldLabel(oldLabel)"/>
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
                          <div class="subtitle-1 font-weight-medium" :key="commune.id">{{linkedPlacesPanelLabel}}</div>
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
  props: {
    placeId: { type: String },
    popup: { type: Boolean, default: true }
  },
  data: () => {
    return {
      panel: [0]
    }
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
      this.clearBibl()
      await this.fetchPlaceCard(id)
      await this.fetchBibl(id)
      if (this.placeItem.insee_code) {
        await this.fetchCommune(this.placeItem.insee_code)
      }
    },
    prettifyOldLabel (o) {
      const date = o.date ? o.date : ''
      const ref = o.reference ? `(${o.reference})` : ''
      return `, ${date} ${ref}`
    },
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['fetchPlaceCard', 'clearPlaceCard']),
    ...mapActions('commune', { fetchCommune: 'fetch', clearCommune: 'clear' }),
    ...mapActions('bibls', { fetchBibl: 'fetch', clearBibl: 'clear' })
  },
  computed: {
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('commune', ['commune']),
    ...mapState('bibls', { biblItem: 'bibl' }),
    linkedPlacesPanelLabel () {
      if (!this.commune || !this.commune.data || !this.linkedPlaces) {
        return 'Autres lieux'
      }
      return `${this.linkedPlaces.length === 1 ? 'Autre lieu à' : 'Autres lieux à'} ${this.commune.data.attributes['NCCENR']}`
    }
  }
}
</script>

<style scoped>
  .place-card-popup{
    position: absolute;
    top: 30px;
    left: 50px;
    width: 650px;
    z-index: 10000;
  }
  .title-buttons {
    float: right;
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
