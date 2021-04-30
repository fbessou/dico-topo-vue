<template>
  <article>
    <h1 class="mt-5 mb-5">
      <span class="display-1">Le projet numérique depuis 2010</span>
    </h1>
    <section>
      <p>
        Le projet d’édition électronique de l’ensemble des dictionnaires topographiques a été engagé en 2010 par le <a href="http://cths.fr/" target="_blank"> CTHS</a>. Y ont pris part les <a href="https://www.archives-nationales.culture.gouv.fr/" target="_blank">Archives nationales</a>, l’<a href="http://www.chartes.psl.eu/" target="_blank">École nationale des chartes</a> et, jusqu’en 2018, l’<a href="https://www.u-bourgogne.fr/">université de Bourgogne</a>. L’acquisition des données du projet a bénéficié du soutien financier du <a href="https://francearchives.fr/" target="_blank">Service interministériel des Archives de France</a> et du réseau des <a href="https://francearchives.fr/fr/annuaire/departements" target="_blank">archives départementales</a> : archives de l'Aisne, des Hautes-Alpes, du Calvados, du Cher, de la Dordogne, de la Drôme, de l'Eure, de la Loire, de la Haute-Loire, du Morbihan, des Pyrénées-Atlantiques, de la Sarthe, de la Seine-Maritime, de la Seine-et-Marne et des Deux-Sèvres. Le consortium <a href="https://cosme.hypotheses.org/" target="_blank">COSME²</a> a également contribué financièrement à l'acquisition de données supplémentaires, en cours d'intégration.
      </p>
      <h2 class="mb-5">
        <span class="display-1 headline">Membres</span>
      </h2>
      <p>
        Direction scientifique : Olivier Canteaut (2010-), Sébastien Nadiras (2010-), Marie-José Gasse-Grandjean (2010-2018), Alain Guerreau (2010-2014)
      </p>
      <p>
        Direction administrative : Claude Mordant (2010-2018), Catherine Gros (2010-2013), Christophe Marion (2017-)
      </p>
      <p>
        Conception, développement et maintenance de l’application : Vincent Jolivet (2018-), Julien Pilla (2018-), Corentin Faye (2020-)
      </p>
      <p>
         Maintenance et hébergement d’un premier site de consultation (2015-2018). Arnaud Millereux
      </p>
      <p>
        Acquisition et traitement des données : Marie-José Gasse-Grandjean (2010-2018), Camille Burette (2017-2018), Olivier Canteaut (2018-), Vincent Jolivet (2018-), Sébastien Nadiras (2018-), Corentin Faye (2019-), Jean-Damien Généro (2019-2020)
      </p>
      <p>
        Suivi des numérisations hébergées sur PANDOR : Marie-José Gasse-Grandjean (2010-2018), Hédi Maazaoui (2011-2018), Agnès Viola (2017-)
      </p>
      <p>
        Le projet a bénéficié de l'aide et des conseils de Jean-François Moufflet (<a href="https://www.archives-nationales.culture.gouv.fr/" target="_blank">Archives nationales</a>, département du Moyen Âge et de l’Ancien Régime), Nicolas Perreaux (université Panthéon-Sorbonne, <a href="https://lamop.pantheonsorbonne.fr/" target="_blank">LAMOP</a>) et Patrick Gorria (université de Bourgogne, institut universitaire de technologie du Creusot, <a href="https://imvia.u-bourgogne.fr/" target="_blank">ImVIa</a>).
      </p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Méthodologie</span>
      </h2>
      <p>
        La chaîne de traitement définie en 2010 a été employée pour toute la durée du projet. Chaque volume départemental a tout d’abord été numérisé en mode image. Ces numérisations sont consultables depuis 2016 sur le Portail des Archives numériques et données de la recherche (<a href="https://pandor.u-bourgogne.fr/pages/toponymie-fr.html" target="_blank">PANDOR</a>) de la Maison des sciences de l’homme de Dijon – sous réserve que les ouvrages concernés soient libres de droits.
      </p>
      <p>
        Le texte des dictionnaires a dans le même temps été saisi manuellement et encodé au format XML par un prestataire. L’opération a été rendue possible par la structure des dictionnaires édités par le CTHS : tous ont obéi à des prescriptions éditoriales précises et les ont assez bien respectées. Pour chaque lieu, ont ainsi été identifiées dix unités de sens : article, vedette, définition, localisation, typologie, forme ancienne, date, référence, commentaire et renvoi. Seul le volume dédié au Cantal a fait l’objet d’un traitement distinct, puisqu’il a été saisi par les soins des archives départementales dans un tableur avant d’être converti automatiquement en XML.
      </p>
      <p>
        Ces fichiers XML, librement disponibles dans l’entrepôt <a href="https://github.com/chartes/dico-topo" target="_blank">GitHub</a> de l’École des chartes, constituent le socle documentaire du projet. Ils ont fait l’objet de plusieurs campagnes de corrections, notamment pour éliminer les coquilles et incohérences qui avaient pu échapper aux auteurs et pour restructurer certains articles. À compter de 2017, ils ont également été enrichis, automatiquement puis manuellement, afin de permettre le liage au Code officiel géographique de l’INSEE. L‘intégration des données en base est l’occasion de nouveaux enrichissements (attribution d’un identifiant, standardisation des dates, géolocalisation, liage Gallica, etc.). Accessibles via une <a href="https://dicotopo.cths.fr/documentation">API documentée</a>, les données peuvent être exportées au format <a href="https://github.com/LinkedPasts/linked-places" target="_blank">Linked Places</a>.
      </p>
      <p>
        Une premier site de consultation, créé par un prestataire et maintenu par l’université de Bourgogne, a été mis en ligne en 2012 et a permis d’interroger jusqu’à vingt-cinq dictionnaires départementaux. Une refonte complète de cette infrastructure a été entreprise à partir de 2018 par la mission Projets numériques de l’École nationale des chartes. Au terme de ce travail, une nouvelle application de consultation et une API permettant la réexploitation des données ont fait l’objet d’une publication en version de test au printemps 2019. La présente version est disponible depuis novembre 2020.
      </p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'contents'
}
</script>

<style scoped lang="scss">
figure {
  width: 500px;
  margin: 20px auto;
  img {
      width: 500px;
  }
}
figcaption {
  font-style: italic;
  color: darkgrey;
  text-align: center;
}
</style>
