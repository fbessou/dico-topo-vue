<template>
  <v-app>
    <main-toolbar>
    </main-toolbar>

    <v-content >
      <section class="head--section">
        <v-parallax :src="require('@/assets/hero.jpeg')" height="450">

          <v-layout
            column
            align-center
            justify-center
            class="black--text"
          >

            <h1 class=" text-uppercase mt-5 mb-2 display-1 text-xs-center">Dictionnaire
                                                                           topographique<span> de la France</span></h1>
            <div class="headline  mb-3 font-weight-light">Comprenant les noms de lieux anciens et modernes</div>
            <v-btn
              class="red darken-2 mt-5"
              dark
              large
              @click="$router.push({name: 'about'})"

            >
              En savoir plus
            </v-btn>
          </v-layout>

          <v-layout class="subheading mb-1 font-weight-light black--text" row wrap align-center justify-center>
            <v-flex xs2 class="text-xs-center">
              <span class=" font-weight-bold">29</span> départements
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              <span class=" font-weight-bold">370.774 </span> lieux
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              <span class=" font-weight-bold">908.347 </span> toponymes
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
                      <div class="headline text-xs-center">Un outil pour la toponymie et l’histoire</div>
                    </v-card-title>
                    <v-card-text>
                      Le <i>Dictionnaire topographique de la France</i>, publié depuis le XIX<sup>e</sup> siècle
                      sous forme de volumes départementaux, constitue un instrument indispensable à la connaissance
                      des noms de lieux et des territoires anciens et modernes.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-2">map</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Des données numériques enrichies</div>
                    </v-card-title>
                    <v-card-text>
                      La publication électronique du Dictionnaire permet d’en enrichir les données, d’en faciliter
                      la consultation et d’offrir des possibilités d’interrogation et d’exploitation démultipliées :
                      visualisation cartographique, repérage d’un type d’objet topographique, liage vers des bases
                      de connaissances, etc.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-2">search</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Perspectives</div>
                    </v-card-title>
                    <v-card-text>
                      Couvrant actuellement 29 départements, cet outil a vocation à étendre son périmètre géographique
                      comme à développer encore ses possibilités d’exploitation des données, en partenariat avec
                      d’autres projets.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section style="height: 800px">
        <v-layout column align-center justify-center>
          <landing-map>
          </landing-map>
        </v-layout>
      </section>

      <section class="foot--section mt-5">
        <custom-footer></custom-footer>
      </section>

    </v-content>
  </v-app>
</template>

<script>
import MainToolbar from '../ui/MainToolbar'
import CustomFooter from '../ui/CustomFooter'
import LandingMap from '../LandingMap'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'LandingPage',
  components: { MainToolbar, LandingMap, CustomFooter },
  watch: {
    /*
      query() {
        if (!!this.query) {
          this.goToMainPage();
        }
      },
      groupbyPlacename(){
        if (!!this.query) {
          this.goToMainPage();
        }
      }
      */
  },
  methods: {
    ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlacename'])
  },
  computed: {
    ...mapState('searchParameters', ['groupbyPlacename']),
    ...mapGetters('searchParameters', ['query'])
  }
}
</script>

<style>
  .foot--section {
    background: lightgrey;
  }
  .head--section {
    background: lightgrey;
  }
</style>
