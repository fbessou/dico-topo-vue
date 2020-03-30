<template>
  <default-layout>
    <section style="min-height: 80%" class="mb-10">
        <v-container grid-list-md mt-8 >

          <router-link to="/search">Retourner vers la recherche</router-link>

          <v-layout class="mt-4">
            <v-flex grow pa-1 xs7>
              <v-card v-if="!!placeItem" class="mx-auto">

                  <div class="d-flex justify-space-between grey lighten-4">
                    <v-card-title class="display-1 font-weight-medium" v-html="placeItem.label"/>
                    <administrative-breadcrumbs class="overline"/>
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
                        <v-expansion-panel-content class="text-justify body-1 pt-4">
                          <p class="" v-html="placeItem.comment" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel :disabled="linkedPlaces && linkedPlaces.length === 0">
                        <v-expansion-panel-header class="grey lighten-4">
                          <div class="subtitle-1 font-weight-medium">Lieux alentours</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="text-justify body-2 pt-4"  v-show="linkedPlaces && linkedPlaces.length > 0">
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
            </v-flex>

            <v-flex xs5>
              <v-card  v-if="coordinates.length > 0" class="mb-2">
                <my-awesome-map
                 min-height="400px"
                :use-heatmap="false"
                :use-markers="true"
                :initial-zoom="8"
                :initial-center="coordinates"
                :mapmarker-items="mapItems"/>
              </v-card>

              <v-card  v-if="placeItem">

                    <div v-if="placeItem.databnf_ark || placeItem.geoname_id || placeItem.viaf_id || placeItem.wikidata_item_id || placeItem.wikipedia_url"
                    class="mb-2">
                    <v-card-title class="headline  grey lighten-4">
                      Sur le web
                    </v-card-title>

                    <ul class="pa-8">
                      <li class="d-flex justify-space-between  mb-4" >
                        <span class="overline">Site</span>
                        <span class="overline">Identifiant</span>
                      </li>
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
                    </div>

                    <v-card-title class="headline grey lighten-4">
                      Utiliser cette donnée
                    </v-card-title>

                    <div class="d-flex text-justify pa-8 mt-2" v-if="placeItem">
                      <span>
                          Vous pouvez citer ce lieu dans vos travaux en utilisant
                          <router-link class="font-weight-medium" :to="{name: 'place', params: {placeId: placeItem.id}}">ce permalien</router-link>
                          ou utiliser les liens suivants pour exporter les données
                      </span>
                    </div>

                    <ul class="pa-8 pt-0" v-if="placeItem">
                      <li class="d-flex justify-space-between  mb-4" >
                        <span class="overline">Format</span>
                        <span class="overline">Téléchargement</span>
                      </li>
                      <li class="d-flex justify-space-between mt-2 mb-4">
                        <span><a href='https://jsonapi.org/format/1.0/'>JSON API 1.0</a></span>
                        <v-btn icon small depressed :href="`${apiUrl}/places/${placeId}`">
                          <v-icon>get_app</v-icon>
                        </v-btn>
                      </li>
                      <li class="d-flex justify-space-between mb-4">
                        <span><a href='https://github.com/LinkedPasts/linked-places'>LinkedPlaces</a></span>
                        <v-btn icon small depressed :href="`${apiUrl}/places/${placeItem.id}?export=linkedplaces`">
                          <v-icon>get_app</v-icon>
                        </v-btn>
                      </li>
                    </ul>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>
    </section>
  </default-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyAwesomeMap from '../MyAwesomeMap'
import DefaultLayout from '../DefaultLayout'
import { cleanStr } from '../../utils/helpers'
import AdministrativeBreadcrumbs from '../AdministrativeBreadcrumbs'

export default {
  name: 'PlacePage',
  props: ['placeId'],
  components: {
    MyAwesomeMap,
    AdministrativeBreadcrumbs,
    DefaultLayout
  },
  data: () => {
    return {
      panel: [0]
    }
  },
  mounted () {
    this.fetchData(this.placeId)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchData(to.params.placeId)
    next()
  },
  watch: {

  },
  methods: {
    clean (str) {
      return cleanStr(str)
    },
    buildCoords (obj) {
      const longlat = obj.attributes['longlat']
      const coords = longlat ? longlat.substr(1, longlat.length - 2).split(',') : []
      if (coords) {
        coords[0] = parseFloat(coords[0].trim())
        coords[1] = parseFloat(coords[1].trim())
      }
      return coords.reverse()
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
    ...mapState('commune', ['commune']),
    coordinates () {
      return this.commune && this.commune.data ? this.buildCoords(this.commune.data) : []
    },
    mapItems () {
      return this.placeItem ? [{ id: this.placeItem.id, coordinates: this.coordinates }] : []
    },
    apiUrl () {
      return process.env.VUE_APP_API_BASE_URL
    }
  }
}
</script>

<style>
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
