<template>
  <v-layout row class="placename-layout">
    <v-flex>
      <v-card class="placename-card" v-if="placenameItem">
        
        <v-card-title primary-title>
          <div>
            <div class="headline">{{this.placenameItem.label}}</div>
            <span class="grey--text">{{stripTags(this.placenameItem.description)}}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{stripTags(this.placenameItem.comment)}}
        </v-card-text>
  
        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.label"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.label}} <span v-if="item.items">({{item.items.length}})</span></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
      
            <v-list-tile
              v-for="(subItem, subItemIndex) in item.items"
              :key="subItem.id"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title>{{subItemIndex+1}}. {{ stripTags(subItem.label) }}</v-list-tile-title>
                <v-list-tile-sub-title>{{stripTags(subItem.labelNode)}}</v-list-tile-sub-title>
              </v-list-tile-content>
        
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
        
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'PlacenameCard',
    props: {
      placenameId: {type: String, required: true}
    },
    data: () => ({
      show: false,
    }),
    created() {
      this.fetchPlacenameCard(this.placenameId).then(r => {
        console.log("placenamecard fetched", this.placenameId)
      })
    },
    mounted() {
    
    },
    methods: {
      stripTags (str) {
        return str === null || str === undefined ? '' : str.replace(/<[^>]*>/g, '')
      },
      ...mapActions('placenameCard', ['fetchPlacenameCard']),
    },
    computed: {
      items(){
        return [
          {
            action: 'call_split',
            label: 'Formes alternatives',
            items: [
              { label: 'List Item 1' },
              { label: 'List Item 2' },
              { label: 'List Item 3' }
            ]
          },
          {
            active: true,
            action: 'history',
            label: 'Formes anciennes',
            items: this.placenameOldLabels ? this.placenameOldLabels.reverse() : []
          },
        ]
      },
      ...mapState('placenameCard', { placenameItem: 'placenameItem', placenameOldLabels: 'placenameOldLabels' }),
    },
    watch: {
      placenameId(val) {
        if (val) {
          this.fetchPlacenameCard(this.placenameId).then(r => {
            console.log("placenamecard fetched", this.placenameId)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .placename-layout {
    position: absolute;
    float: right;
    top: 20px;
    left: 64px;
    width: 30%;
    min-width: 20%;
  }
  .placename-card{
    z-index: 10000;
    height: 100%;
  }
</style>
