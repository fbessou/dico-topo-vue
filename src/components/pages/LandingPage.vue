<template>
  <v-app>
    <main-toolbar>

    </main-toolbar>
    
    <v-content>
      
      <section class="head--section">
        <v-parallax :src="require('@/assets/hero.jpeg')" height="450">
  
        <v-layout
            column
            align-center
            justify-center
            class="black--text"
          >
  
            <h1 class=" text-uppercase mt-5 mb-2 display-1 text-xs-center">Dictionnaire topographique<span > de la France</span></h1>
            <div class="headline  mb-3 font-weight-light">Comprenant les noms de lieux anciens et modernes</div>
            <v-btn
              class="red darken-2 mt-5"
              dark
              large
              @click="$router.push({name: 'home'})"
            >
              Consulter
            </v-btn>
  
        
          </v-layout>
          
          <v-layout class="subheading mb-1 font-weight-light black--text" row wrap align-center justify-center>
                <v-flex xs2 class="text-xs-center">
                  <span class=" font-weight-bold">13.485</span> pages de dictionnaire
                </v-flex>
                <v-flex xs2 class="text-xs-center">
                  <span class=" font-weight-bold">839.121</span> toponymes identifiés
                </v-flex>
                <v-flex xs2 class="text-xs-center">
                  <span class=" font-weight-bold">234.340</span> toponymes localisés
                </v-flex>
           </v-layout>
        </v-parallax>
      </section>
      
      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >

          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-2">place</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Material Design</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-2">map</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-2">search</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Completely Open Sourced</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      
      <section>
       
          <v-layout column align-center justify-center>

            <!-- Carte des lieux couverts -->
            <div id="map"></div>
            <!-- require('https://d3js.org/d3.v5.min.js') -->
            <!-- require('@/components/js/landingMap.js') -->
            <!-- require('@/components/css/colorbrewer.css') -->
            <!-- require('@/components/css/landingMap.css') -->

            <em>Ce site est activement en cours de développement</em>
            <v-btn
              class="red darken-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              En savoir plus
            </v-btn>
          </v-layout>
       
      </section>
      
      <section class="foot--section">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">A l'origine du projet</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Nous contacter</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--darken-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--darken-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Paris, France</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--darken-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>john@doe.fr</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>


    </v-content>
  </v-app>
</template>

<script>
  import MainToolbar from '../ui/MainToolbar'
  
  export default {
    name: 'LandingPage',
    components: { MainToolbar }
  }
</script>

<style scoped>
  .head--section {
    background: lightgrey;
  }
  .foot--section {
    margin-top: 80px;
    background-color: lightgrey;
  }
</style>
