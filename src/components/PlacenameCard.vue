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
        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn flat color="purple">Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        
        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
            add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            escape.
          </v-card-text>
        </v-slide-y-transition>
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
      show: false
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
        return str === undefined || str.length === 0 ? '' : str.replace(/<[^>]*>/g, '')
      },
      ...mapActions('placenameCard', ['fetchPlacenameCard']),
    },
    computed: {
      ...mapState('placenameCard', { placenameItem: 'placenameItem' }),
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
