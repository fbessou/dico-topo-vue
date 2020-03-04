<template>
  <v-app>
    <main-toolbar>
    </main-toolbar>

    <v-content>
      <section class="head--section" >
        <v-parallax :src="require('@/assets/hero.jpeg')" height="250">
          <v-layout
            column
            align-center
            justify-center
            class="black--text"
          >
          </v-layout>
        </v-parallax>
      </section>

      <section>
      <v-container fluid>
          <v-layout justify-center>
            <v-flex xs4>
              <section class="mt-5">
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

      <custom-footer></custom-footer>

    </v-content>
  </v-app>
</template>

<script>
import MainToolbar from '../ui/MainToolbar'
import CustomFooter from '../ui/CustomFooter'

export default {
  name: 'ContactPage',
  components: { MainToolbar, CustomFooter }
}
</script>

<style scoped>

</style>
