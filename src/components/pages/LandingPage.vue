<template>
  <default-layout>
    <section>
      <section class="head--section">
        <v-parallax :src="require('@/assets/hero.jpeg')" height="400">
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

          <place-count-info />
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
Les données relatives à chaque lieu sont accessibles aux formats JSON API 1.0 et LinkedPlaces, grâce à une API. Elles sont librement réexploitables dans le cadre d'applications web à caractère historique, géographique ou patrimonial.
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
import PlaceCountInfo from '../PlaceCountInfo'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'LandingPage',
  components: { DefaultLayout, LandingMap, PlaceCountInfo },
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

@media screen and (max-width: 760px) {

  .v-application .head--section h1.display-1 {
    font-size: 1.5rem !important;
  }
  .v-application .head--section .v-icon.red--text.text--darken-2.landing-icon {
    font-size: 30px;
    margin-right: 8px;
  }
  .v-application .head--section .headline {
    font-size: 1.275rem !important;
    line-height: 1.15;
  }

  .v-card__title {
    padding: 12px !important;
  }
  .landing-content {
    padding-top: 0 !important;
    max-width: 100% !important;
  }
  .landing-content > .container {
    padding: 0 6px;
  }
  .landing-content .headline {
    text-align: left;
    font-size: 1.2rem !important;
    line-height: 1.15;
  }
  .landing-content > .container > .row {
    flex-direction: column !important;
  }
  .landing-map-content {
    min-width: unset;
    transform: scale(0.85) translateX(-30px);
    transform-origin: 0;
  }
  .landing-map-content #svg {
    max-width: unset !important;
  }
  .subheading.row {
    flex-direction: column;
    padding: 20px 0;
  }
  .subheading.row > .flex {
    width: 100%;
    max-width: unset;
    display: flex;
    gap: 5px;
    justify-content: center;
  }
  .subheading.row > .flex > * {
    flex: 50% 0 0;
  }
  .subheading.row > .flex > *:first-child {
    text-align: right;
  }
  .v-parallax {
    height: auto !important;
    padding: 30px 0;
    margin-top: 10px;
  }
  .v-application h1.display-1  {
    font-size: 1.25em !important;
    line-height: 1.2;
    margin-top: 0 !important;
  }
  .head--section  .v-btn:not(.v-btn--round).v-size--large {
    height: 38px;
    padding: 0 10px;
  }
  .head--section  .v-btn.v-size--large {
    font-size: 0.75rem;
  }

}

@media screen and (max-width: 500px) {
  .landing-map-content {
    height: 450px;
    transform: scale(0.60) translateX(-40px) translateY(-100px);
  }
}

</style>
