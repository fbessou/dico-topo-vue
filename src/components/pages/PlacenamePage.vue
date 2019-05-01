<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase" @click="$router.push({name: 'home'})" style="cursor: pointer">
        <span>DICTIONNAIRE</span>
        <span class="font-weight-light"> TOPONYMIQUE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn flat to="/documentation" target="_blank">
        <span class="mr-2">Documentation</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-content>
  
      <v-container grid-list-md text-xs-center>
        <v-layout  wrap>
          
          <v-flex xs12>
            <v-layout justify-start align-center>
              <v-btn  class="elevation-0 blue--text" to="/">
                <v-icon style="padding-right: 8px">chevron_left</v-icon>
                Retour
              </v-btn>
            </v-layout>
          </v-flex>
          
          <v-flex grow
                  pa-1 xs6>
            <v-card class="elevation-2" v-if="!!placenameItem">
              <v-toolbar card>
                <v-toolbar-title class="text-xs-left">
                  {{ clean(placenameItem.label) }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
    
                <v-layout align-center justify-end>
                  <v-flex sm2>
                    <linking-menu
                      :geoname-id="placenameItem.geoname_id"
                      :wikidata-item-id="placenameItem.wikidata_item_id"
                      :wikipedia-url="placenameItem.wikipedia_url"
                      :databnf-ark="placenameItem.databnf_ark"
                      :viaf-id="placenameItem.viaf_id"
                    >
                    </linking-menu>
                  </v-flex>
                  <v-flex sm2>
                    <v-btn :to="`/placenames/${placenameItem.id}`" flat icon fab small>
                      <v-icon>open_in_new</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex sm2>
                    <export-menu :placename-id="placenameItem.id">
                    </export-menu>
                  </v-flex>
                </v-layout>
              </v-toolbar>
  
  
              <v-card-text class="text-xs-left" style="min-height: 100px; max-height: 200px; overflow: auto">
                <p>{{clean(this.placenameItem.description)}}</p>
              </v-card-text>
  
              <v-expansion-panel :value="panel" expand>
                <v-expansion-panel-content :disabled="!placenameItem.comment">
                  <template v-slot:header>
                    <div>
                      <v-icon>subject</v-icon>
                      Commentaire
                    </div>
                  </template>
                  <v-card-text style="max-height: 400px; overflow: auto">
                    {{clean(this.placenameItem.comment)}}
                  </v-card-text>
                </v-expansion-panel-content>
    
                <v-expansion-panel-content
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
                      <v-list>
                        <v-list-tile
                          v-for="(subItem, subItemIndex) in item.items"
                          :key="subItem.id"
                          @click=""
                        >
                          <v-list-tile-content>
                            <v-list-tile-title>{{subItemIndex+1}}. {{ clean(subItem.label) }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{clean(subItem.labelNode)}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

            </v-card>
          </v-flex>
          
          <v-flex xs6 v-if="!!placenameItem && !!placenameItem.coordinates">
            <v-card dark color="secondary" >
              <my-awesome-map :use-heatmap="false" min-height="640px" :initial-zoom="7" :use-fly-animation="false">
              </my-awesome-map>
            </v-card>
          </v-flex>
          
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import MyAwesomeMap from '../MyAwesomeMap'
  import LinkingMenu from '../ui/LinkingMenu'
  import ExportMenu from '../ui/ExportMenu'
  import { cleanStr } from '../../utils/helpers'
  
  export default {
    name: 'PlacenamePage',
    props: ['placenameId'],
    components: {
      MyAwesomeMap,
      LinkingMenu,
      ExportMenu
    },
    data: () => {
      return {
        panel: [true, false, true, true]
      }
    },
    created() {
      this.searchMapMarker({
          query: `(id:"${this.placenameId}" AND type:placename)`,
          pageNumber: 1,
          pageSize: 1
        }
      ).then( r => {
        this.fetchPlacenameCard(this.placenameId).then(r => {
          console.log("placenamecard fetched", this.placenameId)
        })
      })
    },
    watch: {
      placenameItem() {
        if (!!this.placenameItem){
          console.log('set placename', obj)
          const obj = {
            id: this.placenameItem.id,
            coordinates: [
              parseFloat(this.placenameItem.coordinates[1].trim()),
              parseFloat(this.placenameItem.coordinates[0].trim())
            ]
          }
          this.selectPlacename(obj)
        }
      }
    },
    methods: {
      clean(str) {
        return cleanStr(str)
      },
      ...mapActions('placenames', ['selectPlacename', 'unselectPlacename']),
      ...mapActions('placenameCard', ['fetchPlacenameCard']),
      ...mapActions('mapmarkers', ['searchMapMarker']),
    },
    computed: {
      items () {
        return [
          {
            action: 'share',
            label: 'Lieux liés',
            items: this.linkedPlacenames ? this.linkedPlacenames : []
          },
          {
            action: 'call_split',
            label: 'Formes alternatives',
            items: []
          },
          {
            action: 'history',
            label: 'Formes anciennes',
            items: this.placenameOldLabels ? this.placenameOldLabels.reverse() : []
          },
        ]
      },
      ...mapState('placenameCard', ['placenameItem', 'placenameOldLabels', 'linkedPlacenames']),
      ...mapState('placenames',  ['selectedItem']),
      ...mapState('mapmarkers', { mapmarkerItems: 'items'})
    }
  }
</script>

<style scoped>

</style>
