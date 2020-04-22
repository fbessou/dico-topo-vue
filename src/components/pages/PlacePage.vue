<template>
  <default-layout>
    <section style="min-height: 80%" class="mb-10">
        <v-container grid-list-md mt-8 >

          <router-link to="/search">Retourner vers la recherche</router-link>

          <v-layout class="mt-4">
            <v-flex grow pa-1 xs7>
              <place-card v-show="placeItem"
                :place-id="placeId"
                :key="placeId"
                :popup="false">
              </place-card>
            </v-flex>

            <v-flex xs5>
              <v-card  v-if="coordinates.length > 0" class="mb-2">
                <my-awesome-map
                 min-height="400px"
                :use-heatmap="false"
                :use-markers="true"
                :initial-zoom="9"
                :initial-center="{lat:coordinates[0], lng:coordinates[1]}"
                :save-position="false"
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
                      <li class="d-flex justify-space-between  mb-4" v-if="placeItem.siaf_id">
                        <a :href="`https://francearchives.fr/fr/location/${placeItem.siaf_id}`" target="_blank">France Archives</a>
                        <v-chip small label class="ml-4">{{placeItem.siaf_id}}</v-chip>
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
import PlaceCard from '../PlaceCard'

export default {
  name: 'PlacePage',
  props: ['placeId'],
  components: {
    MyAwesomeMap,
    PlaceCard,
    DefaultLayout
  },
  data: () => {
    return {

    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
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
    }
  },
  computed: {
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('commune', ['commune']),
    coordinates () {
      return this.commune && this.commune.data ? this.buildCoords(this.commune.data) : []
    },
    mapItems () {
      return this.placeItem ? [{ id: this.placeItem.id, coordinates: this.coordinates, active: true }] : []
    },
    apiUrl () {
      return process.env.VUE_APP_API_BASE_URL
    }
  }
}
</script>

<style>

</style>
