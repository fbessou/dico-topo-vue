<template>
  <article>
    <h1 class="mt-5 mb-5">
      <span class="display-1">Historique</span>
    </h1>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Une entreprise éditoriale du XIX<sup>e</sup> siècle</span>
      </h2>
      <p>Le <i>Dictionnaire topographique de la France</i> est une entreprise éditoriale du Comité des travaux historiques et scientifiques (CTHS), organisme d’État créé sous la Monarchie de juillet afin de développer la recherche, notamment historique, via la publication de documents inédits.</p>
      <p>
        Son lancement remonte à l’année 1859 : cette année-là, l’historien Léopold Delisle publiait dans la <a href="https://gallica.bnf.fr/ark:/12148/bpt6k358678/f167.image" target="_blank">Revue des sociétés savantes des départements</a> un rapport sur « le plan d’un dictionnaire géographique de la France ancienne et
        moderne ». Alors que la science historique commençait à se pratiquer de façon méthodique, il s’agissait de doter les savants d’un outil de travail pour l’étude de l’histoire, de la géographie et de la topographie anciennes des provinces françaises. L’ambition était dès l’origine nationale : c’est un – et un
        seul – dictionnaire que le Comité entendait alors élaborer, sorte de pendant scientifique du dictionnaire des postes. En raison de la longueur prévisible de l’entreprise, on opta toutefois rapidement pour le principe d’une publication par livraison : un dictionnaire par département, l’ensemble devant être
        couronné par un index général des noms de lieux anciens.
      </p>
      <p>
        Les débuts furent prometteurs : pas moins de dix-neuf dictionnaires parurent entre 1861 et 1884, dus principalement aux archivistes départementaux, parfois à d’autres érudits, correspondants locaux du Comité. Le mouvement se poursuivit à un rythme plus modéré, à raison de deux à quatre dictionnaires par
        décennie jusqu’aux années 1920, les derniers volumes publiés étant ceux de la Sarthe et de la Seine-et-Marne (années 1950), de la Seine-Maritime (années 1980) et, dernier en date, de la Saône-et-Loire (2008). Ce sont aujourd’hui trente-cinq départements qui sont couverts par cette collection, représentant plus
        du tiers du territoire national métropolitain.
      </p>
      <p>
        On peut légitimement trouver ce taux insuffisant ; c’est que la réalisation d’un dictionnaire topographique est une œuvre de longue haleine, reposant sur le dépouillement d’importantes masses documentaires. Du reste, l’apport du Comité des travaux historiques et scientifiques ne se limita pas aux seuls volumes
        publiés par ses soins. En lançant son projet, le Comité proposait en effet, pour la collecte et le classement des noms de lieux anciens, un cadre et un modèle dont purent s’emparer d’autres érudits désireux de constituer des corpus de toponymie historique : une dizaine de dictionnaires, publiés chez des
        éditeurs privés ou restés manuscrits, reprennent, sinon les normes de présentation, du moins l’esprit de la collection du <i>Dictionnaire topographique de la France</i>. Le présent outil de recherche numérique a cherché à les adjoindre, autant que possible, aux trente-cinq volumes édités par le CTHS.
      </p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">De l’imprimé au numérique</span>
      </h2>
      <p>Suite à la parution en 2008 du dernier dictionnaire réalisé à ce jour, dédié à la Saône-et-Loire, le CTHS a engagé en 2010 un projet d’édition électronique de l’ensemble des dictionnaires qu’il avait publiés jusqu’alors.</p>
      <p>
        Pour ce faire, a été mise en place une chaîne de traitement employée pour toute la durée du projet. Chaque volume départemental a été numérisé en mode image. Ces numérisations sont consultables depuis 2016 sur le Portail des Archives numériques et données de la recherche (<a
          href="https://pandor.u-bourgogne.fr/ead.html?id=FRMSH021_00044&c=FRMSH021_00044_TopoFrance-1-2#!{%22content%22:[%22FRMSH021_00044_tt1-2-1%22,false,%22%22]}"
          target="_blank"
          >PANDOR</a
        >) de la Maison des sciences de l’homme de Dijon – sous réserve que les ouvrages concernés soient libres de droits. L’encodage XML du texte des dictionnaires a été rendu possible par la structure des dictionnaires édités par le CTHS : tous ont obéi à des prescriptions éditoriales précises et les ont assez bien
        respectées.
      </p>
      <p>
        Ces fichiers XML, librement disponibles sur l’entrepôt <a href="https://github.com/chartes/dico-topo">Github de l’École des chartes</a>, constituent le socle documentaire du projet. Ils ont fait l’objet de plusieurs campagnes de corrections, notamment pour éliminer les coquilles et incohérences qui avaient pu
        échapper aux auteurs et pour restructurer certains articles. À compter de 2017, ils ont été enrichis afin de permettre le développement de l’application cartographique.
      </p>
      <p>
        Un premier site web hebergée par l’université de Bourgogne a été mise en ligne en 2012 et a permis d’interroger jusqu’à vingt-cinq dictionnaires départementaux. Une refonte complète a été entreprise à partir de 2018 par la mission Projets numériques de l’École nationale des chartes. Au terme de ce travail, une
        nouvelle application de consultation et une API permettant la réexploitation des données ont fait l’objet d’une publication en version de test au printemps 2019.
      </p>
      <p>La présente version, corrigée, munie de nouveaux identifiants pérennes et donnant accès à quarante dictionnaires, est disponible depuis novembre 2020.</p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'history'
}
</script>

<style scoped></style>
