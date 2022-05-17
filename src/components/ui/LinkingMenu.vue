<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="475"
      offset-x
    >
      <template v-slot:activator="{ on }">

        <v-btn
          flat fab small
          v-on="on"
          :disabled="!geonameId && !wikipediaUrl && !wikidataItemId && !viafId && !databnfArk && !inhaId"
        >
         <v-icon>link</v-icon> {{title}}
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile >
            <v-list-tile-content>
              <v-list-tile-title>Liage des données</v-list-tile-title>
              <v-list-tile-sub-title>Liens vers les référentiels de données externes</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile v-if="geonameId">
            <v-list-tile-content>
              <v-list-tile-title>
               <a :href="`http://www.geonames.org/${geonameId}`" target="_blank">GeoNames</a>
                <v-chip small label class="ref-chip">{{geonameId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'entrée du lieu identifié dans la base de données géographique GeoNames</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="wikipediaUrl">
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="wikipediaUrl" target="_blank">Wikipedia</a>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'article Wikipedia concernant le lieu identifié</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="wikidataItemId">
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="`https://www.wikidata.org/wiki/${wikidataItemId}`" target="_blank">Wikidata</a>
                <v-chip small label class="ref-chip">{{wikidataItemId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'objet Wikidata concernant le lieu identifié</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="databnfArk">
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="`https://data.bnf.fr/${databnfArk}`" target="_blank">data.bnf.fr</a>
                <v-chip small label class="ref-chip">{{databnfArk}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'objet concernant le lieu identifié dans la référentiel data.bnf.fr</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="viafId">
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="`https://viaf.org/viaf/${viafId}`" target="_blank">VIAF</a>
                <v-chip small label class="ref-chip">{{viafId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'objet concernant le lieu identifié dans la base de données du VIAF (Fichier
                                     d'autorité international virtuel)</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="inhaId">
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="`https://agorha.inha.fr/recherche?terms=concept_lieu:%22${inhaId}%22`" target="_blank">Agorha</a>
                <v-chip small label class="ref-chip">{{inhaId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'objet concernant le lieu identifié sur Agorha</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="osmId">
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="`https://www.openstreetmap.org/relation/${osmId}`" target="_blank">OpenStreetMap</a>
                <v-chip small label class="ref-chip">{{osmId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>Lien vers l'objet concernant le lieu identifié sur OpenStreetMap</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'LinkingMenu',
  props: {
    title: { type: String },
    geonameId: { type: String },
    wikipediaUrl: { type: String },
    wikidataItemId: { type: String },
    databnfArk: { type: String },
    viafId: { type: String },
    inhaId: { type: String },
    osmId: { type: String }
  },
  data: () => ({
    menu: false
  })
}
</script>

<style scoped>
  .ref-chip {
    margin-left: 12px;
  }
</style>
