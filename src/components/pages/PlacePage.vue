<template>
  <v-app>
    <main-toolbar>

    </main-toolbar>
    <v-content>
      <section style="min-height: 80%">
        <v-container grid-list-md text-xs-center>
          <v-layout wrap>

            <v-flex xs12>
              <v-layout justify-start >
                <v-btn class="elevation-1 blue--text ma-1" @click="$router.go(-1)">
                  <v-icon style="padding-right: 8px">chevron_left</v-icon>
                  Retour
                </v-btn>
              </v-layout>
            </v-flex>

            <v-flex grow pa-1 xs6>
              <v-card v-if="!!placeItem" class="mx-auto">

                  <div class="d-flex justify-space-between permanent-hover">
                    <v-card-title v-html="placeItem.label"/>

                    <administrative-breadcrumbs class="overline" :insee-code="placeItem.insee_code"/>
                  </div>

                  <v-card-subtitle>
                    DT76, 1982, p. n°23 (exemple)
                  </v-card-subtitle>

                  <v-card-text class="text-justify text--primary body-1">
                    <p v-html="placeItem.description"/>
                  </v-card-text>

                  <v-expansion-panels accordion flat hover multiple light v-model="panel">
                      <v-expansion-panel>
                        <v-expansion-panel-header class="permanent-hover">
                          <div class="subtitle-1 font-weight-medium">Formes anciennes</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="body-2 pt-4">
                        <a class="caption">Table des abréviations</a>
                         <ol class="mt-2">
                           <li v-for="oldLabel in placeOldLabels" :key="oldLabel.id">
                             <span class="font-weight-medium" v-html="oldLabel.label"/>,
                             <span v-html="oldLabel.date"/>
                             (<span v-html="oldLabel.reference"/>)
                           </li>
                         </ol>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header  class="permanent-hover">
                          <div class="subtitle-1 font-weight-medium">Commentaire</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="text-justify body-1 pt-4">
                          <p class="" v-html="placeItem.comment" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>

              </v-card>
            </v-flex>

            <v-flex xs6 v-if="!!placeItem && !!placeItem.coordinates">
              <v-card dark color="secondary">
                <my-awesome-map :use-heatmap="false" min-height="640px" :initial-zoom="7" :use-fly-animation="false">
                </my-awesome-map>
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
import LinkingMenu from '../ui/LinkingMenu'
import CustomFooter from '../ui/CustomFooter'
import ExportMenu from '../ui/ExportMenu'
import MainToolbar from '../ui/MainToolbar'
import { cleanStr } from '../../utils/helpers'
import AdministrativeBreadcrumbs from '../AdministrativeBreadcrumbs'

export default {
  name: 'PlacePage',
  props: ['placeId'],
  components: {
    MainToolbar,
    MyAwesomeMap,
    LinkingMenu,
    ExportMenu,
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
    // this.fetchData()
    next()
  },
  watch: {
    placeItem () {
      if (this.placeItem) {
        const obj = {
          id: this.placeItem.id,
          coordinates: [
            parseFloat(this.placeItem.coordinates[1].trim()),
            parseFloat(this.placeItem.coordinates[0].trim())
          ]
        }
        this.selectPlace(obj)
        console.log('set place', obj)
      }
    }
  },
  methods: {
    clean (str) {
      return cleanStr(str)
    },
    async fetchData () {
      this.clearMapMarkers()
      await this.searchMapMarker({
        query: `(id:"${this.placeId}" AND type:place)`,
        pageNumber: 1,
        pageSize: 1
      }
      )
      await this.fetchPlaceCard(this.placeId)
    },
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['fetchPlaceCard']),
    ...mapActions('mapmarkers', ['searchMapMarker', 'clearMapMarkers'])
  },
  computed: {
    items () {
      return [
        {
          action: 'share',
          label: 'Lieux liés',
          items: this.linkedPlaces ? this.linkedPlaces.map(p => {
            return {
              id: p.id,
              type: p.type,
              label: p.label,
              subLabel: p.description,
              coordinates: p.coordinates,
              actions: {
                goTo: `/places/${p.id}`
              }
            }
          }) : []
        },
        {
          action: 'call_split',
          label: 'Formes alternatives',
          items: []
        },
        {
          action: 'history',
          label: 'Formes anciennes',
          items: this.placeOldLabels ? this.placeOldLabels.map(p => {
            return {
              id: p.id,
              type: p.type,
              label: p.label,
              subLabel: p.labelNode,
              coordinates: undefined,
              actions: {}
            }
          }) : []
        }
      ]
    },
    breadCrumbs () {
      return []
    },
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('places', ['selectedItem']),
    ...mapState('mapmarkers', { mapmarkerItems: 'items' })
  }
}
</script>

<style scoped>
  p::first-letter {
    text-transform: uppercase ;
  }
  .permanent-hover {
    background-color:rgba(0, 0, 0, 0.04);
  }
</style>
