<template>
  <article>
    <h1 class="mt-5 mb-5">
      <span class="display-1">Contenus</span>
    </h1>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Les dictionnaires topographiques et leur nomenclature</span>
      </h2>
      <p>
        L’expression « dictionnaire topographique » ne reflète qu’imparfaitement le contenu des dictionnaires édités sous cette appellation : dans ses instructions initiales en 1859, Léopold Delisle évoquait un dictionnaire « géographique » ; dans l’absolu, l’adjectif « toponymique » pourrait tout aussi bien convenir.
      </p>
      <p>
        Topographiques, les dictionnaires le sont assurément : leur nomenclature est en très grande partie constituée par les noms tirés de la géographie physique (reliefs, cours d’eau, forêts etc.) et par les noms de lieux habités (communes, villages, hameaux, écarts etc.), les uns et les autres tirés notamment des
        listes des recensements de population, et des cartes de Cassini et de l’état-major. Mais ces dictionnaires sont majoritairement œuvres d’archivistes, et donc d’historiens, ce qui explique la présence, dans la nomenclature, de noms se rapportant également à l’histoire et à la géographie historique (noms de
        peuples et d’anciennes circonscriptions, fiefs, abbayes, hôpitaux, vieux chemins etc.). De manière générale, Léopold Delisle enjoignait aux futurs rédacteurs de « n’écarter aucun nom qui ait un caractère d’ancienneté et qui présente un intérêt historique ou philologique ».
      </p>
      <p>
        Aussi, en dépit de l’apparente standardisation des dictionnaires imprimés, il importe d’avoir à l’esprit que les principes qui ont régi l’établissement de leur nomenclature diffèrent sensiblement d’un volume à l’autre, en fonction des intérêts et choix scientifiques de chaque auteur – et de son investissement
        dans l’entreprise. La densité de lieux recensés (nombre d’articles du dictionnaire rapporté à la surface du département) varie en effet dans un rapport de 1 à 8 : elle dépend à la fois des caractéristiques de chaque région, notamment de l’éventuelle dispersion de son habitat – qui explique la richesse en noms
        de l’Ouest de la France –, mais aussi de l’importance des dépouillements de sources opérés par les auteurs – d’où, par exemple, la différence de volume entre la nomenclature du dictionnaire topographique de la Seine-Maritime, paru dans les années 1980 au terme de très longs travaux, et celle du dictionnaire de
        l’Eure-et-Loir, publié hâtivement dès 1861.
      </p>
      <figure>
        <img :src="require('@/assets/about_places_map.png')" alt="Carte de densité des lieux" />
        <figcaption>Densité des lieux recensés dans les dictionnaires topographiques</figcaption>
      </figure>
      <p>
        Ces remarques doivent inciter à ne pas prendre pour argent comptant le résultat d’une recherche dans l’application : la carte de résultats pour la Bourgogne d’une requête « saint martin » n’est ainsi pas la carte définitive des toponymes « Saint-Martin » en Bourgogne. Les dictionnaires topographiques livrent au
        lecteur un matériau sélectionné et ordonné par des auteurs qui, en dépit du cadre commun auquel ils se sont conformés, n’ont pas tous travaillé à l’identique.
      </p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Les formes anciennes</span>
      </h2>
      <p>
        Les dictionnaires, pensés comme un outil pour les historiens, visent avant tout à faciliter l’identification des formes anciennes de noms de lieux rencontrées dans les documents d’archives. Pour ce faire, les auteurs ont relevé les formes rencontrées dans la documentation qu’ils dépouillaient. Comme l’attestent
        les listes de sources dressées en tête de chaque volume, ce sont avant tout les archives médiévales et modernes qu’ils ont mises à profit, en particulier celles conservées par les archives départementales : cartulaires, chartriers, documents domaniaux, cartes anciennes etc.
      </p>
      <p>
        Les formes livrées par les dictionnaires sont généralement datées et référencées, de manière abrégée. Il est à noter que la plupart des auteurs n’ont mentionné que la plus ancienne occurrence de chacune des formes qu’ils avaient rencontrée au cours de leurs dépouillements ; aussi les dictionnaires ne
        permettent-ils pas de juger de la fréquence d’emploi d’une forme donnée. Seuls les volumes réalisés dans la deuxième moitié du XX<sup>e</sup> siècle ont cherché à remédier à cette limite en étoffant les listes de formes ; dans le même temps, ils ont souvent tenté de mieux contextualiser chaque forme en
        fournissant des citations plus étoffées – ce qui, en retour, est susceptible de générer du bruit dans les résultats d’une requête.
      </p>
      <p>
        De même que l’établissement de la nomenclature, la collecte des formes anciennes est donc extrêmement hétérogène d’un volume à l’autre : le nombre moyen de formes anciennes par article varie dans un rapport de 1 à 100. Les dictionnaires de l’Oise et de la Somme sont les plus riches de ce point de vue,
        puisqu’ils contiennent en moyenne six à huit formes anciennes pour chaque lieu ; à l’inverse, ceux de la Loire-Atlantique et du Morbihan n’en contiennent même pas une pour dix lieux.
      </p>
      <figure>
        <img :src="require('@/assets/about_placenames_map.png')" alt="Carte de densité des formes anciennes" />
        <figcaption>Nombre moyen de formes anciennes par lieu dans les dictionnaires topographiques</figcaption>
      </figure>
      <p>
        Comme pour la nomenclature, il convient donc de garder en tête que les dictionnaires topographiques livrent au lecteur un matériau résultant d’une sélection plus ou moins objective. À ce titre, comme toute donnée ou source secondaire, les données fournies par les dictionnaires doivent être évaluées, critiquées
        et complétées par celles d’autres sources.
      </p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Les corrections apportées à l’imprimé</span>
      </h2>
      <p>En dépit de ces divers défauts, le contenu des dictionnaires n’a pas été modifié ni actualisé. Les interventions se sont limitées à :</p>
      <ul>
        <li>la correction des coquilles et des erreurs manifestes ;</li>
        <li>la mise en cohérence des données relatives aux circonscriptions administratives, certains dictionnaires n’ayant que partiellement tenu compte des fusions ou créations de commune les plus récentes ;</li>
        <li>la réorganisation des informations relatives à un lieu, ce qui a pu conduire à modifier l’ordre de rédaction initial ;</li>
        <li>la division d’articles traitant en un seul mouvement de plusieurs lieux homonymes ;</li>
        <li>enfin, de manière exceptionnelle, la création de notices pour des communes qui avaient été omises par erreur.</li>
      </ul>
      <p>Ce travail de correction a été mené de manière plus ou moins approfondie en fonction des caractéristiques formelles de chaque dictionnaire ; il est encore en cours.</p>
      <p>
        Seuls deux dictionnaires ont vu leurs données modifiées plus substantiellement : celui du Cantal a fait l’objet d’une actualisation du cadre communal par les soins des archives départementales, tandis que celui de la Côte-d’Or a bénéficié des corrections qu’a effectuées Gérard Moyse durant sa carrière à la tête
        des archives départementales et qu’il nous a aimablement transmises.
      </p>
      <p>Le recours aux images numérisées des dictionnaires imprimés, accessibles pour la plupart d’entre eux depuis la notice détaillée de chaque article, permettra le cas échéant à l’utilisateur de constater ces modifications ponctuelles.</p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">La géolocalisation</span>
      </h2>
      <p>
        Les dictionnaires imprimés localisent chaque lieu par rapport à la circonscription administrative englobante immédiatement supérieure. Ces indications n’ont pas été modifiées, comme le reste du contenu des dictionnaires. Cependant, elles sont parfois périmées et apparaissent aujourd’hui insuffisantes pour
        permettre de localiser efficacement un lieu. Aussi chaque lieu s’est-il vu doté, autant que possible, de l’identifiant que le code officiel géographique de l’INSEE attribuait en 2011 à la ou aux communes auxquelles il appartient.
      </p>
      <p>
        Grâce à ce code, sont désormais adjointes aux indications des dictionnaires imprimés un certain nombre d’informations complémentaires sur chaque lieu, en particulier les circonscriptions administratives auxquelles celui-ci était rattaché à la date de 2011, la liste des lieux qui appartenaient à cette date à la
        même commune, et les coordonnées géographiques de cette dernière, ce qui permet de la localiser sur une carte. Il convient néanmoins de noter que, lorsqu’un lieu relève conjointement de plusieurs communes, seule la première d’entre elles est prise en compte sur la carte.
      </p>
      <p>
        Ce travail de géolocalisation a été à la fois automatisé et manuel ; son efficacité dépend en large part de la rigueur formelle plus ou moins grande de chaque dictionnaire. Aussi les lieux recensés sont-ils géolocalisés dans des proportions variables selon les départements : en moyenne, 95 % d’entre eux le sont
        pour l’ensemble des volumes actuellement en ligne, mais cette proportion tombe à 75 % pour la Moselle dans ses limites d’avant 1871.
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
