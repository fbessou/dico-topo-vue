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

          <v-layout class="subheading mb-1 font-weight-light black--text" row wrap align-center justify-center>
            <v-flex xs2 class="text-xs-center">
              <span class=" font-weight-bold">40</span><span> départements</span>
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              <span class=" font-weight-bold">492.603 </span><span> lieux</span>
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              <span class=" font-weight-bold">1.179.107 </span><span> formes anciennes</span>
            </v-flex>
          </v-layout>
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

export default {
  name: 'ContactPage',
  components: { DefaultLayout }
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
      padding: 50px 30px 100px 6px;
    }
    .contact-section .flex.xs4 {
      flex-basis: 100%;
      max-width: 100%;
    }
    .contact-section .container {
      min-height: unset;
    }
  }

</style>
