<template>
  <default-layout>
    <section id="top" >
      <section class="head--section">
        <v-parallax :src="require('@/assets/hero.jpeg')" height="250">
          <v-layout column align-center justify-center class="black--text">
            <h1 class="text-uppercase mt-5 mb-2 display-1 text-xs-center">Dictionnaire topographique<span> de la France</span></h1>
            <div class="headline mb-3 font-weight-light">Présentation</div>
          </v-layout>
        </v-parallax>
      </section>
      <section class="mb-10 container">
        <v-container fluid>

          <v-tabs color="red darken-2" vertical class="tab-tabs">
            <v-tab key="aboutRoot"><a href="#top">Présentation</a></v-tab>
            <v-tab key="history"><a href="#top">Historique</a></v-tab>
            <v-tab key="contents"><a href="#top">Contenus</a></v-tab>
            <!--<v-tab key="user-guide"><a href="#top">Mode d'emploi</a></v-tab>-->

            <v-tab-item key="aboutRoot" :transition="null" :reverse-transition="null">
              <about-root-section />
            </v-tab-item>
            <v-tab-item key="history" :transition="null" :reverse-transition="null">
              <history-section />
            </v-tab-item>
            <v-tab-item key="contents" :transition="null" :reverse-transition="null">
              <contents-section />
            </v-tab-item>
          </v-tabs>
        </v-container>
      </section>
    </section>
  </default-layout>
</template>

<script>
import DefaultLayout from '../DefaultLayout'

import HistorySection from '@/components/pages/about/HistorySection'
import ContentsSection from '@/components/pages/about/ContentsSection'
import AboutRootSection from '@/components/pages/about/AboutRootSection'

export default {
  name: 'LandingPage',
  components: { DefaultLayout, HistorySection, ContentsSection, AboutRootSection }
}
</script>

<style lang="scss">
.container {
  margin-top: 20px;
  min-height: 100vh;
}
.head--section {
  background: lightgrey;
}

.tab-tabs {
  .v-window {
  max-width: 72%;
  min-width: 50%;
  margin-left: 320px;
  text-align: justify;
}

  .v-tabs-bar{
    position: fixed !important;
    width: 280px !important;
    z-index: 99 !important;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
}

</style>
