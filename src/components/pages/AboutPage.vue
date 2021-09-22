<template>
  <default-layout>
    <section id="top" >
      <section class="head--section">
        <v-parallax :src="require('@/assets/hero.jpeg')" height="300">
          <v-layout column align-center justify-center class="black--text">
            <h1 class="text-uppercase mt-5 mb-2 display-1 text-xs-center">Dictionnaire topographique<span> de la France</span></h1>
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
        </v-parallax>
      </section>
      <a href="#" @click="toggleMenu($event)" class="toggle-menu-btn">Menu</a>
      <section class="mb-10 container">
        <v-container fluid  class="tab-tabs-parent">

          <v-tabs color="red darken-2" vertical class="tab-tabs" :class="menuCsscClass">
            <v-tab  @click.native="scrollToTop" key="presentation"><a href="#">Présentation</a></v-tab><!-- OK -->
            <v-tab  @click.native="scrollToTop" key="history"><a href="#">L’entreprise éditoriale</a></v-tab><!-- OK -->
            <v-tab  @click.native="scrollToTop" key="project"><a href="#">Le projet numérique</a></v-tab>
            <v-tab  @click.native="scrollToTop" key="contents"><a href="#">Contenus</a></v-tab>
            <v-tab  @click.native="scrollToTop" key="user-guide"><a href="#">Mode d'emploi</a></v-tab>
            <v-tab  @click.native="scrollToTop" key="credits"><a href="#">Crédits</a></v-tab>

            <v-tab-item key="presentation" eager :transition="null" :reverse-transition="null">
              <presentation-section />
            </v-tab-item>
            <v-tab-item key="history" eager :transition="null" :reverse-transition="null">
              <history-section />
            </v-tab-item>
            <v-tab-item key="project" eager :transition="null" :reverse-transition="null">
              <project-section />
            </v-tab-item>
            <v-tab-item key="contents" eager :transition="null" :reverse-transition="null">
              <contents-section />
            </v-tab-item>
            <v-tab-item key="user-guide" eager :transition="null" :reverse-transition="null">
              <user-guide-section />
            </v-tab-item>
            <v-tab-item key="credits" eager :transition="null" :reverse-transition="null">
              <credits-section />
            </v-tab-item>
          </v-tabs>
        </v-container>
      </section>
    </section>
  </default-layout>
</template>

<script>
import DefaultLayout from '../DefaultLayout'

import PresentationSection from '@/components/pages/about/PresentationSection'
import HistorySection from '@/components/pages/about/HistorySection'
import ProjectSection from '@/components/pages/about/ProjectSection'
import ContentsSection from '@/components/pages/about/ContentsSection'
import UserGuideSection from '@/components/pages/about/UserGuideSection'
import CreditsSection from '@/components/pages/about/CreditsSection'

export default {
  name: 'LandingPage',
  components: { DefaultLayout, PresentationSection, HistorySection, ProjectSection, ContentsSection, UserGuideSection, CreditsSection },
  data () {
    return {
      isMenuOpened: false
    }
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    toggleMenu ($event) {
      $event.preventDefault()
      $event.stopImmediatePropagation()
      this.isMenuOpened = !this.isMenuOpened
    },
    closeMenu () {
      this.isMenuOpened = false
    }
  },
  computed: {
    menuCsscClass () {
      return this.isMenuOpened ? 'opened' : ''
    }
  },
  mounted () {
    document.body.addEventListener('click', this.closeMenu)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.closeMenu)
  }
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
.sc {
  font-variant: small-caps;
}

section {
  margin-bottom: 20px;
}

.tab-tabs {
  .v-window {
    max-width: 66%;
    min-width: 50%;
    margin-left: 320px;
    text-align: justify;
  }

  ul{
    padding-top: 0px;
    padding-left: 30px;
    padding-bottom: 12px;
  }

  code{
    background-color: #F1F1F1;
    color: inherit;
  }

  .v-tabs-bar{
    position: fixed !important;
    width: 260px !important;
    z-index: 99 !important;

    a {
      text-decoration: none;
      color: inherit;
    }
    .v-tab {
      justify-content: flex-end;
    }
  }
}

.toggle-menu-btn {
  display: none;
}

@media screen and (max-width: 760px) {
  .head--section {
    padding-bottom: 25px;
  }
  section.mb-10.container {
    margin-top: 0;
    padding-top: 0;
  }

  .toggle-menu-btn {
    display: inline-block;
    padding-left:26px;
    text-decoration: none;
    text-transform: uppercase;
    color:#D32F2F !important;
  }
  .tab-tabs-parent {
    margin-top: 0;
    .tab-tabs {
      flex-direction: column;
      .v-tabs-bar {
        position: absolute !important;
        transform: translateX(-110%);
        z-index: 1 !important;
        height: 100%;
        background-color: rgba(255,255,255,0.95);
      }
      .v-window {
        margin-left: 0;
        max-width: 100%;

        h1 {
          text-align: left;
        }
      }
    }
    .tab-tabs.opened .v-tabs-bar {
      transform: translateX(0%);
      border-right: 1px solid #ccc;
    }
  }
}

</style>
