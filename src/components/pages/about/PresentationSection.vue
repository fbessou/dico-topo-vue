<template>
  <article>
      <h1 class="mt-5 mb-5">
        <span class="display-1">Présentation</span>
      </h1>
      <p>
        La collection du <i>Dictionnaire topographique de la France</i> constitue un outil indispensable pour l’étude de l’histoire et de la géographie ancienne du territoire français : publiée sous la forme de volumes départementaux depuis 1860, elle rassemble des centaines de milliers de noms de lieux, recueillis
        sous leurs graphies anciennes et modernes dans les documents d’archives. C’est aux données réunies dans ce cadre que la présente application donne accès, sous une forme profondément renouvelée grâce à l’apport des technologies numériques.
      </p>
      <p>
        Les capacités de recherche au sein de ces données se trouvent désormais démultipliées. Est ainsi offerte la possibilité d’interroger l’ensemble de la collection, de trier et filtrer les réponses obtenues, de faire porter une requête sur tout ou partie d’un nom, ou encore d’effectuer des recherches floues,
        portant sur les graphies proches d’un nom.
      </p>
      <p>
        Le recours au numérique a également autorisé une actualisation partielle des données : si le texte en ligne reste celui des dictionnaires imprimés, hormis des corrections limitées, chaque lieu a été localisé par rapport à la géographie administrative de 2011 – date retenue car antérieure au mouvement de fusions communales lancé par les lois de réforme des collectivités territoriales de 2010 et 2015 et au redécoupage cantonal de 2014. Un lien vers le <a href="https://www.insee.fr/fr/information/2016807" target="_blank">code officiel géographique de l’INSEE</a> offre par ailleurs la possibilité de situer chaque commune dans la hiérarchie administrative
        actuelle.
      </p>
      <p>
        En outre, le traitement numérique a permis de doter le projet d’une dimension cartographique qui faisait défaut aux dictionnaires imprimés. Les toponymes se trouvent désormais, autant que possible, géolocalisés. Toutefois, cette géolocalisation reste pour l’heure limitée à l’échelle communale, faute de données
        suffisamment précises : tous les toponymes situés sur le territoire d’une commune sont donc localisés au centre géographique de cette dernière. En dépit de cette limite, le présent outil de recherche offre désormais la possibilité de visualiser rapidement sur une carte les résultats d’une requête.
      </p>
      <p>
        Enfin, les données sont accessibles aux formats JSON API 1.0 et Linked Places grâce à une <a href="https://dicotopo.cths.fr/documentation">API</a> et librement réexploitables dans le cadre d’applications web. L’attribution à chaque lieu d’un identifiant pérenne garantit les conditions de cette réexploitation et
        permet d’ériger le <i>Dictionnaire topographique de la France</i> en référentiel géohistorique.
      </p>
      <p>
        Cette application est toujours en cours de développement. Sa couverture territoriale sera encore étendue par l’intégration de nouveaux dictionnaires ou d’autres types de sources, tels que les pouillés ecclésiastiques, pour les départements ne faisant pas l’objet d’un dictionnaire. De nouvelles fonctionnalités
        de recherche seront à terme implémentées, notamment des tris et filtres par date et par type de lieu. L’équipe du projet travaille enfin à l’amélioration de la géolocalisation à l’échelle infra-communale.
      </p>
  </article>
</template>

<script>
export default {
  name: 'aboutRoot'
}
</script>

<style scoped></style>
