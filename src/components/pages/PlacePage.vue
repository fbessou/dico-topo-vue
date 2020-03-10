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

            <v-flex grow
                    pa-1 xs6>
              <v-card class="elevation-2 place-card" v-if="!!placeItem">
                <v-toolbar card>
                  <v-toolbar-title class="text-xs-left" v-html="clean(placeItem.label)">
                  </v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-layout align-center justify-end>
                    <v-flex sm2>
                      <linking-menu
                        :geoname-id="placeItem.geoname_id"
                        :wikidata-item-id="placeItem.wikidata_item_id"
                        :wikipedia-url="placeItem.wikipedia_url"
                        :databnf-ark="placeItem.databnf_ark"
                        :viaf-id="placeItem.viaf_id"
                      >
                      </linking-menu>
                    </v-flex>
                    <v-flex sm2>
                      <v-btn :to="`/places/${placeItem.id}`" flat icon fab small>
                        <v-icon>open_in_new</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm2>
                      <export-menu :place-id="placeItem.id">
                      </export-menu>
                    </v-flex>
                  </v-layout>
                </v-toolbar>

                <v-card-text class="text-xs-left" style="min-height: 100px; max-height: 200px; overflow: auto">
                  <p v-html="clean(placeItem.description)"></p>
                </v-card-text>

                <v-expansion-panel :value="panel" v-if="!!placeItem.comment" expand>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      <div>
                        <v-icon>subject</v-icon>
                        Commentaire
                      </div>
                    </template>
                    <v-card-text style="max-height: 400px; overflow: auto">
                      <p v-html="clean(placeItem.comment)"></p>
                    </v-card-text>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content
                    v-if="!!item.items && item.items.length > 0"
                    v-for="item in items"
                    :disabled="item.items.length == 0"
                    :key="item.label"
                  >
                    <template v-slot:header>
                      <div>
                        <v-icon>{{item.action}}</v-icon>
                        {{item.label}}
                      </div>
                    </template>

                    <v-card>
                      <v-card-text style="max-height: 300px; overflow: auto">
                        <v-list >
                          <v-list-tile
                            v-for="(subItem, subItemIndex) in item.items"
                            :key="subItem.id"
                            @click=""
                          >
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <span v-html="clean(subItem.label)"></span>
                                <v-icon class="ml-2"  v-if="!!subItem.actions.goTo" small fab
                                        @click="$router.push(subItem.actions.goTo)">open_in_new
                                </v-icon>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <span v-html="clean(subItem.subLabel)"></span>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

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

export default {
  name: 'PlacePage',
  props: ['placeId'],
  components: {
    MainToolbar,
    MyAwesomeMap,
    LinkingMenu,
    ExportMenu,
    CustomFooter
  },
  data: () => {
    return {
      panel: [true, false, true, true]
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
    fetchData () {
      this.clearMapMarkers()
      this.searchMapMarker({
        query: `(id:"${this.placeId}" AND type:place)`,
        pageNumber: 1,
        pageSize: 1
      }
      ).then(r => {
        this.fetchPlaceCard(this.placeId).then(r => {
          console.log('placecard fetched', this.placeId)
        })
      })
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
          }).reverse() : []
        }
      ]
    },
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('places', ['selectedItem']),
    ...mapState('mapmarkers', { mapmarkerItems: 'items' })
  }
}
</script>

<style scoped>
  .place-card {

  }
</style>
