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
            <v-flex xs8>
              <section>
                <h1 class="font-weight-bold title mt-5 mb-3"><span class="display-3">Nous Contacter</span></h1>
                <article class="display-1">
                  <p>Ce site est en cours d'évolution. </p>
                    <p>Si vous souhaitez faire des remarques ou désirez des informations complémentaires
                    à son sujet, vous pouvez contacter l'équipe en
                    charge du projet à l'adresse :</p>
                  <a href="mailto:dicotopo@chartes.psl.eu?">dicotopo@chartes.psl.eu</a>
                </article>
              </section>
            </v-flex>
          </v-layout>
        </v-container>
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

    export default {
        name: "ContactPage",
        components: {MainToolbar, CustomFooter}
    }
</script>

<style scoped>

</style>
