<template>
  <default-layout>
    <section class="main-section">
        <section class="head--section" >
          <v-parallax :src="require('@/assets/hero.jpeg')" height="250">
            <v-layout
              column
              align-center
              justify-center
              class="black--text"
            >

              <h1 class=" text-uppercase mt-5 mb-2 display-1 text-xs-center">Dictionnaire
                topographique<span> de la France</span></h1>
              <div class="headline  mb-3 font-weight-light">Documentation de l'API</div>
            </v-layout>
          </v-parallax>
        </section>
          <v-container fluid class="container mb-10">
              <section >
                <header class="mb-5">
                  <h1>Documentation</h1>
                    <p class="introduction">
                      Ceci est la documentation de référence de l’API 1.0 de dicotopo.cths.fr.
                      Les exemples suivants décrivent les différents points d'accès et les principales ressources disponibles.
                    </p>
                </header>
                <article>
                  <header>
                    <h2 >Moteur de recherche</h2>
                  </header>
                  <section class="introduction">
                    <p>
                      Le moteur de recherche de Dicotopo est basé sur Elasticsearch.
                    </p>
                  </section>
                  <section class="example">
                    <h3 class="example-title">Exemples</h3>
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.search" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs>
                            <code class="json">
   {
     "data": [
       {
         "type": "place",
         "id": "P61132243",
         "attributes": {
           "place-id": "P61132243",
           "place-label": "Poizatière (La)",
           "old-labels": [
              "<dfn>Poesatiere</dfn> (<span class="sc">xviii</span><sup>e</sup> siècle)"
           ],
           "localization-insee-code": "01089",
           "commune-label": "Château-Gaillard",
           "dpt": "01",
           "canton": "Ambérieu-en-Bugey",
           "region": "Rhône-Alpes",
           "longlat": "(5.302841415929205, 45.96491654867258)",
           "descriptions": [
             "Maison isolée, commune de <a href="/places/P51612218">Château-Gaillard</a>."
           ]
         },
         "links": {
           "self": "https://dicotopo.cths.fr/api/1.0/places/P61132243"
         }
       }
     ],
     "jsonapi": {
       "version": "1.0"
     },
     "meta": {
       "total-count": 1,
       "duration": 0.0289,
       "after": null
     },
     "links": {
       "self": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200",
       "first": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1",
       "last": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1"
     }
   }
                            </code>
                          </pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section class="parameters">
                  </section>
                </article>

                <v-divider></v-divider>

                <article>
                  <header>
                    <h2>Ressources</h2>
                  </header>
                  <section class="introduction">
                    <p>
                      L'API fournit d'accéder à des ressources individuelles comme à des collections de ressources.
                      Chaque ressource est identifiée par son identifiant unique au format PXXXXXXX.
                      Les ressources exposées sont du type suivant : <b>place</b> (lieu), <b>place-old-label</b> (forme ancienne), <b>commune</b>.
                    </p>
                  </section>
                  <section class="introduction">
                    <article>
                    <header>
                      <h3>Pagination des ressources</h3>
                    </header>
                    <p>
                      La recherche ainsi que l'accès aux collections de ressource renvoient des résultats paginés.
                      L'objet "links" du résultat contient les liens de navigation permettant de se rendre sur les différentes pages du résultat.
                    </p>
                    </article>
                  </section>
                  <section class="introduction">
                    <article>
                    <header>
                      <h3>Relations entre ressources</h3>
                    </header>
                    <p>
                        Les ressources peuvent comporter des liens vers d'autres entités (ex: un <b>lieu</b> peut être <i>localisé</i> dans une <b>commune</b>)
                    </p>
                    </article>
                  </section>
                  <section class="Lieux">
                     <article>
                      <header>
                        <h3>Lieux</h3>
                      </header>
                      <section class="introduction">
                        <i>Documentation en cours de rédaction</i>
                      </section>
                  <section class="example">
                    <h3 class="example-title">Exemples</h3>
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.places" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs>
                            <code class="json">
                              {
                                "data": [
                                  {
                                    "type": "place",
                                    "id": "P61132243",
                                    "attributes": {
                                      "place-id": "P61132243",
                                      "place-label": "Poizatière (La)",
                                      "old-labels": [
                                        "<dfn>Poesatiere</dfn> (<span class="sc">xviii</span><sup>e</sup> siècle)"
                                      ],
                                      "localization-insee-code": "01089",
                                      "commune-label": "Château-Gaillard",
                                      "dpt": "01",
                                      "canton": "Ambérieu-en-Bugey",
                                      "region": "Rhône-Alpes",
                                      "longlat": "(5.302841415929205, 45.96491654867258)",
                                      "descriptions": [
                                        "Maison isolée, commune de <a href="/places/P51612218">Château-Gaillard</a>."
                                      ]
                                    },
                                    "links": {
                                      "self": "https://dicotopo.cths.fr/api/1.0/places/P61132243"
                                    }
                                  }
                                ],
                                "jsonapi": {
                                  "version": "1.0"
                                },
                                "meta": {
                                  "total-count": 1,
                                  "duration": 0.0289,
                                  "after": null
                                },
                                "links": {
                                  "self": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200",
                                  "first": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1",
                                  "last": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1"
                                }
                              }
                            </code>
                          </pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                      <section class="parameters">
                      </section>
                    </article>
                  </section>
                  <section class="Formes anciennes">
                    <article>
                      <header>
                        <h3>Formes anciennes</h3>
                      </header>
                      <section class="introduction">
                        <i>Documentation en cours de rédaction</i>
                      </section>
                  <section class="example">
                    <h3 class="example-title">Exemples</h3>
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.placeOldLabels" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs>
                            <code class="json">
                              {
                                "data": [
                                  {
                                    "type": "place",
                                    "id": "P61132243",
                                    "attributes": {
                                      "place-id": "P61132243",
                                      "place-label": "Poizatière (La)",
                                      "old-labels": [
                                        "<dfn>Poesatiere</dfn> (<span class="sc">xviii</span><sup>e</sup> siècle)"
                                      ],
                                      "localization-insee-code": "01089",
                                      "commune-label": "Château-Gaillard",
                                      "dpt": "01",
                                      "canton": "Ambérieu-en-Bugey",
                                      "region": "Rhône-Alpes",
                                      "longlat": "(5.302841415929205, 45.96491654867258)",
                                      "descriptions": [
                                        "Maison isolée, commune de <a href="/places/P51612218">Château-Gaillard</a>."
                                      ]
                                    },
                                    "links": {
                                      "self": "https://dicotopo.cths.fr/api/1.0/places/P61132243"
                                    }
                                  }
                                ],
                                "jsonapi": {
                                  "version": "1.0"
                                },
                                "meta": {
                                  "total-count": 1,
                                  "duration": 0.0289,
                                  "after": null
                                },
                                "links": {
                                  "self": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200",
                                  "first": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1",
                                  "last": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1"
                                }
                              }
                            </code>
                          </pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                      <section class="parameters">
                      </section>
                    </article>
                  </section>
                  <section class="Communes">
                    <article>
                      <header>
                        <h3>Communes</h3>
                      </header>
                      <section class="introduction">
                        <i>Documentation en cours de rédaction</i>
                      </section>
                  <section class="example">
                    <h3 class="example-title">Exemples</h3>
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.communes" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs>
                            <code class="json">
                              {
                                "data": [
                                  {
                                    "type": "place",
                                    "id": "P61132243",
                                    "attributes": {
                                      "place-id": "P61132243",
                                      "place-label": "Poizatière (La)",
                                      "old-labels": [
                                        "<dfn>Poesatiere</dfn> (<span class="sc">xviii</span><sup>e</sup> siècle)"
                                      ],
                                      "localization-insee-code": "01089",
                                      "commune-label": "Château-Gaillard",
                                      "dpt": "01",
                                      "canton": "Ambérieu-en-Bugey",
                                      "region": "Rhône-Alpes",
                                      "longlat": "(5.302841415929205, 45.96491654867258)",
                                      "descriptions": [
                                        "Maison isolée, commune de <a href="/places/P51612218">Château-Gaillard</a>."
                                      ]
                                    },
                                    "links": {
                                      "self": "https://dicotopo.cths.fr/api/1.0/places/P61132243"
                                    }
                                  }
                                ],
                                "jsonapi": {
                                  "version": "1.0"
                                },
                                "meta": {
                                  "total-count": 1,
                                  "duration": 0.0289,
                                  "after": null
                                },
                                "links": {
                                  "self": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200",
                                  "first": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1",
                                  "last": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1"
                                }
                              }
                            </code>
                          </pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                      <section class="parameters">
                      </section>
                    </article>
                  </section>
                </article>

                <v-divider></v-divider>

                 <article>
                  <header>
                    <h2>Export des données</h2>
                  </header>
                  <section class="introduction">
                    <i>Documentation en cours de rédaction</i>
                  </section>

                  <section class="Linked Place">
                    <article>
                      <header>
                        <h3>Linked Place</h3>
                      </header>
                      <section class="introduction">
                        <i>Documentation en cours de rédaction</i>
                      </section>
                  <section class="example">
                    <h3 class="example-title">Exemples</h3>
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.linkedPlaces" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs>
                            <code class="json">
                              {
                                "data": [
                                  {
                                    "type": "place",
                                    "id": "P61132243",
                                    "attributes": {
                                      "place-id": "P61132243",
                                      "place-label": "Poizatière (La)",
                                      "old-labels": [
                                        "<dfn>Poesatiere</dfn> (<span class="sc">xviii</span><sup>e</sup> siècle)"
                                      ],
                                      "localization-insee-code": "01089",
                                      "commune-label": "Château-Gaillard",
                                      "dpt": "01",
                                      "canton": "Ambérieu-en-Bugey",
                                      "region": "Rhône-Alpes",
                                      "longlat": "(5.302841415929205, 45.96491654867258)",
                                      "descriptions": [
                                        "Maison isolée, commune de <a href="/places/P51612218">Château-Gaillard</a>."
                                      ]
                                    },
                                    "links": {
                                      "self": "https://dicotopo.cths.fr/api/1.0/places/P61132243"
                                    }
                                  }
                                ],
                                "jsonapi": {
                                  "version": "1.0"
                                },
                                "meta": {
                                  "total-count": 1,
                                  "duration": 0.0289,
                                  "after": null
                                },
                                "links": {
                                  "self": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200",
                                  "first": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1",
                                  "last": "https://dicotopo.cths.fr/api/1.0/search?query=label.folded%3APoizati%C3%A8re&page%5Bsize%5D=200&page%5Bnumber%5D=1"
                                }
                              }
                            </code>
                          </pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                      <section class="parameters">
                      </section>
                    </article>
                  </section>
                </article>
              </section>
          </v-container>
    </section>
  </default-layout>
</template>

<script>
import DefaultLayout from '../DefaultLayout'
import '@/css/tomorrow.css'

export default {
  name: 'DocumentationPage',
  components: { DefaultLayout },
  data () {
    return {

    }
  },

  computed: {
    examples () {
      return {
        search: [
          { description: 'Recherche du lieu \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` },
          { description: 'Recherche de la forme ancienne \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` },
          { description: 'Tri sur le nom du lieu (croissant)', url: `${this.url_prefix}/search?query=label.folded:Poizatière&sort=place-label.keyword` },
          { description: 'Tri sur le nom du lieu (croissant)', url: `${this.url_prefix}/search?query=label.folded:Poizatière&sort=place-label.keyword` },
          { description: 'Tri sur le département puis sur le nom du lieu', url: `${this.url_prefix}/search?query=label.folded:Poizatière&sort=-place-label.keyword` },
          { description: 'Filtre sur le canton et le département', url: `${this.url_prefix}/search?query=label.folded:Poizatière&sort=-place-label.keyword` },
          { description: 'Recherche floue du lieu \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&sort=-place-label.keyword` }
        ],
        places: [
          { description: 'Accès à la ressource du lieu \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` },
          { description: 'Le lieux identifiés autour de \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` },
          { description: 'Commune d\'appartenance', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` }
        ],
        placeOldLabels: [
          { description: 'Accès à la forme ancienne \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` }
        ],
        communes: [
          { description: 'Accès à la commune de \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` },
          { description: 'Récupération des lieux localisés dans la commune', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` }
        ],
        linkedPlaces: [
          { description: 'Export du lieu \'Poizatière\'', url: `${this.url_prefix}/search?query=label.folded:Poizatière&page[size]=200` },
          { description: 'Export d\'une collection', url: `${this.url_prefix}/search?query=label.folded:Poizatière&sort=place-label.keyword` }
        ]
      }
    },
    url_prefix () {
      return 'http://localhost:5003/api/1.0'
    }
  }
}
</script>

<style scoped lang="scss">
  .main-section {
    margin-bottom: 120px;
  }
  .container {
    text-align: justify;
    width: 66%;
    margin: 0 auto;
    padding-top: 60px;
  }
  .head--section {
    background: lightgrey;
  }
  article {
    margin: 12px 0;
  }
  .example-title {
    text-decoration: underline;
    font-weight: normal;
    font-size: 1.1em;
  }
  h1 {
    font-size: 2em;
    margin: 14px 0 20px;
  }
  h2 {
    margin: 12px 0;
  }
  h3 {
    margin: 10px 0;
  }
  .example {
    margin-bottom: 30px;
  }
  .v-application code {
    all: unset;
  }
  .method {
    padding: 0;
  }
  .url {
    padding: 0 16px;
  }
  .description {
    margin-bottom: 6px;
  }
  .v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
    flex: none;
  }
  .v-expansion-panel-content {
    overflow: scroll !important;
  }
  .v-divider {
    margin: 10px 0;
  }
</style>
