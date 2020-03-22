<template>
  <v-app>
    <main-toolbar>

    </main-toolbar>
    <v-content>
      <section style="min-height: 80%">
        <v-container grid-list-md mt-8 >
          <v-layout >
            <v-flex grow pa-1 xs7>
              <v-card v-if="!!placeItem" class="mx-auto">

                  <div class="d-flex justify-space-between grey lighten-4">
                    <v-card-title class="display-1 font-weight-medium" v-html="placeItem.label"/>
                    <administrative-breadcrumbs class="overline" :insee-code="placeItem.insee_code"/>
                  </div>

                  <v-card-subtitle>
                    DT76, 1982, p. n°23 (exemple)
                  </v-card-subtitle>

                  <v-card-text class="text-justify text--primary body-1" style="min-height: 80px">
                    <p v-html="placeItem.description"/>
                  </v-card-text>

                  <v-expansion-panels accordion flat hover multiple light v-model="panel">
                      <v-expansion-panel :disabled="placeOldLabels && placeOldLabels.length === 0">
                        <v-expansion-panel-header class="grey lighten-4">
                          <div class="subtitle-1 font-weight-medium">Formes anciennes</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="body-2 pt-4" v-show="placeOldLabels && placeOldLabels.length > 0">
                        <a class="caption">Table des abréviations</a>
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
                        <v-expansion-panel-content class="text-justify body-1 pt-4">
                          <p class="" v-html="placeItem.comment" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel :disabled="linkedPlaces && linkedPlaces.length === 0">
                        <v-expansion-panel-header class="grey lighten-4">
                          <div class="subtitle-1 font-weight-medium">Lieux alentours</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="text-justify body-2 pt-4">
                          <ol class="mt-2">
                            <li v-for="lp in linkedPlaces" :key="lp.id">
                              <a href="" class="font-weight-medium" @click="$router.push({name: 'place', params: {placeId: lp.id}})">{{lp.label}}</a>
                              <div class="capitalize-first-letter" v-html="lp.description" />
                            </li>
                          </ol>
                        </v-expansion-panel-content>
                  </v-expansion-panel>

                </v-expansion-panels>

              </v-card>
            </v-flex>

            <v-flex xs5>
              <v-card  v-if="mapItems && mapItems.length > 0 && mapItems[0].coordinates">
                <my-awesome-map
                 min-height="400px"
                :use-heatmap="false"
                :use-markers="true"
                :initial-zoom="8"
                :initialCenter="mapItems[0].coordinates"
                :key="placeItem.id"
                :mapmarker-items="mapItems"/>
              </v-card>

               <v-card class="mt-4">
                    <v-card-title class="headline  grey lighten-4">
                      Sur le web
                    </v-card-title>

                    <ul class="pa-8" v-if="placeItem">
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.databnf_ark">
                        <a :href="`https://data.bnf.fr/${placeItem.databnf_ark}`" target="_blank">data.bnf.fr</a>
                        <v-chip small label class="ml-4">{{placeItem.databnf_ark}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between mt-2 mb-4" v-if="placeItem.geoname_id">
                        <a :href="`http://www.geonames.org/${placeItem.geoname_id}`" target="_blank">GeoNames</a>
                        <v-chip small label class="ml-4">{{placeItem.geoname_id}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.viaf_id">
                        <a :href="`https://viaf.org/viaf/${placeItem.viaf_id}`" target="_blank">VIAF</a>
                        <v-chip small label class="ml-4">{{placeItem.viaf_id}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.wikipedia_url">
                        <a :href="placeItem.wikipedia_url" target="_blank">Wikipédia</a>
                        <v-chip small label class="ml-4">{{placeItem.wikipedia_url}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.wikidata_item_id">
                        <a :href="`https://www.wikidata.org/wiki/${placeItem.wikidata_item_id}`" target="_blank">Wikidata</a>
                        <v-chip small label class="ml-4">{{placeItem.wikidata_item_id}}</v-chip>
                      </li>
                    </ul>

                    <v-card-title class="headline grey lighten-4 mt-2">
                      Utiliser cette donnée
                    </v-card-title>

                    <ul class="pa-8"  v-if="placeItem">
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.databnf_ark">
                        <a :href="`https://data.bnf.fr/${placeItem.databnf_ark}`" target="_blank">data.bnf.fr</a>
                        <v-chip small label class="ml-4">{{placeItem.databnf_ark}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between mt-2 mb-4" v-if="placeItem.geoname_id">
                        <a :href="`http://www.geonames.org/${placeItem.geoname_id}`" target="_blank">GeoNames</a>
                        <v-chip small label class="ml-4">{{placeItem.geoname_id}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.viaf_id">
                        <a :href="`https://viaf.org/viaf/${placeItem.viaf_id}`" target="_blank">VIAF</a>
                        <v-chip small label class="ml-4">{{placeItem.viaf_id}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.wikipedia_url">
                        <a :href="placeItem.wikipedia_url" target="_blank">Wikipédia</a>
                        <v-chip small label class="ml-4">{{placeItem.wikipedia_url}}</v-chip>
                      </li>
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.wikidata_item_id">
                        <a :href="`https://www.wikidata.org/wiki/${placeItem.wikidata_item_id}`" target="_blank">Wikidata</a>
                        <v-chip small label class="ml-4">{{placeItem.wikidata_item_id}}</v-chip>
                      </li>
                    </ul>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>
      </section>
        <section class="foot--section mt-5">
          <custom-footer></custom-footer>
        </section>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyAwesomeMap from '../MyAwesomeMap'
import CustomFooter from '../ui/CustomFooter'
import MainToolbar from '../ui/MainToolbar'
import { cleanStr } from '../../utils/helpers'
import AdministrativeBreadcrumbs from '../AdministrativeBreadcrumbs'

export default {
  name: 'PlacePage',
  props: ['placeId'],
  components: {
    MainToolbar,
    MyAwesomeMap,
    AdministrativeBreadcrumbs,
    CustomFooter
  },
  data: () => {
    return {
      panel: [0]
    }
  },
  created () {
    this.fetchData()
  },
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    this.fetchData()
    next()
  },
  watch: {
    placeItem () {
      if (this.placeItem && this.placeItem.coordinates) {
        const obj = {
          id: this.placeItem.id,
          coordinates: [
            parseFloat(this.placeItem.coordinates[1].trim()),
            parseFloat(this.placeItem.coordinates[0].trim())
          ]
        }
        this.selectPlace(obj)
      }
    }
  },
  methods: {
    clean (str) {
      return cleanStr(str)
    },
    async fetchData () {
      // this.clearMapMarkers()
      await this.fetchPlaceCard(this.placeId)
    },
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['fetchPlaceCard']),
    ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers'])
  },
  computed: {
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('places', ['selectedItem']),
    mapItems () {
      return this.placeItem ? [ {
        id: this.placeItem.id,
        coordinates: [
          parseFloat(this.placeItem.coordinates[1].trim()),
          parseFloat(this.placeItem.coordinates[0].trim())
        ]
      }] : []
    }
  }
}
</script>

<style scoped>
  p::first-letter, .capitalize-first-letter::first-letter {
    text-transform: uppercase ;
  }
  ul {
    list-style-type: none;
  }
</style>
