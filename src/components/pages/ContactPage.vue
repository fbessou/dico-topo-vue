<template>
  <default-layout>
    <section>
      <section class="head--section" >
        <v-parallax :src="require('@/assets/hero.jpeg')" height="400">
          <v-layout
            column
            align-center
            justify-center
            class="black--text"
          >

            <h1 class=" text-uppercase mt-5 mb-2 display-1 text-xs-center">Dictionnaire
                                                                           topographique<span> de la France</span></h1>
            <div class="headline  mb-3 font-weight-light">Comprenant les noms de lieux anciens et modernes</div>
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

      <section class="contact-section">
        <v-container fluid>
          <v-layout justify-center>
            <v-flex xs4>
              <section class="contact mt-5">
                <h1 class="title mt-3 mb-3">Nous contacter</h1>
                <article class="body-1">
                  <p>
                     Ce site est en cours d'évolution.
                     Si vous souhaitez faire des remarques ou désirez des informations complémentaires
                     à son sujet, vous pouvez contacter l'équipe en
                     charge du projet à l'adresse suivante : <a href="mailto:dicotopo@cths.fr?">dicotopo@cths.fr</a>
                  </p>
                </article>
              </section>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </section>
  </default-layout>
</template>

<script>
import DefaultLayout from '../DefaultLayout'
import PlaceCountInfo from '@/components/PlaceCountInfo.vue'

export default {
  name: 'ContactPage',
  components: { DefaultLayout, PlaceCountInfo }
}
</script>

<style scoped>

  .contact {
    min-height: 100vh;
    margin-top: 20% !important;
  }

  @media screen and (max-width: 760px) {
    .contact {
      min-height: unset;
      margin-top: 0% !important;
      padding: 0 30px 50px 6px;
    }
    .contact-section .flex.xs4 {
      flex-basis: 100%;
      max-width: 100%;
    }
    .contact-section .container {
      min-height: unset;
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
      font-size: 1.5em !important;
      line-height: 1.15;
      margin-top: 0 !important;
    }
    .v-application .headline {
      font-size: 1.275rem !important;
      line-height: 1.2;
    }
    .head--section  .v-btn:not(.v-btn--round).v-size--large {
      height: 38px;
      padding: 0 10px;
    }
    .head--section  .v-btn.v-size--large {
      font-size: 0.75rem;
    }
  }

</style>
