<template>
  <default-layout>
    <section>
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
              <div class="headline  mb-3 font-weight-light">Présentation</div>
            </v-layout>
          </v-parallax>
        </section>

        <section class="mb-10">
          <v-container fluid>
            <v-layout justify-center>
              <v-flex xs8>
                <section>
                  <h1 class="font-weight-bold title mt-5 mb-3"><span class="display-1">L’entreprise éditoriale</span></h1>
                  <article class="body-1">
                    <p>Le <i>Dictionnaire topographique de la France</i> est une entreprise éditoriale du
                      Comité des travaux historiques et scientifiques, organisme d’État créé sous la
                      Monarchie de juillet afin de développer la recherche, notamment historique,
                      via la publication de documents inédits.</p>
                  </article>
                  <article class="body-1">
                    <header><h2 class="font-weight-bold subheading mb-3">Un projet à l’échelle nationale</h2></header>
                    <p>Son lancement officiel remonte à l’année 1859 : cette année-là, l’historien et membre du Comité
                      Léopold
                      Delisle publiait dans la <i>Revue des sociétés savantes des départements</i> un rapport sur « le
                      plan d’un
                      dictionnaire géographique de la France ancienne et moderne ». Alors que la science historique
                      commençait à
                      se pratiquer de façon méthodique, il s’agissait de doter les savants d’un outil de travail pour
                      l’étude de
                      l’histoire, de la géographie et de la topographie anciennes des provinces françaises. L’ambition
                      était dès
                      l’origine nationale : c’est un – et un seul – dictionnaire que le Comité entendait alors élaborer,
                      sorte
                      de
                      pendant scientifique du dictionnaire des postes. En raison de la longueur prévisible de
                      l’entreprise, l’on
                      opta toutefois rapidement pour le principe d’une publication par livraison – un dictionnaire par
                      département, l’ensemble devant être couronné par un index des anciens noms de lieux de la France
                      entière.
                    </p>
                  </article>
                  <article class="body-1">
                    <header><h2 class="font-weight-bold subheading mb-3">Trente-cinq départements couverts</h2></header>
                    <p>Les débuts furent prometteurs : pas moins de dix-neuf dictionnaires parurent entre 1861 et 1884,
                      dus
                      principalement aux archivistes départementaux, parfois à d’autres érudits, correspondants locaux du
                      Comité.
                      Le mouvement se poursuivit à un rythme plus modéré, à raison de deux à quatre dictionnaires par
                      décennie
                      jusqu’aux années 1920, les derniers volumes publiés étant ceux de la Sarthe et de la Seine-et-Marne
                      (années
                      1950), de la Seine-Maritime (années 1980) et, dernier en date, celui de la Saône-et-Loire (2008).
                      Ce sont
                      aujourd’hui trente-cinq départements qui sont couverts, représentant plus du tiers du territoire
                      national
                      métropolitain.</p>
                    <p>L’on peut légitimement trouver ce taux insuffisant ; c’est que la réalisation d’un dictionnaire
                      topographique est une œuvre de longue haleine, reposant sur le dépouillement de masses
                      documentaires
                      considérables. Du reste, l’apport du Comité des travaux historiques et scientifiques ne se limite
                      pas aux
                      seuls volumes publiés par ses soins. En lançant son projet de « Dictionnaire géographique de la
                      France
                      ancienne et moderne », le Comité proposait en effet, pour la collecte et le classement des noms de
                      lieux
                      anciens, un cadre et un modèle dont purent ensuite s’emparer les érudits désireux de constituer des
                      corpus
                      de toponymie historique : nombre de leurs travaux, imprimés ou restés manuscrits, reprennent, sinon
                      les
                      normes de présentation, du moins l’esprit de la collection du <i>Dictionnaire topographique de la
                                                                                        France</i>.
                      Le
                      présent outil de recherche numérique a cherché à les adjoindre autant que possible à l’ensemble des
                      volumes
                      édités par le CTHS, et il est à espérer que, non content de donner une seconde vie à ces travaux,
                      il
                      contribue à stimuler la publication, avec les outils et les moyens qui sont ceux de notre époque,
                      de
                      nouveaux recueils toponymiques.</p>
                  </article>
                </section>
                <section>
                  <h1 class="font-weight-bold title mt-5 mb-3"><span class="display-1">Contenus et usages</span></h1>
                  <article class="body-1">
                    <header>
                      <h2 class="font-weight-bold subheading mb-3">Du papier…</h2>
                    </header>
                    <p>L’appellation « dictionnaire topographique » ne reflète qu’imparfaitemement le contenu des
                      dictionnaires
                      édités par le CTHS. Dans ses instructions initiales (1859), Léopold Delisle évoquait un
                      dictionnaire
                      « géographique » ; dans l’absolu, l’adjectif « toponymique » pourrait tout aussi bien convenir.</p>
                    <p>Topographiques, les dictionnaires le sont assurément : leur introduction comprenait, aux premiers
                      temps
                      du
                      moins, une description physique du département, et leur nomenclature est en très grande partie
                      constituée
                      par les noms tirés de la géographie physique (reliefs, cours d’eau, forêts, etc.) et par les noms
                      de lieux
                      habités (communes, villages, hameaux, écarts, etc.). Mais ces dictionnaires sont majoritairement
                      œuvres
                      d’archivistes, et donc d’historiens, ce qui explique en outre la présence, dans la nomenclature, de
                      noms
                      se
                      rapportant à l’histoire et à la géographie historique (noms de peuples et d’anciennes
                      circonscriptions,
                      fiefs, abbayes, hôpitaux, vieux chemins, etc.), mais aussi, et surtout, de plus ou moins longues
                      énumérations des formes anciennes du nom de lieu auquel se trouve consacrée la notice. De manière
                      générale,
                      Léopold Delisle enjoignait aux futurs rédacteurs de « n’écarter aucun nom qui ait un caractère
                      d’ancienneté
                      et qui présente un intérêt historique ou philologique ».</p>
                    <p> L’ensemble des dictionnaires a été élaboré selon un seul et même plan tripartite :</p>
                    <ul>
                      <li>une introduction, consacrée à la géographie, notamment historique, du département ;</li>
                      <li>le corps même du dictionnaire, composé d’articles comprenant, sous une vedette (nom de lieu)
                          « moderne », tout ou partie des informations suivantes : nature et localisation du lieu concerné
                          – la
                          localisation s’effectuant par rapport à la circonscription administrative immédiatement
                          supérieure –,
                          formes anciennes du nom, datées et munies de leur référence documentaire (archivistique ou
                          bibliographique), enfin informations historiques diverses (circonscriptions d’appartenance sous
                          l’Ancien
                          régime, etc.) ;
                      </li>
                      <li>un index (dit « table ») des formes anciennes contenues dans les articles.</li>
                    </ul>
                    <p>Si l’on met de côté l’introduction, rédigée, il existe deux façons de consulter un dictionnaire
                      topographique
                      sous forme papier : rechercher directement un article ou consulter la table des formes anciennes –
                      qui
                      renvoie
                      aux articles. Le premier mode de consultation est celui du chercheur ayant à l’esprit une forme
                      toponymique
                      « moderne » (XIX<sup>e</sup> - XX<sup>e</sup> siècle) et souhaitant, tel l’historien, vérifier
                      l’identification
                      de telle localité ou
                      connaître sa situation administrative sous l’Ancien Régime, ou bien, tel le toponymiste, déterminer
                      l’étymologie de tel toponyme et pour ce faire étudier les formes anciennes de ce dernier. Le second
                      mode
                      de
                      consultation est celui du chercheur rencontrant dans la documentation la forme ancienne – notamment
                      en
                      latin
                      ou en ancien français – d’un nom de lieu qu’il ne sait <i>a priori</i> rattacher à aucun nom de
                      lieu
                      actuel.
                    </p>
                  </article>
                  <article class="body-1">
                    <header><h2 class="font-weight-bold subheading mb-3">… au numérique</h2></header>
                    <p>Quoiqu’ouverte il y a plus d’un siècle et demi, la collection du <i>Dictionnaire topographique de
                                                                                          la
                                                                                          France</i>
                      reste un outil irremplacé. Aujourd’hui, les technologies numériques permettent de mieux tirer le
                      fruit de
                      la
                      masse de données qu’elle contient. C’est ce qui a décidé le CTHS à engager un projet de publication
                      et
                      restructuration sous forme électronique des dictionnaires imprimés.</p>
                    <p>L’opération a été rendue possible par la structure des dictionnaires édités par le CTHS : tous ont
                      obéi à
                      des prescriptions éditoriales précises et les ont assez bien respectées. Le corps de chaque
                      dictionnaire
                      départemental a ainsi pu être saisi et balisé au format XML, suivant dix unités de sens : article,
                      vedette,
                      définition, localisation, typologie, forme ancienne, commentaire, date, référence et renvoi. C’est
                      à
                      partir
                      de ce format qu’a été réalisée la base de données consultable sur ce site.</p>
                    <p>Celle-ci permet de démultiplier ces possibilités de recherche. Outre la faculté d’interroger
                      simultanément
                      plusieurs dictionnaires (et à terme, l’ensemble de la collection), d’affiner sa requête et de trier
                      les
                      réponses obtenues en combinant divers critères, elle permet de s’affranchir totalement de l’ordre
                      alphabétique – condition même de toute publication sur un support papier – ; des études portant par
                      exemple
                      sur les suffixes des noms de lieux s’en trouveront facilitées. Elle permet également d’introduire
                      des
                      requêtes ne portant plus, comme traditionnellement, sur une forme toponymique, mais sur un type
                      d’objet
                      topographique (relief, construction humaine).</p>
                    <p>Enfin, le recours à la cartographie renouvelle l’apport des dictionnaires topographiques. Ceux-ci
                      en
                      étaient malheureusement dépourvus, sans doute pour simplifier la tâche des auteurs. Désormais, les
                      toponymes
                      ont été autant que possible géolocalisés, en utilisant les référentiels de géolocalisation
                      contemporains
                      (code officiel géographique de l’INSEE et données de géolocalisation de l’IGN). Toutefois, cette
                      géolocalisation reste pour l’heure limitée à l’échelle communale, faute de données suffisamment
                      précises :
                      tous les toponymes situés sur le territoire d’une commune sont donc localisés au centroïde de cette
                      commune.
                      En dépit de cette limite, le présent outil de recherche offre désormais la possibilité de
                      visualiser
                      rapidement les résultats d’une requête, sous forme d’une carte de chaleur, puis de points.</p>
                    <p>Au-delà des usages classiques des dictionnaires dans le champ de l’histoire et de la toponymie,
                      c’est
                      donc
                      à des investigations d’un nouveau type sur les territoires et leur configuration ancienne qu’invite
                      cet
                      outil de recherche.</p>
                  </article>
                </section>
                <section>
                  <h1 class="font-weight-bold title mt-5 mb-3">Partenaires/crédits</h1>
                  <article>
                    <ul>
                      <li>le <a href="http://cths.fr/">Comité des Travaux Historiques et Scientifiques</a>, coordinateur
                          du
                          projet
                          (Claude Mordant, Michèle
                          Absalon, Christophe Marion)
                      </li>
                      <li>l’<a href="http://artehis.u-bourgogne.fr/">UMR 6298 ARTEHIS</a> (Marie-José Gasse-Grandjean,
                          Alain
                          Guerreau, Nicolas Perreaux)
                      </li>
                      <li>la <a href="http://msh-dijon.u-bourgogne.fr/">Maison des Sciences de l’Homme de Dijon, PFT ADN
                                                                        et PFT
                                                                        GEOBFC</a> (Hédi Maazaoui, Arnaud Millereux,
                          Laure Saligny)
                      </li>
                      <li>l’<a href="http://iutlecreusot.u-bourgogne.fr/recherche/laboratoires.html">IUT du Creusot –
                                                                                                    Laboratoire
                                                                                                    Le2i</a> (Patrick
                          Gorria)
                      </li>
                      <li>l’<a href="http://www.chartes.psl.eu/">Ecole nationale des chartes</a> (Olivier Canteaut,
                          Vincent
                          Jolivet, Julien Pilla)
                      </li>
                      <li>les <a href="http://www.archives-nationales.culture.gouv.fr/web/guest/centre-d-onomastique">Archives
                                                                                                                      nationales,
                                                                                                                      Centre
                                                                                                                      d’onomastique</a>
                          (Sébastien Nadiras)
                      </li>
                      <li>le <a href="https://francearchives.fr/fr/">Service Interministériel des Archives de France</a>
                      </li>
                      <li>et les <a href="https://francearchives.fr/fr/annuaire/departements#/?_k=7upuqf">services
                                                                                                          d’archives
                                                                                                          départementales</a>
                      </li>
                    </ul>
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
  name: 'LandingPage',
  components: { DefaultLayout }
}
</script>

<style scoped>
  .container {
    text-align: justify;
  }
  .head--section {
    background: lightgrey;
  }
</style>
