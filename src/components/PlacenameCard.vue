<template>
  <v-layout row wrap class="placename-layout">
    <v-flex>
      <v-card class="placename-card elevation-3" v-if="placenameItem">
   
        <v-toolbar card>
          <v-toolbar-title>{{placenameItem.label}}
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-layout align-center justify-end grow>
            <v-flex sm2 class="">
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
  
        <v-card-text style="min-height: 100px; max-height: 200px; overflow: auto">
          <p >{{cleanStr(this.placenameItem.description)}}</p>
        </v-card-text>
  
        <v-expansion-panel :value="panel">
          <v-expansion-panel-content :disabled="!placenameItem.comment">
            <template v-slot:header>
              <div>
                <v-icon>subject</v-icon>
                Commentaire
              </div>
            </template>
            <v-card-text style="max-height: 400px; overflow: auto">
              {{cleanStr(this.placenameItem.comment)}}
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
                      <v-list-tile-title>{{subItemIndex+1}}. {{ cleanStr(subItem.label) }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{cleanStr(subItem.labelNode)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        
        
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  import { mapActions, mapState } from 'vuex'
  import LinkingMenu from './ui/LinkingMenu'
  import ExportMenu from './ui/ExportMenu'

  export default {
    name: 'PlacenameCard',
    components: { LinkingMenu, ExportMenu },
    props: {
    
    },
    data: () => {
      return {
        show: true,
        panel: [false, false, false]
      }
    },
    created() {
      if (!!this.selectedPlacename) {
        this.fetchPlacenameCard(this.selectedPlacename.id).then(r => {
          console.log("placenamecard fetched", this.selectedPlacename.id)
        })
      }
    },
    mounted() {
    
    },
    methods: {
      capitalizeFirstLetter (str) {
        return str === null || str === undefined ? '' : str.charAt(0).toUpperCase() + str.slice(1)
      },
      cleanStr (str) {
        return str === null || str === undefined ? '' : this.capitalizeFirstLetter(str.replace(/<[^>]*>/g, '').trim())
      },
      ...mapActions('placenameCard', ['fetchPlacenameCard']),
    },
    computed: {
      items(){
        return [
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
      ...mapState('placenameCard', { placenameItem: 'placenameItem', placenameOldLabels: 'placenameOldLabels' }),
      ...mapState('placenames', { selectedPlacename: 'selectedItem'})
    },
    watch: {
      selectedPlacename(val) {
        if (!!val) {
          this.fetchPlacenameCard(this.selectedPlacename.id).then(r => {
            console.log("placenamecard fetched", this.selectedPlacename.id)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .placename-layout {
    position: fixed;
    float: right;
    top: 88px;
    left: 64px;
    width: 33%;
    min-width: 20%;
  }
  .placename-card{
    z-index: 10000;
    height: 100%;
  }
</style>
