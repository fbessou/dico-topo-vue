<template>
  <default-layout>
    <section class="main-section" id="top">
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
        <v-app-bar-nav-icon @click="toggleMenu($event)" class="toggle-menu-btn"></v-app-bar-nav-icon>
        <div class="doc-container">
          <section class="toc" :class="menuCsscClass">
            <ol class="v-tabs theme--light">
                <li class="v-tab level1"  @click="goTo($event, '#json-api')">API JSON</li>
                <li class="v-tab level2"  @click="goTo($event, '#pagination')">Pagination</li>
                <li class="v-tab level2"  @click="goTo($event, '#compound-documents')">Compound Documents</li>
                <li class="v-tab level2"  @click="goTo($event, '#sparse-fieldsets')">Sparse Fieldsets</li>
                <li class="v-tab level2"  @click="goTo($event, '#specific-implementations')">Implémentations spécifiques</li>
                <v-divider></v-divider>
                <li class="v-tab level1"  @click="goTo($event, '#ressources')">Ressources exposées</li>
                <li class="v-tab level2"  @click="goTo($event, '#place')">Lieu</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-description')">Description et commentaire</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-feature-type')">Types du lieu</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-old-labels')">Formes anciennes</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-localization')">Localisation</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-geolocation')">Géolocalisation</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-linked-places')">Lieux liés</li>
                <li class="v-tab level3"  @click="goTo($event, '#place-linking')">Autres référentiels</li>
                <li class="v-tab level2"  @click="goTo($event, '#old-label')">Forme ancienne </li>
                <v-divider></v-divider>
                <li class="v-tab level1"  @click="goTo($event, '#reference')">Cadre de référence</li>
                <li class="v-tab level2"  @click="goTo($event, '#commune')">Commune</li>
                <li class="v-tab level3"  @click="goTo($event, '#commune-linking')">Liage des communes</li>
                <li class="v-tab level2"  @click="goTo($event, '#administrative-hierarchy')">Hiérarchie administrative</li>
                <li class="v-tab level2"  @click="goTo($event, '#groupings')">Regroupement des lieux</li>
                <v-divider></v-divider>
                <li class="v-tab level1"  @click="goTo($event, '#search')">API de recherche</li>
                <li class="v-tab level2"  @click="goTo($event, '#placenames-search')">Rechercher des noms de lieux</li>
                <li class="v-tab level2"  @click="goTo($event, '#search-response-format')">Format de réponse et façades</li>
                <li class="v-tab level2"  @click="goTo($event, '#search-syntax')">Syntaxe des requêtes</li>
                <li class="v-tab level3"  @click="goTo($event, '#search-pagination')">Pagination</li>
                <li class="v-tab level3"  @click="goTo($event, '#search-char-processing')">Chaînes de caractères</li>
                <li class="v-tab level3"  @click="goTo($event, '#search-wildcard-query')">Wildcard query</li>
                <li class="v-tab level3"  @click="goTo($event, '#search-fuzzy')">Recherche floue</li>
                <li class="v-tab level3"  @click="goTo($event, '#search-filters')">Filtres et tris</li>
                <v-divider></v-divider>
                <li class="v-tab level1"  @click="goTo($event, '#exports')">Export des données</li>
                <li class="v-tab level3"  @click="goTo($event, '#linked-places')">Linked Place</li>
            </ol>
          </section>
          <section class="doc mb-10">
                <header class="mb-5">
                  <h1>Documentation</h1>
                  <p class="introduction">
                    Documentation de référence de l’API 1.0 de dicotopo.cths.fr.<br>
                    Cette documentation est conçue comme une aide pour la récupération des données (ressources et relations) et met l’accent sur les requêtes <code>GET</code>.<br>
                  </p>
                </header>
                <article id="json-api">
                  <header>
                    <h2>JSON:API 1.0</h2>
                  </header>
                  <section class="introduction">
                    <p>
                      Les ressources sont renvoyées suivant le standard <a href="https://jsonapi.org/format/" target="_blank">JSON:API 1.0</a>.<br>
                      Les fonctionnalités optionnelles de JSON:API 1.0 ne sont pas toutes implémentées.
                    </p>
                  </section>
                  <section id="pagination">
                    <header>
                      <h3>Pagination</h3>
                    </header>
                    <p>
                      La recherche ainsi que l’accès aux collections de ressources renvoient des résultats <a href="https://jsonapi.org/format/1.0/#fetching-pagination" target="_blank">paginés</a>.<br>
                      L’objet <code>links</code> contient les liens de navigation permettant de se rendre sur les différentes pages du résultat (<code>first</code>, <code>last</code>, <code>prev</code>, <code>next</code>).
                    </p>
                  </section>
                  <section id="compound-documents">
                    <header>
                      <h3>Compound Documents</h3>
                    </header>
                    <p>
                      <a href="https://jsonapi.org/format/1.0/#document-compound-documents" target="_blank">Compound Documents</a> (documents composites) : le paramètre de requête <a href="https://jsonapi.org/format/#fetching-includes" target="_blank"><code>include</code></a> permet d’inclure dans la réponse des ressources reliées à la source primaire. Les ressources sont incluses dans le tableau de premier niveau <code>included</code>.
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.compoundDocuments1" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.compoundDocuments1"><code class="json">{{results.compoundDocuments1[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section>
                    <p>
                      Des ressources reliées peuvent être incluses à partir du <i>endpoint</i> de la relation :
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.compoundDocuments2" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.compoundDocuments2"><code class="json">{{results.compoundDocuments2[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section>
                    <p>
                      Plusieurs ressources reliées peuvent être appelées dans une liste de valeurs séparées par une virgule :
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.compoundDocuments3" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.compoundDocuments3"><code class="json">{{results.compoundDocuments3[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section>
                    <p>
                      Ces inclusions ne sont implémentées que sur un niveau : il est possible d’inclure des ressources reliées, mais pas les ressources reliées à ces dernières.
                      Par exemple, pour un <code>lieu</code>, il est possible d’inclure sa commune de localisation, mais pas d’inclure dans le même document composite le canton reliée à cette commune de localisation :
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.compoundDocuments4" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.compoundDocuments4"><code class="json">{{results.compoundDocuments4[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="sparse-fieldsets">
                    <header>
                      <h3>Sparse Fieldsets</h3>
                    </header>
                    <p>
                      Les <a href="https://jsonapi.org/format/1.0/#fetching-sparse-fieldsets" target="_blank">Sparse Fieldsets</a> ne sont pas implémentés : pour une ressource, l’API DicoTopo ne permet pas de retourner les seuls attributs spécifiés. Par exemple, pour une ressource de type <code>commune</code>, il est impossible de retourner ses seules coordonnées (attribut <code>longlat</code>).
                    </p>
                  </section>
                  <section id="specific-implementations">
                    <header>
                      <h3>Implémentations spécifiques</h3>
                    </header>
                    <h4 id="without-relationships">Paramètre de requête <code>without-relationships</code></h4>
                    <p>
                      Les <em>endpoints</em> de l’API DicoTopo implémentent le paramètre de requête <code>without-relationships</code> pour exclure de la réponse les relations des ressources requêtées. Dans le cas de collections volumineuses, la réponse s’en trouve allégée et plus lisible.
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.withoutRelationships" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.withoutRelationships"><code class="json">{{results.withoutRelationships[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="facades">
                    <h4>Façades</h4>
                    <p>
                      Pour simplifier l’utilisation de l’API, notamment pour réduire le nombre des requêtes utiles à certaines fonctionnalités de l’application DicoTopo, des façades ont été définies. Elles peuvent compenser dans dans certains cas l’absence des <em>Sparse Fieldsets</em>.
                    </p>
                    <p>
                      Les façades ne sont pas toutes documentées ici. Nous listons celles qui peuvent simplifier le recours à l’API pour des requêtes définies.
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.facades" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.facades"><code class="json">{{results.facades[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                </article>

                <v-divider></v-divider>

                <article id="ressources">
                  <header>
                    <h2>Principales ressources exposées</h2>
                  </header>
                  <section class="introduction">
                      <p>
                        Les ressources principales exposées sont du type suivant :
                      </p>
                      <ul>
                        <li><code>place</code> : un <code>lieu</code></li>
                        <li><code>place-old-label</code> : une <code>forme ancienne</code> (un nom ancien attesté du <code>lieu</code>)</li>
                        <li><code>commune</code> : une <code>commune</code> du Code officiel géographique 2011 de l’INSEE (<a href="https://www.insee.fr/fr/information/2560625" target="_blank">COG 2011</a>)</li>
                      </ul>
                  </section>
                  <section id="place">
                    <header>
                      <h3>Lieu : <code>place</code></h3>
                    </header>
                    <p>
                      La ressource de type <code>place</code> (un <code>lieu</code>) a été définie en référence à la classe
                      <a href="https://pleiades.stoa.org/help/conceptual-overview" target="_blank"><code>places</code></a> de
                      <a href="https://pleiades.stoa.org/" target="_blank">Pleiades</a> : &quot;le terme <em>lieu</em> s&#39;applique à tout
                      lieu d’attention humaine, matériel ou intellectuel, dans un contexte géographique réel.&quot;
                    </p>
                    <p>
                      Un <code>lieu</code> se caractérise par la mise en relation entre des noms de ce <code>lieu</code> et une localisation.<br>
                      Un <code>lieu</code> est identifié par son <code>id</code> au format <code>P00000000</code> : les 8 premiers chiffres sont attribués aléatoirement, le 9<sup>e</sup> est une clé de contrôle.<br>
                      Un <code>lieu</code> a les attributs suivants :
                    </p>
                    <ul>
                      <li><code>label</code> : label principal (vedette de l’article du <i>Dictionnaire</i> imprimé, "nom préféré" – <a href="https://www.w3.org/TR/skos-reference/#labels" target="_blank"><code>skos:prefLabel</code></a>)</li>
                      <li><code>country</code> : code à deux lettres (<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2" target="_blank">ISO 3166-1 alpha-2</a>) du pays d’appartenance (toujours <code>FR</code> pour le DT)</li>
                      <li><code>dpt</code> : code département du <a href="https://www.insee.fr/fr/information/2560625#titre-bloc-26" target="_blank">COG 2011</a></li>
                      <li><code>localization-insee-code</code> : code commune du <a href="https://www.insee.fr/fr/information/2560625#titre-bloc-26" target="_blank">COG 2011</a> de la <code>commune</code> de localisation</li>
                      <li><code>localization-commune-relation-type</code> : type de la relation entre le <code>lieu</code> et sa <code>commune</code> de localisation, caractérisé grâce à un vocabulaire existant (v. <span class="span-a" @click="goTo($event, '#place-localization')">localisation</span>).</li>
                      <li><code>geoname-id</code>, <code>wikidata-item-id</code>, <code>wikipedia-url</code>, <code>databnf-ark</code>, <code>viaf-id</code>, <code>siaf-id</code>, <code>osm-id</code> : liages (v. <span class="span-a" @click="goTo($event, '#commune')"><code>commune</code></span>). Seuls les lieux correspondants à une commune (v. <span class="span-a" @click="goTo($event, '#place-localization')">localisation</span>) sont liés.</li>
                    </ul>
                  </section>
                  <section id="place-description">
                    <h4>Description et commentaire</h4>
                    <p>
                      La description et le commentaire imprimés dans le <em>Dictionnaire topographique</em> sont accessibles grâce aux relations <code>descriptions</code> et <code>comments</code>. L’attribut <code>content</code> des ressources de type <code>place-description</code> et <code>place-comment</code> ainsi accessibles est formaté en HTML5.
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.placeDesc" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.placeDesc"><code class="json">{{results.placeDesc[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="place-feature-type">
                    <h4>Types du lieu</h4>
                    <p>
                      Un <code>lieu</code> peut être d’un ou plusieurs types (<em>feature type</em>) : chef-lieu, mairie, moulin, etc.<br>La relation <code>place-feature-types</code> permet d’accéder à la collection des ressources de type <code>place-feature-type</code> associées au <code>lieu</code>.
                    </p>
                    <p>
                      Les termes sont ceux imprimés dans le <em>Dictionnaire topographique</em>, ils ne sont pas normalisés : il n’existe pas de thesaurus des termes employés. En l’état de la donnée, un type de lieu n’est donc pas une clé de regroupement pertinente.
                    </p>
                    <p>
                      NB. La standardisation des types de lieu et la définition d’un thésaurus sont à entreprendre.
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.featureTypes" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.featureTypes"><code class="json">{{results.featureTypes[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="place-old-labels">
                    <h4>Formes anciennes</h4>
                    <p>
                      Un <code>lieu</code> peut avoir une ou plusieurs formes anciennes documentées.<br>La relation <code>old-labels</code> permet d’accéder à la collection des ressources de type <span class="span-a" @click="goTo($event, '#old-label')"><code>place-old-label</code></span> associées au <code>lieu</code>.
                    </p>
                  </section>
                  <section class="example">
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
                          <pre v-highlightjs v-if="results.placeOldLabels"><code class="json">{{results.placeOldLabels[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="place-localization">
                    <h4>Localisation</h4>
                    <p>
                      Les attributs <code>country</code> (<code>FR</code>) et <code>dpt</code> (code département du COG 2011) permettent d’identifier facilement le pays et le département du <code>lieu</code>.<br>
                      Pour affiner cette localisation par défaut, chaque <code>lieu</code> a été lié à sa <code>commune</code> grâce à l’attribut <code>localization-insee-code</code> (code commune du COG 2011).
                    </p>
                    <p>
                      Par ex., pour le <code>lieu</code> <a href="https://dicotopo.cths.fr/api/1.0/places/P09135983"><code>PP09135983</code></a> (Aulnois), la commune de  localisation est identifiée par le code commune <code>02196</code>. La ressource de type <span class="span-a" @click="goTo($event, '#commune')"><code>commune</code></span> correspondante permet d’accéder aux données de localisation complémentaires telle que la hiérarchie administrative : région &gt; département &gt; arrondissement &gt; canton.
                    </p>
                    <p>
                      Pour inclure cette <code>commune</code> de localisation au <code>lieu</code>, la logique diffère selon que le <code>lieu</code> (1) <strong>correspond</strong> à la <code>commune</code> OU (2) <strong>dépend</strong> de cette <code>commune</code> :
                    </p>
                    <ol>
                      <li>Le <code>lieu</code> correspond à la <code>commune</code> (<em><a href="https://jsonapi.org/format/1.0/#document-resource-object-linkage">resource linkage</a></em> de la relation <code>commune</code> non <code>null</code>) : la commune de localisation (et ses coordonnées) est accessible grâce à la relation <code>commune</code>.</li>
                      <li>Le <code>lieu</code> dépend de la <code>commune</code> (<em><a href="https://jsonapi.org/format/1.0/#document-resource-object-linkage">resource linkage</a></em> de la relation <code>localization-commune</code> non <code>null</code>) : la commune de localisation (et ses coordonnées) est accessible grâce à la relation <code>localization-commune</code>.</li>
                    </ol>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.placeLocalization1" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.placeLocalization1"><code class="json">{{results.placeLocalization1[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section>
                    <p>
                      Lorsqu’on ignore si le <code>lieu</code> correspond à une commune ou en dépend, il est possible d’accéder à coup sûr à la <code>commune</code> de localisation en incluant les 2 relations à la requête :
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.placeLocalization2" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.placeLocalization2"><code class="json">{{results.placeLocalization2[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section>
                    <p>
                      L’attribut <code>localization-commune-relation-type</code> précise le type de la relation entre le <code>lieu</code> et sa <code>commune</code> de localisation. Ses valeurs autorisées sont :
                    </p>
                    <ul>
                      <li><a href="http://vocab.getty.edu/ontology#anchor-28390563" target="_blank"><code>broaderPartitive</code></a> : relation de dépendance administrative. Le <code>lieu</code> dépend administrativement de la <code>commune</code>.</li>
                      <li><a href="http://vocab.getty.edu/ontology#anchor1075244680" target="_blank"><code>tgn3000_related_to</code></a> : relation indéfinie. Le <code>lieu</code> est lié à la <code>commune</code> sans qu’on puisse préciser la relation (inclusion, proximité, etc.).</li>
                      <li><code>null</code> : le <code>lieu</code> correspond à la <code>commune</code> de localisation.</li>
                    </ul>
                  </section>
                  <section id="place-geolocation">
                    <h4>Géolocalisation</h4>
                    <p>
                      Un <code>lieu</code> est géolocalisé à l’échelle de sa <span class="span-a" @click="goTo($event, '#commune')"><code>commune</code></span>. Autrement dit, les coordonnées accessibles ne sont pas celles du <code>lieu</code> à proprement parler, mais celles de sa commune de localisation. Cette géolocalisation, certes imprécise, permet notamment de résoudre les homonymies très nombreuses de noms de lieu.
                    </p>
                    <p>
                      Pour chaque <code>lieu</code>, le code commune du COG 2011 de la commune de localisation est inscrit en valeur de l’attribut <code>localization-insee-code</code>. Cet attribut a pu être renseigné pour plus de 97% des lieux. Les coordonnées sont inscrites en attribut (<code>longlat</code>) de la <code>commune</code> correspondante.
                    </p>
                    <p>
                      NB. La géolocalisation reste à affiner au niveau infra-communal.
                    </p>
                  </section>
                  <section id="place-linked-places">
                    <h4>Lieux liés</h4>
                    <p>
                      Le lien entre un <code>lieu</code> et sa <code>commune</code> de localisation (attribut <code>localization-commune</code>) permet de regrouper les lieux par commune.
                    </p>
                    <p>
                      Pour un <code>lieu</code>, la relation <code>linked-places</code> donne accès aux autres <code>lieux</code> rattachés à cette même <code>commune</code>.
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.placeLinkedPlaces1" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.placeLinkedPlaces1"><code class="json">{{results.placeLinkedPlaces1[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section>
                    <p>
                      NB. Il est également possible de lister les <code>lieux</code> localisés dans une <code>commune</code> (v. <span class="span-a" @click="goTo($event, '#groupings')">regroupement des lieux : commune et lieux liés</span>).
                    </p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.placeLinkedPlaces2" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.placeLinkedPlaces2"><code class="json">{{results.placeLinkedPlaces2[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="place-linking">
                    <h4>Liages à d’autres référentiels</h4>
                    <p>
                      Les attributs <code>geoname-id</code>, <code>wikidata-item-id</code>, <code>wikipedia-url</code>, <code>databnf-ark</code>, <code>viaf-id</code>, <code>siaf-id</code> et <code>osm-id</code> sont utiles au liage du <code>lieu</code> – pour les valeurs autorisées, v. <span class="span-a" @click="goTo($event, '#groupings')">liage des communes</span>.
                    </p>
                    <p>
                      À ce jour, ces attributs ne sont renseignés que pour les seuls <code>lieux</code> correspondant à une <code>commune</code> (par ex. <a href="https://dicotopo.cths.fr/places/P66064026">Clacy</a>). Les <code>lieux</code> de la commune ne sont pas encore liés (par ex. <a href="https://dicotopo.cths.fr/places/P09135983">Aulnois</a>, moulin et ferme de la commune). De tels liages sont difficiles : ces lieux sont rarement décrits dans d’autres gazetiers et l’absence d’un identifiant de référence (tel qu’un code INSEE) complique la réconciliation.
                    </p>
                    <p>
                      NB. Une campagne de liage est à enteprendre.
                    </p>
                  </section>
                  <section id="old-label">
                    <header>
                      <h3>Forme ancienne : <code>place-old-label</code></h3>
                    </header>
                    <p>
                      Une <code>forme ancienne</code> (ressource de type <code>place-old-label</code>) est un nom ancien documenté d’un <code>lieu</code> : une forme ancienne doit autant que possible être datée et sa source textuelle citée.
                    </p>
                    <p>
                      Chaque <code>forme ancienne</code> est identifiée par son <code>id</code>.<br>
                      Une <code>forme ancienne</code> a les attributs suivants :
                    </p>
                    <ul>
                      <li><code>rich-label</code> : le nom ancien du lieu, formaté en HTML5, dans la langue – non décrite – de l'attestation.</li>
                      <li><code>rich-date</code> : la date du nom ancien, pour la lecture, en toutes lettres, non standardisée et formatée en HTML5. Par ex. : <code>853 environ</code></li>
                      <li><code>text-date</code> : la date du nom ancien standardisée pour les traitements (tris et filtres) selon la <a href="https://www.loc.gov/standards/datetime/">spécification EDTF (Extended Date/Time Format)</a>, une proposition d’extension du standard <a href="https://fr.wikipedia.org/wiki/ISO_8601">ISO 8601</a>. Par ex. : <code>0853~</code></li>
                      <li><code>rich-reference</code> : la référence bibliographique de l’attestation formatée en HTML5, par ex. : &quot;cart. de l’abb. de Saint-Martin de Laon, f° 172, bibl. de Laon&quot;. La référence est souvent abrégée ; pour la résoudre, on peut se référer à la liste des sources du volume correspondant du <em>Dictionnaire topographique</em> (par ex. sur <a href="https://gallica.bnf.fr/ark:/12148/bpt6k39289w/f36.item">Gallica</a>).</li>
                    </ul>
                    <p>La relation <code>place</code> permet d’accéder au <code>lieu</code> désigné par la <code>forme ancienne</code>.</p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.oldLabel" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.oldLabel"><code class="json">{{results.oldLabel[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                </article>

                <v-divider></v-divider>

                <article id="reference">
                  <header>
                    <h2>Cadre de référence</h2>
                  </header>
                  <section class="introduction">
                    <p>
                      Pour regrouper et géolocaliser les <code>lieux</code> selon leur commune de localisation, et pour reconstruire la hiérarchie administrative, le Code officiel géographique 2011 de l’INSEE (<a href="https://www.insee.fr/fr/information/2560625">COG 2011</a>) a été en partie intégré au modèle :
                    </p>
                    <ul>
                      <li>les ressources de type <code>commune</code> décrivent les communes du COG 2011.</li>
                      <li>les ressources de type <code>insee-ref</code> décrivent les circonscriptions administratives (région &gt; département &gt; arrondissement &gt; canton) dont les relations permettent de représenter la hiérarchie.</li>
                    </ul>
                  </section>
                  <section id="commune">
                    <header>
                      <h3>Commune : <code>commune</code></h3>
                    </header>
                    <p>Une <code>commune</code> (ressource de type <code>commune</code>) décrit une commune du <a href="https://www.insee.fr/fr/information/2560625" target="_blank">COG 2011</a>.</p>
                    <p>La collection des <code>communes</code> sert de cadre de référence à l’application DicoTopo. Elle est utile : </p>
                    <ul>
                      <li>au regroupement des lieux par commune de localisation</li>
                      <li>à la géolocalisation des lieux à l’échelle communale</li>
                      <li>au liage aux principaux référentiels (OSM, GeoNames, Wikidata, etc.)</li>
                      <li>au filtrage des résultats de la recherche par unité administrive (région &gt; département &gt; canton)</li>
                    </ul>
                    <p>Chaque <code>commune</code> est identifiée par un <code>id</code> dont la valeur correspond au code commune du COG 2011.<br>
                      Une <code>commune</code> a les attributs suivants :</p>
                    <ul>
                      <li><code>insee-code</code> : le code commune du COG 2011</li>
                      <li><code>place-id</code> : l’identifiant du <code>lieu</code> correspondant à la <code>commune</code>. Par exemple, le <code>lieu</code> <a href="https://dicotopo.cths.fr/api/1.0/places/P66064026"><code>P66064026</code></a> (Clacy) correspond à la <code>commune</code> <a href="https://dicotopo.cths.fr/api/1.0/communes/02196"><code>02196</code></a> (Clacy-et-Thierret)</li>
                      <li><code>NCCENR</code> : le nom en clair (typographie riche) de la <code>commune</code> – v. <a href="https://www.insee.fr/fr/information/2560628#nccenr" target="_blank">COG</a></li>
                      <li><code>ARTMIN</code> : l’article (typographie riche), par ex. <code>(La)</code> – v. <a href="https://www.insee.fr/fr/information/2560628#artmin" target="_blank">COG</a></li>
                      <li><code>longlat</code> : les coordonnées géographiques de la <code>commune</code> exprimées au format <code>(longitude, latitude)</code>. Ces coordonnées ont été récupérées grâce à l’API Découpage administratif (<a href="https://geo.api.gouv.fr/">https://geo.api.gouv.fr/</a>). Par ex. pour la <a href="https://geo.api.gouv.fr/communes/02196?fields=centre&amp;format=json&amp;geometry=centre" target="_blank">commune 02196</a>.</li>
                    </ul>
                  </section>
                  <section id="commune-linking">
                    <h4>Liage des communes</h4>
                    <p>Différents liages ont été réalisés grâce à un outil de réconciliation en exploitant initialement le code commune du COG 2011. La relation entre une <code>commune</code> et les entités liées est de type <a href="https://www.w3.org/TR/skos-reference/#mapping" target="_blank"><code>skos:closeMatch</code></a>.Ces liages sont accessibles grâce aux attributs suivants :</p>
                    <ul>
                      <li><code>geoname-id</code> : <code>geonameId</code>. Liage <a href="https://www.geonames.org/v3/" target="_blank">GeoNames</a></li>
                      <li><code>wikidata-item-id</code> : <a href="https://www.wikidata.org/wiki/Wikidata:Identifiers" target="_blank"><code>Entity ID (items)</code></a>. Liage <a href="https://www.wikidata.org/wiki/Wikidata:Main_Page" target="_blank">Wikidata</a></li>
                      <li><code>wikipedia-url</code> : <code>URL</code>. Liage <a href="https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal" target="_blank">Wikipedia</a></li>
                      <li><code>databnf-ark</code> : <a href="https://www.bnf.fr/fr/lidentifiant-ark-archival-resource-key" target="_blank"><code>ARK</code></a>. Liage <a href="https://data.bnf.fr/" target="_blank">data.bnf.fr</a></li>
                      <li><code>viaf-id</code> : <code>ID VIAF</code>. Liage <a href="http://viaf.org/" target="_blank">VIAF</a></li>
                      <li><code>siaf-id</code> : <code>location ID</code>. Liage <a href="https://francearchives.fr/fr/" target="_blank">France Archives</a></li>
                      <li><code>osm-id</code> : <a href="https://wiki.openstreetmap.org/wiki/Persistent_Place_Identifier#Element.27s_OSM_ID" target="_blank"><code>OSM relation ID</code></a>. Liage <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a></li>
                    </ul>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.commune" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.commune"><code class="json">{{results.commune[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="administrative-hierarchy">
                    <header>
                      <h3>Hiérarchie administrative</h3>
                    </header>
                    <p>Pour reconstruire la hiérarchie administrative d’une <code>commune</code>, ses relations <code>region</code>, <code>departement</code>, <code>arrondissement</code> et <code>canton</code> permettent d’accéder aux ressources de type <code>insee-ref</code> correspondantes.</p>
                    <p><strong>Ressource de type <code>insee-ref</code></strong></p>
                    <p>Leur identifiant est construit en référence au code correspondant du COG 2011 :</p>
                    <ul>
                      <li>pour une région : <code>REG_{Code région}</code></li>
                      <li>pour un département : <code>DEP_{Code département}</code></li>
                      <li>pour un arrondissement : <code>AR_{Code département}-{Code arrondissement}</code></li>
                      <li>pour un canton : <code>CT_{Code département}-{Code canton}</code></li>
                    </ul>
                    <p><strong>Attributs</strong></p>
                    <p><code>reference-type</code> : le type de la circonscription administrative. Les valeurs autorisées sont :</p>
                    <ul>
                      <li><code>REG</code> : région</li>
                      <li><code>DEP</code> : département</li>
                      <li><code>AR</code> : arrondissement</li>
                      <li><code>CT</code> : canton</li>
                      <li><code>CTNP</code> : <a href="https://www.insee.fr/fr/information/2560628#ct" target="_blank">canton non précisé</a>. Utilisé lorsque l&#39;on ne peut pas caractériser une fraction cantonale pour la commune (cas des communes divisées en plusieurs cantons).</li>
                    </ul>
                    <p><code>level</code> : le niveau dans la hiérarchie administrative. Les valeurs sont :</p>
                    <ul>
                      <li><code>2</code> : région</li>
                      <li><code>3</code> : département</li>
                      <li><code>4</code> : arrondissement</li>
                      <li><code>5</code> : canton</li>
                    </ul>
                    <p><code>insee-code</code> : le code du COG 2011 attribué à la circonscription administrative.<br>Les valeurs des cantons non précisés sont comprises entre 84 et 99.</p>
                    <p><code>label</code> : Nom en clair (typographie riche) de la circonscription administrative. Variable <a href="https://www.insee.fr/fr/information/2560628#nccenr" target="_blank"><code>NCCENR</code></a> des listes du COG 2011.</p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.districts" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.districts"><code class="json">{{results.districts[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                  <section id="groupings">
                    <header>
                      <h3>Regroupement des lieux : commune et lieux liés</h3>
                    </header>
                    <p>On distingue (1) un <code>lieu</code> correspondant à une <code>commune</code> et (2) un <code>lieu</code> dépendant d’une <code>commune</code> (v. <span class="span-a" @click="goTo($event, '#place-localization')">localisation</span>), par ex. :</p>
                    <ol>
                      <li>&quot;Clacy&quot; (<code>P66064026</code>) correspond à la commune &quot;Clacy-et-Thierret&quot; (code commune du COG 2011 <code>02196</code>).</li>
                      <li>&quot;Aulnois&quot; (<code>P09135983</code>) dépend de la commune &quot;Clacy-et-Thierret&quot; (code commune du COG 2011 <code>02196</code>).</li>
                    </ol>
                    <p>Pour une <code>commune</code>, il est possible de lister les <code>lieux</code> liés : le <code>lieu</code> correspondant à cette <code>commune</code> ET/OU les <code>lieux</code> dépendants de cette <code>commune</code>.</p>
                  </section>
                  <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.groupings" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.groupings"><code class="json">{{results.groupings[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>
                </article>

                <v-divider></v-divider>

            <article id="search">
              <header>
                <h2>API de recherche</h2>
              </header>
              <section class="introduction">
                <p>
                  L’API de recherche est construite avec <a
                  href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/index.html" target="_blank">Elasticsearch
                  6.8</a>.
                </p>
              </section>

              <section id="placenames-search">
                <header>
                  <h3>Rechercher des noms de lieux</h3>
                </header>
                <p>La recherche est configurée pour retrouver les noms de lieux et le lieu associé : pour un lieu, elle
                  porte sur l’attribut (<code>label</code>), pour une forme ancienne sur l’attribut
                  (<code>rich-label</code>).</p>
                <p>Par défaut, la réponse est un tableau des ressources de type <code>place</code> et/ou de type <code>place-old-label</code>
                  dont le contenu des attributs <code>place-label</code> (pour un lieu) et <code>rich-label</code> (pour
                  une forme ancienne) correspond au motif recherché.</p>
                <p>Le champ <code>type:place-old-label</code> de la requête permet de ne lister que les formes anciennes
                  (v. <span class="span-a" @click="goTo($event, '#search-filters')">Filtres et tris</span>).</p>
                <p>Le paramètre de requête <code>groupby</code> permet d’agréger les résultats par lieu.</p>
              </section>
              <section class="example">
                    <v-expansion-panels focusable>
                      <v-expansion-panel v-for="e,i in examples.searchPlacenames" :key="i">
                        <v-expansion-panel-header>
                          <div class="method"><v-chip color="secondary" label>GET</v-chip></div>
                          <span class="url" >
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="result">
                          <pre v-highlightjs v-if="results.searchPlacenames"><code class="json">{{results.searchPlacenames[e.url]}}</code></pre>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </section>

              <section id="search-response-format">
                <header>
                  <h3>Format de réponse et façades</h3>
                </header>
                <p>Les réponses de l’API de recherche sont formatées pour répondre aux besoins spécifiques de
                  l’application et ne contiennent que les attributs utiles à l’affichage des résultats ainsi qu’à la
                  cartographie.</p>
                <p>Deux façades complémentaires sont cependant disponibles :</p>
                <ul>
                  <li>La façade <code>default</code> retourne le tableau des ressources au format JSON:API DicoTopo
                    spécifié plus haut (v. <span class="span-a" @click="goTo($event, '#ressources')">Ressources exposées</span>).
                  </li>
                  <li>La façade <code>map</code> retourne les seules données utiles à la cartographie (coordonnées et
                    label du lieu).
                  </li>
                </ul>
              </section>
              <section class="example">
                <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchFormat" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchFormat"><code class="json">{{results.searchFormat[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-syntax">
                <header>
                  <h3>Syntaxe des requêtes</h3>
                </header>
                <p>L’API de recherche utilise les requêtes de type <a
                  href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/query-dsl-query-string-query.html"
                  target="_blank"><code>query_string</code></a> d’Elasticsearch 6.8.</p>
              </section>

              <section id="search-pagination">
                <h4>Pagination et nombre de résultats</h4>
                <p>Les résultats de la recherche sont paginés. Le paramètre <code>page[size]</code> permet de définir le nombre de résultats par page. Le paramètre <code>page[number]</code> permet d’accéder à une page du résultat. Le champ <code>['meta']['total']</code> de la réponse indique le nombre de résultats.</p>
              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchPagination" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchPagination"><code class="json">{{results.searchPagination[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-char-processing">
                <h4>Traitement des chaînes de caractères</h4>
                <ul>
                  <li>Casse, diacritiques. La recherche est insensible à la casse, aux accents ainsi qu’à la cédille.</li>
                  <li>Articles. Les articles sont déjoués : la requête <code>le crotoy</code> retourne la forme ancienne
                    <code>Le Crotoy</code> ainsi que le lieu <code>Crotoy (le)</code></li>
                </ul>
              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchCharProcessing" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchCharProcessing"><code class="json">{{results.searchCharProcessing[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-wildcard-query">
                <h4>Jokers (<em>Wildcard query</em>)</h4>
                <p>Dans une requête, les caractères joker (<em>wildcard operators</em>) représentent un ou plusieurs caractères :</p>
                <ul>
                  <li><code>?</code> : un caractère indéfini</li>
                  <li><code>*</code> : zéro à plusieurs caractères indéfinis</li>
                </ul>
                <p>La recherche <code>cl?cia*</code> retourne les noms de lieux Cliciacum, Clociachum, Clociacum et Claciacum</p>
              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchWildcardOperators" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchWildcardOperators"><code class="json">{{results.searchWildcardOperators[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-fuzzy">
                <h4>Recherche floue</h4>
                <p>Pour la <a href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/common-options.html#fuzziness" target="_blank">recherche floue</a>, il est possible de passer en suffixe de la chaîne de caractère recherchée un paramètre (<em>fuzziness parameter</em>) définissant la <a href="https://fr.wikipedia.org/wiki/Distance_de_Levenshtein" target="_blank">distance d’édition Levenshtein</a> maximale autorisée : <code>~0</code> (recherche exacte), <code>~1</code> (recherche floue), <code>~2</code> (recherche très floue).</p>

              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchFuzzy" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchFuzzy"><code class="json">{{results.searchFuzzy[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-filters">
                <h4>Filtres et tris</h4>
                <p>Différents champs sont indexés et disponibles pour la définition de tris et de filtres.</p>
                <p>Pour un lieu (ressource de type <code>place</code>) et une forme ancienne (ressource de type <code>place-old-label</code>) :</p>
                <ul>
                  <li><code>place-id</code> : identifiant de la ressource de type <code>place</code></li>
                  <li><code>place-label</code> : label de la ressource de type <code>place</code> (attention aux homonymes…)</li>
                  <li><code>localization-insee-code</code> : code commune du COG 2011</li>
                  <li><code>commune-label</code> : nom de la commune de localisation (variable <a href="https://www.insee.fr/fr/information/2560625#titre-bloc-7" target="_blank">NCCENR</a> de la liste du COG 2011) ; casse non sensible</li>
                  <li><code>reg-id</code> : code région du COG 2011</li>
                  <li><code>dep-id</code> : code département du COG 2011</li>
                  <li><code>ctn-id</code> : identifiant DicoTopo du canton</li>
                  <li><code>ctn-label</code> : nom du canton (variable <a href="https://www.insee.fr/fr/information/2560625#titre-bloc-19" target="_blank">NCCENR</a> de la liste du COG 2011) ; casse non sensible</li>
                </ul>
                <p>Le paramètre de requête <code>sort</code> permet de trier les résultats selon un ou plusieurs champs. Le préfixe optionnel <code>-</code> du nom du champ spécifie l’odre décroissant : par ex. <code>&sort=-dep-id.keyword</code> pour un tri décroissant par numéro de département.</p>
              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchFilters" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchFilters"><code class="json">{{results.searchFilters[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-filters2">
                <p>On peut ainsi s’affranchir du découpage administratif. On peut par ex. faire porter la recherche sur l’ensemble de la région naturelle du <a href="https://fr.wikipedia.org/wiki/Morvan#D%C3%A9limitation_administrative" target="_blank">Morvan</a>, qui recouvre les cantons de Liernais (<code>CT_21-19</code>), Précy-sous-Thil (<code>CT_21-27</code>), Saulieu (<code>CT_21-31</code>), Château-Chinon (Ville) (<code>CT_58-03</code>), Châtillon-en-Bazois (<code>CT_58-04</code>), Corbigny (<code>CT_58-06</code>), Fours (<code>CT_58-11</code>), Lormes (<code>CT_58-12</code>), Luzy (<code>CT_58-13</code>), Montsauche-les-Settons (<code>CT_58-14</code>), Moulins-Engilbert (<code>CT_58-15</code>), Bourbon-Lancy (<code>CT_71-03</code>), Issy-l&#39;Évêque (<code>CT_71-22</code>), Lucenay-l&#39;Évêque (<code>CT_71-24</code>), Mesvres (<code>CT_71-30</code>), Saint-Léger-sous-Beuvray (<code>CT_71-44</code>) et de Quarré-les-Tombes (<code>CT_89-23</code>) :</p>
              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchFilters2" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchFilters2"><code class="json">{{results.searchFilters2[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section id="search-filters3">
                <p>Pour une forme ancienne donnée (ressource de type <code>place-old-label</code>), on dispose également de l’attribut <code>text-date</code> : la date d’attestation de la forme ancienne (v. <span class="span-a" @click="goTo($event, '#old-label')">Forme ancienne</span> pour la documentation du format). Attention : 15% des formes anciennes n’ont pas de date.</p>
              </section>
              <section class="example">
              <v-expansion-panels focusable>
                  <v-expansion-panel v-for="e,i in examples.searchFilters3" :key="i">
                    <v-expansion-panel-header>
                      <div class="method">
                        <v-chip color="secondary" label>GET</v-chip>
                      </div>
                      <span class="url">
                            <div class="description">{{e.description}}</div>
                            <div><a :href="e.url" target="_blank">{{e.url}}</a></div>
                          </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="result">
                      <pre v-highlightjs v-if="results.searchFilters3"><code class="json">{{results.searchFilters3[e.url]}}</code></pre>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>
            </article>
                <v-divider></v-divider>

                 <article id="exports">
                  <header>
                    <h2>Export des données</h2>
                  </header>
                  <section class="introduction">
                    <i>Documentation en cours de rédaction</i>
                  </section>

                  <section class="Linked Place">
                    <article id="linked-places">
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
                           <pre v-highlightjs v-if="results.linkedPlaces"><code class="json">{{results.linkedPlaces[e.url]}}</code></pre>
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
          <v-btn
            class="mx-2"
            fab
            color="red--text"
            @click="goTo(null, '#top')"
            id="jump"
            v-show="showJump"
          >
            <v-icon large>
              mdi-arrow-up-bold
            </v-icon>
          </v-btn>
        </div>
    </section>
  </default-layout>
</template>

<script>
import DefaultLayout from '../DefaultLayout'
import '@/css/tomorrow.css'

export default {
  name: 'DocumentationPage',
  components: { DefaultLayout },
  data: () => {
    const urlPrefix = 'https://dicotopo.cths.fr/api/1.0'
    const examples = {
      compoundDocuments1: [
        { description: 'Le lieu P09135983 (Aulnois), avec sa commune de localisation (Clacy-et-Thierret)', url: `${urlPrefix}/places/P09135983?without-relationships&include=localization-commune` },
        { description: 'La commune 02196 (Clacy-et-Thierret), avec son canton (Laon-Sud)', url: `${urlPrefix}/communes/02196?without-relationships&include=canton` }
      ],
      compoundDocuments2: [
        { description: 'La relation \'localization-commune\' du lieu P09135983 (Aulnois), avec la commune cible (Clacy-et-Thierret)', url: `${urlPrefix}/places/P09135983/relationships/localization-commune?include=localization-commune` },
        { description: 'La relation \'place-feature-types\' du lieu P46094759 (Bazoches), avec les feature types cibles (fief, vassal)', url: `${urlPrefix}/places/P46094759/relationships/place-feature-types?include=place-feature-types` }
      ],
      compoundDocuments3: [
        { description: 'Le lieu P09135983 (Aulnois), avec sa description et ses formes anciennes', url: `${urlPrefix}/places/P09135983?without-relationships&include=descriptions,old-labels` }
      ],
      compoundDocuments4: [
        { description: 'Exemple NON implémenté : Le lieu P09135983 (Aulnois), avec sa commune de localisation et le canton de cette commune', url: `${urlPrefix}/places/P09135983?without-relationships&include=localization-commune.canton` }
      ],
      withoutRelationships: [
        { description: 'La collection des formes anciennes du lieu P09135983 (Aulnois), avec leurs relations', url: `${urlPrefix}/places/P09135983/old-labels` },
        { description: 'La collection des formes anciennes du lieu P09135983 (Aulnois), sans leurs relations', url: `${urlPrefix}/places/P09135983/old-labels?without-relationships` }
      ],
      facades: [
        { description: 'Inclusion des lieux liés, avec leur description', url: `${urlPrefix}/places/P66064026?without-relationships&include=linked-places@lp` }
      ],
      placeDesc: [
        { description: 'Description du lieu P53826654 (Laon)', url: `${urlPrefix}/places/P53826654/descriptions` },
        { description: 'Commentaire du lieu P53826654 (Laon)', url: `${urlPrefix}/places/P53826654/comments` },
        { description: 'Le lieu P53826654 (Laon), avec sa description et son commentaire', url: `${urlPrefix}/places/P53826654?without-relationships&include=descriptions,comments` }
      ],
      featureTypes: [
        { description: 'Types du lieu P46094759 (Bazoches)', url: `${urlPrefix}/places/P46094759/place-feature-types` }
      ],
      placeOldLabels: [
        { description: 'La collection des formes anciennes du lieu P66064026 (Clacy)', url: `${urlPrefix}/places/P66064026/old-labels?without-relationships` },
        { description: 'Le lieu P66064026 (Clacy) et ses formes anciennes', url: `${urlPrefix}/places/P66064026?without-relationships&include=old-labels` }
      ],
      placeLocalization1: [
        { description: 'Le lieu P66064026 (Clacy) qui correspond à la commune Clacy-et-Thierret, et sa commune de localisation (Clacy-et-Thierret)', url: `${urlPrefix}/places/P66064026?without-relationships&include=commune` },
        { description: 'Le lieu P09135983 (Aulnois) qui dépend de la commune Clacy-et-Thierret, et sa commune de localisation (Clacy-et-Thierret)', url: `${urlPrefix}/places/P09135983?without-relationships&include=localization-commune` }
      ],
      placeLocalization2: [
        { description: 'Le lieu P66064026 (Clacy) et sa commune de localisation (Clacy-et-Thierret)', url: `${urlPrefix}/places/P66064026?without-relationships&include=commune,localization-commune` },
        { description: 'Le lieu P09135983 (Aulnois) et sa commune de localisation (Clacy-et-Thierret)', url: `${urlPrefix}/places/P09135983?without-relationships&include=commune,localization-commune` }
      ],
      placeLinkedPlaces1: [
        { description: 'La collection des lieux localisés dans la même commune (Clacy-et-Thierret) que le lieu P09135983 (Aulnois)', url: `${urlPrefix}/places/P09135983/linked-places?without-relationships` },
        { description: 'Le lieu P09135983 (Aulnois), avec les lieux localisés dans la même commune (Clacy-et-Thierret)', url: `${urlPrefix}/places/P66064026?without-relationships&include=linked-places` }
      ],
      placeLinkedPlaces2: [
        { description: 'La collection des lieux localisés dans la commune 02196 (Clacy-et-Thierret)', url: `${urlPrefix}/communes/02196/localized-places` },
        { description: 'La commune 02196 (Clacy-et-Thierret) avec les lieux qui y sont localisés', url: `${urlPrefix}/communes/02196?without-relationships&include=localized-places` }
      ],
      oldLabel: [
        { description: 'La forme ancienne 18129', url: `${urlPrefix}/place-old-labels/18129` },
        { description: 'Le lieu désigné par la forme ancienne 18129', url: `${urlPrefix}/place-old-labels/18129/place?without-relationships` }
      ],
      commune: [
        { description: 'La commune 02408 (Laon)', url: `${urlPrefix}/communes/02408?without-relationships` }
      ],
      districts: [
        { description: 'Le département DEP_02 (Aisne)', url: `${urlPrefix}/insee-refs/DEP_02` },
        { description: 'Le canton CT_02-38 (Laon-Sud)', url: `${urlPrefix}/insee-refs/CT_02-38` },
        { description: 'La commune 02196 (Clacy-et-Thierret), avec sa hiérarchie administrative', url: `${urlPrefix}/communes/02196?without-relationships&include=region,departement,arrondissement,canton` }
      ],
      groupings: [
        { description: 'Pour la commune 02196 (Clacy-et-Thierret), le lieu correspondant (Clacy)', url: `${urlPrefix}/communes/02196/place?without-relationships` },
        { description: 'Pour la commune  02196 (Clacy-et-Thierret), la collection des lieux dépendants', url: `${urlPrefix}/communes/02196/localized-places?without-relationships` },
        { description: 'La commune 02196 (Clacy-et-Thierret), avec ses lieux liés (lieu correspondant ET lieux dépendants)', url: `${urlPrefix}/communes/02196?without-relationships&include=place,localized-places` }
      ],
      searchPlacenames: [
        { description: 'La liste des lieux et des formes anciennes dont le label contient \'Clacy\'', url: `${urlPrefix}/search?query=label.folded:Clacy` },
        { description: 'La liste des seules formes anciennes dont le label contient \'Clacy\'', url: `${urlPrefix}/search?query=label.folded:clacy AND type:place-old-label` },
        { description: 'La liste des lieux dont le label ou une forme ancienne contient \'Clacy\'', url: `${urlPrefix}/search?query=label.folded:clacy&groupby[doc-type]=place&groupby[field]=place-id.keyword` }
      ],
      searchFormat: [
        { description: 'Recherche \'Clacy\', façade default', url: `${urlPrefix}/search?query=label.folded:clacy&facade=default` },
        { description: 'Recherche \'Clacy\', façade map', url: `${urlPrefix}/search?query=label.folded:clacy&facade=map` }
      ],
      searchPagination: [
        { description: 'Recherche \'moulin\', première page de 2 résultats', url: `${urlPrefix}/search?query=label.folded:moulin&page[size]=2` },
        { description: 'Recherche \'moulin\', 250e page de 2 résultats', url: `${urlPrefix}/search?query=label.folded:moulin&page[size]=2&page[number]=250` }
      ],
      searchCharProcessing: [
        { description: 'Casse non sensible, recherche \'gUeMÉne\'', url: `${urlPrefix}/search?query=label.folded:gUeMÉne` },
        { description: 'Élision des articles, recherche \'le crotoy\'', url: `${urlPrefix}/search?query=label.folded:le crotoy&page[size]=2` }
      ],
      searchWildcardOperators: [
        { description: 'Wildcard operators, recherche \'cl?cia*\'', url: `${urlPrefix}/search?query=label.folded:cl?cia*` }
      ],
      searchFuzzy: [
        { description: 'La recherche floue sur la forme \'Clacy\' retourne par ex. les noms de lieux \'Clary\' et \'Blacy\'', url: `${urlPrefix}/search?query=label.folded:clacy~1&page[size]=2&page[number]=3` }
      ],
      searchFilters: [
        { description: 'Recherche \'Clacy\', tri décroissant par département puis tri croissant par nom de lieu', url: `${urlPrefix}/search?query=label.folded:clacy&sort=-dep-id.keyword,place-label` },
        { description: 'La liste des formes anciennes du lieu P66064026 (Clacy) commençant par \'Claci\'', url: `${urlPrefix}/search?query=label.folded:Claci* AND place-id:P66064026` },
        { description: 'La liste des lieux et des formes anciennes contenant \'molendinum\' pour les lieux dont le nom contient \'Vieux\'', url: `${urlPrefix}/search?query=label.folded:molendinum AND place-label:Vieux*` },
        { description: 'Les 3 premiers items de la liste des formes anciennes dont le label contient \'saint\' à Laon (localization-insee-code = 02408)', url: `${urlPrefix}/search?query=label.folded:saint AND type:place-old-label AND localization-insee-code:02408&page[size]=3` },
        { description: 'La liste des lieux et des formes anciennes dont le label contient \'Clacy\' pour les communes nommées Clessy (commune-label = \'clessy\')', url: `${urlPrefix}/search?query=label.folded:clacy AND commune-label:clessy` },
        { description: 'La liste des lieux et des formes anciennes dont le label contient \'Clacy\' en Picardie (reg-id = 22)', url: `${urlPrefix}/search?query=label.folded:clacy AND reg-id:22` },
        { description: 'La liste des lieux et des formes anciennes dont le label contient \'Clacy\' en Saône-et-Loire (dep-id = 71)', url: `${urlPrefix}/search?query=label.folded:clacy AND dep-id:71` },
        { description: 'La liste des lieux et des formes anciennes dont le label contient \'Clacy\' dans le canton de Laon-Sud (ctn-id = CT_02-38)', url: `${urlPrefix}/search?query=label.folded:clacy AND ctn-id:CT_02-38` },
        { description: 'La liste des lieux et des formes anciennes dont le label contient \'Clacy\' dans le canton de Laon-Sud (ctn-label = laon-SUD)', url: `${urlPrefix}/search?query=label.folded:clacy AND ctn-label:laon-SUD` }
      ],
      searchFilters2: [
        { description: 'Liste des lieux et des formes anciennes du Morvan dont le label commence par \'Huis-Boul…\'', url: `${urlPrefix}/search?query=label.folded:Huis- Boul* AND (ctn-id:CT_21-19 OR ctn-id:CT_21-27 OR ctn-id:CT_21-31 OR ctn-id:CT_58-03 OR ctn-id:CT_58-04 OR ctn-id:CT_58-06 OR ctn-id:CT_58-11 OR ctn-id:CT_58-12 OR ctn-id:CT_58-13 OR ctn-id:CT_58-14 OR ctn-id:CT_58-15 OR ctn-id:CT_71-03 OR ctn-id:CT_71-22 OR ctn-id:CT_71-24 OR ctn-id:CT_71-30 OR ctn-id:CT_71-44 OR ctn-id:CT_89-23)` }
      ],
      searchFilters3: [
        { description: 'Liste des formes anciennes contenant \'Clacy\' attestées depuis 1327', url: `${urlPrefix}/search?query=label.folded:clacy AND text-date:>=1327` }
      ],
      linkedPlaces: [
        { description: 'Export du lieu \'Coste-Rousse\' au format LinkedPlaces', url: `${urlPrefix}/places/P24576921?export=linkedplaces` },
        { description: 'La même ressource au format inline (plus compact)', url: `${urlPrefix}/places/P24576921?export=inline-linkedplaces` },
        { description: 'Export d\'une collection', url: `${urlPrefix}/places?page[size]=5&page[number]=1` },
        { description: 'Export de la commune \'Cluse (La)\' (incluant les liens vers d\'autres référentiels)', url: `${urlPrefix}/places/P87923773?export=linkedplaces` }
      ]
    }

    let results = {
      compoundDocuments1: {},
      compoundDocuments2: {},
      compoundDocuments3: {},
      compoundDocuments4: {},
      withoutRelationships: {},
      facades: {},
      placeDesc: {},
      featureTypes: {},
      placeOldLabels: {},
      placeLocalization1: {},
      placeLocalization2: {},
      placeLinkedPlaces1: {},
      placeLinkedPlaces2: {},
      oldLabel: {},
      commune: {},
      districts: {},
      groupings: {},
      searchPlacenames: {},
      searchFormat: {},
      searchPagination: {},
      searchCharProcessing: {},
      searchWildcardOperators: {},
      searchFuzzy: {},
      searchFilters: {},
      searchFilters2: {},
      searchFilters3: {},
      linkedPlaces: {}
    }
    // add empty results
    Object.keys(examples).forEach(key => {
      examples[key].forEach(e => {
        results[key][e.url] = null
      })
    })

    return {
      examples: examples,
      results: results,

      isMenuOpened: false,
      showJump: false
    }
  },
  watch: {
    $route () {

    }
  },
  mounted () {
    document.body.addEventListener('click', this.closeMenu)

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() }

    const _this = this
    function scrollFunction () {
      if (document.body.scrollTop > 860 || document.documentElement.scrollTop > 860) {
        _this.showJump = true
      } else {
        _this.showJump = false
      }
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.closeMenu)
  },
  async created () {
    let resultPromises = []
    for (const key in this.examples) {
      this.examples[key].forEach(example => {
        resultPromises.push(
          this.fetchAPI(example.url).then(data => {
            const code = JSON.stringify(data, null, 2)
            this.results[key][example.url] = code
          })
        )
      })
    }
    Promise.all(resultPromises)
  },
  computed: {
    menuCsscClass () {
      return this.isMenuOpened ? 'opened' : ''
    }
  },
  methods: {
    goTo (event, id) {
      const el = document.querySelector(id)
      if (el) {
        document.querySelectorAll('.toc li.is-active').forEach(e => {
          e.classList.remove('is-active')
        })
        if (event) {
          event.target.classList.add('is-active')
        }
        el.scrollIntoView(true, { behavior: 'smooth' })
        window.scrollBy(0, -90)
      }
    },
    async fetchAPI (url) {
      const response = await fetch(url)
      const data = await response.json()
      return data
    },
    toggleMenu ($event) {
      $event.preventDefault()
      $event.stopImmediatePropagation()
      this.isMenuOpened = !this.isMenuOpened
    },
    closeMenu () {
      this.isMenuOpened = false
    }
  }
}
</script>

<style scoped lang="scss">
  html {
    scroll-behavior: smooth;
  }
  .main-section {
    margin-bottom: 120px;
  }
  .span-a {
    text-decoration: underline;
    color: rgb(25, 118, 210);
    &:hover {
      cursor: pointer
    }
  }
  .toc .is-active {
    color: #D32F2F !important;
    caret-color: #D32F2F !important;
    border-left: 2px solid #D32F2F;
  }
  .doc {
    text-align: justify;
    margin-right: 12%;
    padding-right: 20px;
    padding-left: 80px;
    padding-top: 60px;
  }
  .doc-container {
    display: flex;
  }

  #jump {
    color: #D32F2F !important;
    position: fixed; /* Fixed/sticky position */
    bottom: 30px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
  }

  .toc {
    min-width: 330px;
    margin-top: 80px;
    margin-left: 6px;
    a {
      text-decoration: none;
      color: inherit;
      font-weight: inherit;
    }
    ol {
    width: 330px;
    flex-direction: column;
    }
    ol li {
      list-style-type: none;
      justify-content: flex-start;
      height: 48px;
      color: rgba(0, 0, 0, 0.54);
      &:hover {
        cursor: pointer;
      }
      &.level1 {
        text-decoration: none;
      }
      &.level2 {
        text-decoration: none;
        padding-left: 26px;
      }
      &.level3 {
        text-decoration: none;
        font-weight: 300;
        padding-left: 40px;

      }
    }

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
    margin: 18px 0 20px;
  }
  h2 {
    margin: 18px 0;
  }
  h3, h4 {
    margin: 16px 0;
  }
  ul, ol {
    margin-bottom: 18px;
  }
  .example {
    margin-bottom: 30px;
  }
  .v-application code {
    /*all: unset;*/
    background-color: #F1F1F1;
    color: inherit;
  }
  .method {
    padding: 0;
  }
  .url {
    padding: 0 16px;
    width: 82%;
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
  .v-btn--round .v-btn__content .v-icon {
    color: rgb(211, 47, 47);
  }
  .toggle-menu-btn {
    display: none;
  }
  .v-application .url a {
    word-break: break-all;
  }

  @media screen and (max-width: 760px) {
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
    .v-application .headline {
      font-size: 1.275rem !important;
      line-height: 1.2;
    }
    .toc {
      position: fixed !important;
      transform: translateX(-110%);
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      z-index: 2 !important;
      height: calc( 100vh - 67px );
      overflow: auto;
      background-color: rgba(255, 255, 255, 0.97);
      top: 0;
      padding-top: 166px;
      margin-left: -24px;
      margin-top: 67px;
    }
    .toc.opened {
      transform: translateX(0%);
      border-right: 1px solid #ccc;
    }
    .toggle-menu-btn {
      position: fixed;
      right:6px;
      z-index: 10;
      display: inline-block;
      text-decoration: none;
      text-transform: uppercase;
      color:#D32F2F !important;
    }
    .head--section {
      margin-bottom: 20px;
    }
    .doc {
      margin: 0;
      padding: 0 67px 12px 35px;
      max-width: 100%;
    }
    .doc h1 {
      font-size: 1.35em;
      line-height: 1.2;
    }
    .doc h2 {
      font-size: 1em;
      line-height: 1.2;
    }
    .doc li,
    .doc p {
      font-size: 0.875em;
      line-height: 1.2;
    }
    #jump {
      bottom: 10px;
      right: 5px;
      width: 36px;
      height: 36px;
    }
    #jump .v-icon {
      font-size: 25px !important;
    }
  }

</style>
