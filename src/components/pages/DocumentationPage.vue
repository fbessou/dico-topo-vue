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
                    Documentation de référence de l’API 1.0 de dicotopo.cths.fr.<br>
                    Cette documentation est conçue comme une aide pour la récupération des données (ressources et relations) et met l’accent sur les requêtes <code>GET</code>.<br>
                  </p>
                </header>
                <article>
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
                      Ces inclusions ne sont implémentées que sur un unique niveau : il est possible d’inclure des ressources reliées, mais pas les ressources reliées à ces dernières.
                      Par exemple, pour un <code>lieu</code>, il est possible d’inclure sa commune de localisation, mais pas d’inclure également – dans le même document composite – le canton reliée à cette commune de localisation :
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
                      Pour simplifier l’utilisation de l’API, réduire notamment le nombre des requêtes utiles à certaines fonctionnalités de l’application DicoTopo, des façades ont été définies. Elles peuvent compenser dans dans certains cas l’absence des <em>Sparse Fieldsets</em>.
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

                <article>
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
                        <li><code>commune</code> : une <code>commune</code> du Code officiel géographique 2011 de l’INSEE</li>
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
                      lieu d&#39;attention humaine, matériel ou intellectuel, dans un contexte géographique réel.&quot;
                    </p>
                    <p>
                      Un <code>lieu</code> se caractérise par la mise en relation entre des noms de ce <code>lieu</code> et une localisation.<br>
                      Un <code>lieu</code> est identifié par son <code>id</code> au format <code>P00000000</code> : les 8 premiers chiffres sont attribués aléatoirement, le 9<sup>e</sup> est une clé de contrôle.<br>
                      Un <code>lieu</code> a les attributs suivants :
                    </p>
                    <ul>
                      <li><code>label</code> : label principal (vedette de l’article du <i>Dictionnaire</i> imprimé, "nom préféré" – <a href="https://www.w3.org/TR/skos-reference/#labels" target="_blank"><code>skos:prefLabel</code></a>)</li>
                      <li><code>country</code> : code à deux lettres (<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2" target="_blank">ISO 3166-1 alpha-2</a>) du pays d’appartenance (toujours <code>FR</code> pour le DT)</li>
                      <li><code>dpt</code> : code du département d’appartenance (<a href="https://www.insee.fr/fr/information/2560625#titre-bloc-26" target="_blank">COG 2011</a>)</li>
                      <li><code>localization-insee-code</code> : code de la <code>commune</code> de localisation (<a href="https://www.insee.fr/fr/information/2560625#titre-bloc-26" target="_blank">COG 2011</a>)</li>
                      <li><code>localization-commune-relation-type</code> : type de la relation entre le <code>lieu</code> et sa <code>commune</code> de localisation, caractérisé grâce à un vocabulaire existant (v. <a href="#place-localization">localisation</a>).</li>
                      <li><code>geoname-id</code>, <code>wikidata-item-id</code>, <code>wikipedia-url</code>, <code>databnf-ark</code>, <code>viaf-id</code>, <code>siaf-id</code>, <code>osm-id</code> : liages (v. <a href="#commune"><code>commune</code></a>). Seuls les lieux correspondants à une commune (v. <a href="#place-localization">localisation</a>) sont liés.</li>
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
                      Les termes sont ceux imprimés dans le <em>Dictionnaire topographique</em>, ils ne sont pas normalisés : il n’existe pas un thésaurus des termes. En l’état de la donnée, un type de lieu n’est donc pas une clé de regroupement pertinente.
                    </p>
                    <p>
                      NB. La définition d’un thésaurus des types de lieu et leur standardisation sont à entreprendre.
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
                      Un <code>lieu</code> peut avoir une ou plusieurs formes anciennes documentées.<br>La relation <code>old-labels</code> permet d’accéder à la collection des ressources de type <a href="#old-label"><code>place-old-label</code></a> associées au <code>lieu</code>.
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
                      L’initiative éditoriale du  <cite>Dictionnaire topographique</cite> repose sur le principe initial d’une publication par livraison : un dictionnaire par département.
                    </p>
                    <p>
                      Les attributs <code>country</code> (<code>FR</code>) et <code>dpt</code> (COG 2011 du département) permettent d’identifier facilement le pays et le département du <code>lieu</code>.<br>
                      Pour affiner cette localisation par défaut, chaque <code>lieu</code> a été lié à sa <code>commune</code> grâce à l’attribut <code>localization-insee-code</code> (COG 2011 de la commune).
                    </p>
                    <p>
                      Par ex., pour le <code>lieu</code> <a href="https://dicotopo.cths.fr/api/1.0/places/P09135983"><code>PP09135983</code></a> (Aulnois), la commune de  localisation est identifiée par le COG <code>02196</code>. La ressource de type <a href="#commune"><code>commune</code></a> correspondante permet d’accéder aux données de localisation complémentaires telle que la hiérarchie administrative : région &gt; département &gt; arrondissement &gt; canton.
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
                      <li><a href="http://vocab.getty.edu/ontology#anchor-28390563" target="_blank"><code>broaderPartitive</code></a> : hiérarchie administrative. Le <code>lieu</code> dépend administrativement de la <code>commune</code>.</li>
                      <li><a href="http://vocab.getty.edu/ontology#anchor1075244680" target="_blank"><code>tgn3000_related_to</code></a> : relation indéfinie. Le <code>lieu</code> est lié à la <code>commune</code> sans qu’on puisse préciser la relation (inclusion, proximité, etc.).</li>
                      <li><code>null</code> : le <code>lieu</code> correspond à la <code>commune</code> de localisation.</li>
                    </ul>
                  </section>
                  <section id="place-geolocation">
                    <h4>Géolocalisation</h4>
                    <p>
                      Un <code>lieu</code> est géolocalisé à l’échelle de sa <a href="#commune"><code>commune</code></a>. Autrement dit, les coordonnées accessibles ne sont pas celles du <code>lieu</code> à proprement parler, mais celles de sa commune de localisation. Cette géolocalisation, certes imprécise, permet notamment de résoudre les homonymies très nombreuses de noms de lieu.
                    </p>
                    <p>
                      Pour chaque <code>lieu</code>, le COG de la commune de localisation est inscrit en valeur de l’attribut <code>localization-insee-code</code>. Cet attribut a pu être renseigné pour plus de 97% des lieux. Les coordonnées sont inscrites en attribut (<code>longlat</code>) de la <code>commune</code> correspondante.
                    </p>
                    <p>
                      NB. Une campagne de géolocalisation des lieux est à entreprendre.
                    </p>
                  </section>
                  <section id="place-linked-places">
                    <h4>Lieux liés</h4>
                    <p>
                      Ce lien commun des <code>lieux</code> à une <code>commune</code> de localisation (attribut <code>localization-commune</code>) permet de regrouper les lieux par commune.
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
                      NB. Il est également possible de lister les <code>lieux</code> localisés dans une <code>commune</code> (v. <a href="#groupings">regroupement des lieux : commune et lieux liés</a>).
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
                      Les attributs <code>geoname-id</code>, <code>wikidata-item-id</code>, <code>wikipedia-url</code>, <code>databnf-ark</code>, <code>viaf-id</code>, <code>siaf-id</code> et <code>osm-id</code> sont utiles au liage du <code>lieu</code> – pour les valeurs autorisées, v. <a href="#commune-linking">liage des communes</a>.
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
                      <li><code>rich-label</code> : le nom ancien du lieu, formaté en HTML5, dans sa langue qui n’est pas décrite.</li>
                      <li><code>rich-date</code> : la date du nom ancien, pour la lecture, en toutes lettres, non standardisée et formatée en HTML5. Par ex. : <code>853 environ</code></li>
                      <li><code>text-date</code> : la date du nom ancien, pour les traitements (tris et filtres), standardisée selon la <a href="https://www.loc.gov/standards/datetime/">spécification EDTF (Extended Date/Time Format)</a>, une proposition d’extension du standard <a href="https://fr.wikipedia.org/wiki/ISO_8601">ISO 8601</a>. Par ex. : <code>0853~</code></li>
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

                <article>
                  <header>
                    <h2>Cadre de référence (COG 2011)</h2>
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
                    <p>Leur identifiant est construit en référence au COG 2011 :</p>
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
                      <li><code>CTNP</code> : <a href="https://www.insee.fr/fr/information/2560628#ct" target="_blank">canton non précisé</a>. Utilisé lorsque l&#39;on ne peut pas caractériser une fraction cantonale pour la commune (cas des communes découpées en cantons).</li>
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
                    <p>On distingue (1) un <code>lieu</code> correspondant à une <code>commune</code> et (2) un <code>lieu</code> dépendant d’une <code>commune</code> (v. <a href="#place-localization">localisation</a>), par ex. :</p>
                    <ol>
                      <li>&quot;Clacy&quot; (<code>P66064026</code>) correspond à la commune &quot;Clacy-et-Thierret&quot; (COG <code>02196</code>).</li>
                      <li>&quot;Aulnois&quot; (<code>P09135983</code>) dépend de la commune &quot;Clacy-et-Thierret&quot; (COG <code>02196</code>).</li>
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
                          <pre v-highlightjs v-if="results.search"><code class="json">{{results.search[e.url]}}</code></pre>
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
      search: [
        { description: 'Recherche du lieu \'Ailles\'', url: `${urlPrefix}/search?query=label.folded:Ailles&page[size]=50` },
        { description: 'Recherche de la forme ancienne \'Ailles\'', url: `${urlPrefix}/search?query=label.folded:Ailles&sort=place-label.keyword&page[size]=50` },
        { description: 'Tri sur le nom du lieu (croissant)', url: `${urlPrefix}/search?query=label.folded:Ailles&sort=place-label.keyword&page[size]=50` },
        { description: 'Tri sur le nom du lieu (décroissant)', url: `${urlPrefix}/search?query=label.folded:Ailles&sort=-place-label.keyword&page[size]=50` },
        { description: 'Tri sur le département puis sur le nom du lieu', url: `${urlPrefix}/search?query=label.folded:Ailles&sort=dep-id.keyword,place-label.keyword&page[size]=50` },
        { description: 'Filtre sur le canton et le département', url: `${urlPrefix}/search?query=label.folded:Ailles AND ((dep-id:02) AND (ctn-id:CT_02-12))` },
        { description: 'Recherche floue du lieu \'Ailles\'', url: `${urlPrefix}/search?query=label.folded:Ailles~2&page[size]=50` }
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
      search: {},
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
      results: results
    }
  },
  computed: {

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
    await Promise.all(resultPromises)
  },
  methods: {
    async fetchAPI (url) {
      const response = await fetch(url)
      const data = await response.json()
      return data
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
</style>
