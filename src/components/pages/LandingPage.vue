<template>
  <default-layout>
    <section>
      <section class="head--section">
        <v-parallax :src="require('@/assets/hero.jpeg')" height="450">
          <v-layout column align-center justify-center class="black--text">
            <h1 class=" text-uppercase mt-5 mb-2 display-1 text-xs-center">
              Dictionnaire topographique<span> de la France</span>
            </h1>
            <div class="headline  mb-3 font-weight-light">
              Comprenant les noms de lieux anciens et modernes
            </div>
            <div>
              <v-btn
                class="red darken-2 mt-5"
                dark
                large
                @click="$router.push({ name: 'about' })"
              >
                En savoir plus
              </v-btn>
              <v-btn
                class="red darken-2 mt-5 ml-5"
                dark
                large
                @click="$router.push({ name: 'home' })"
              >
                Commencer
              </v-btn>
            </div>
          </v-layout>

          <v-layout
            class="subheading mb-1 font-weight-light black--text"
            row
            wrap
            align-center
            justify-center
          >
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

      <section class="landing-content">
                <v-container >
                <v-row mt-5 mb-5 >
                  <v-col>
                  <v-card class="elevation-0 transparent presentation-left">
                    <v-card-title primary-title class="layout">
                      <v-icon x-large class="red--text text--darken-2 landing-icon">
                        search
                      </v-icon>
                      <div class="headline  text-xs-center">

                        Un outil pour la toponymie et l’histoire
                      </div>
                    </v-card-title>
                    <v-card-text>
 Le Dictionnaire topographique de la France recense les noms de lieux attestés sur le territoire français ainsi que les formes anciennes (latines et autres) qu’ils ont revêtues au cours des siècles. Il réunit en une base de données unique l’ensemble des dictionnaires départementaux publiés depuis le XIXe siècle ou demeurés inédits.
                    </v-card-text>
                  </v-card>
                  <v-card class="elevation-0 transparent  presentation-right">
                    <v-card-title primary-title class="layout">
                      <v-icon x-large class="red--text text--darken-2 landing-icon"
                        >place</v-icon
                      >
                      <div class="headline text-xs-center">
                         Un référentiel géohistorique</div>
                    </v-card-title>
                    <v-card-text>
Les données relatives à chaque lieu sont accessibles aux formats GeoJSON et LinkedPlaces, grâce à une API. Elles sont librement réexploitables dans le cadre d'applications web à caractère historique, géographique ou patrimonial.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col :md="7" :sm="12">
                  <div class="landing-map-content">
                    <landing-map> </landing-map>
                  </div>
                </v-col >
                </v-row>
                </v-container>
      </section>

    </section>
  </default-layout>
</template>

<script>
import DefaultLayout from '../DefaultLayout'
import LandingMap from '../LandingMap'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'LandingPage',
  components: { DefaultLayout, LandingMap },
  watch: {

  },
  methods: {
    ...mapActions('searchParameters', ['setTerm', 'setGroupbyPlace'])
  },
  computed: {
    ...mapState('searchParameters', ['groupbyPlace']),
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
.landing-content {
  padding-top: 60px;
  min-height: 800px;
  max-width: 80%;
  margin: 0 auto;
  text-align: justify;
}
.landing-map-content {
  padding-top: 15px;
  min-width: 700px;
}

.headline {
  word-break: break-word;
}
.landing-icon {
  margin-right: 14px;
}
</style>
