<template>
  <article>
    <h1 class="mt-5 mb-5">
      <span class="display-1">Mode d'emploi</span>
    </h1>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Recherche</span>
      </h2>
      <p>La recherche dans la base de données porte sur des noms de lieux (toponymes), interrogeables sous leur forme
        moderne, c’est-à-dire en usage à la date de rédaction du dictionnaire (XIX<sup>e</sup>-XX<sup>e</sup> siècles),
        ou sous leurs formes anciennes. Ainsi, une requête sur le terme <code>hameau</code> donnera comme résultats les
        seuls lieux dont les noms actuels ou anciens incluent précisément ce terme, indépendamment de la nature dudit
        lieu à l’époque de la rédaction du dictionnaire (hameau ou non, lieu déserté etc.). Une requête portant sur
        plusieurs termes aura pour réponses les lieux dont les noms actuels ou anciens contiennent l’ensemble des termes
        recherchés : la requête <code>château neuf</code> aura donc pour résultats tant <code>Château Neuf</code> que
        <code>Neuf Château</code>, mais exclura les lieux dont la dénomination contient uniquement <code>château</code>
        ou <code>neuf</code>.</p>
      <p><b>Chaînes de caractères</b>. Il est à noter que les variations entre majuscule et minuscule, les traits
        d’union et l’ensemble des accents et des signes diacritiques ont été neutralisés : une recherche donnera les mêmes
        résultats qu’elle porte sur <code>chatillon</code> ou sur <code>Châtillon</code>, sur <code>saint etienne</code>
        ou sur <code>Saint-Étienne</code>. Enfin, il est possible d’utiliser les signes <code>?</code> et <code>*</code>
        pour remplacer un ou plusieurs caractères, ce qui permet notamment de rechercher l’ensemble des noms comportant
        le même suffixe ou le même préfixe.</p>
      <p><b>Recherche floue</b>. La réglette <code>Exact | Flou | Très flou</code> permet de faire varier la sensibilité
        du moteur de recherche : ainsi, une recherche exacte portant sur le terme <code>condamine</code> se limitera
        strictement aux toponymes, anciens ou modernes, incluant cette chaîne de caractères ; une recherche floue
        offrira, en plus, diverses variantes graphiques telles que <code>Condamina</code>, <code>Contamine</code>,
        <code>Coundamine</code>… ; une recherche très floue, des formes encore plus éloignées telles que
        <code>Condominoe</code>, <code>Condemène</code>…, et même des formes sans aucune parenté avec la séquence
        recherchée (<code>condamné</code>, <code>Codaine</code>…).</p>
      <p><b>Agrégation des résultats</b>. La case <code>Regrouper par lieu</code> permet de choisir entre deux options
        de mise en forme du tableau des résultats de la recherche :</p>
      <ul>
        <li>par défaut, toutes les occurrences du terme recherché qui se rapportent à un seul et même lieu, constituent
          un seul et même résultat ;
        </li>
        <li>si l’on décoche la case, chaque forme toponymique contenant le terme recherché constituera un résultat
          indépendant. Il y a alors autant de résultats que d’occurrences du terme recherché.
        </li>
      </ul>
      <p>Les résultats de la recherche s’affichent sous la double forme d’un tableau et d’une carte.</p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Le tableau des résultats</span>
      </h2>
      <p>Le tableau des résultats fournit un aperçu synthétique des réponses à la requête posée. Il peut être replié
        (flèche centrale) ou à l’inverse déplié en plein écran (double flèche à droite), selon que l’on souhaite ou non
        conserver la carte visible à l’écran.</p>
      <p>Pour chaque lieu répondant à la requête, y figurent :</p>
      <ul>
        <li>un renvoi vers la carte, symbolisé par <v-icon>location_on</v-icon> ;</li>
        <li>dans la colonne <code>Lieu</code>, le label du lieu (la vedette de l’article que lui consacre le
          dictionnaire) ;</li>
        <li>dans la colonne <code>Formes anciennes</code>, la ou les formes anciennes qu’a revêtues ce nom ; il est à
          noter que, lorsque l’option <code>Regrouper par lieu</code> est décochée, toute occurrence du terme recherché
          qui correspond au nom actuel du lieu se trouve également reproduite à l’identique dans cette colonne.</li>
      </ul>
      <p>C’est donc dans l’une ou l’autre de ces deux colonnes, parfois dans les deux, que figure la chaîne de
        caractères recherchée lors de la requête.</p>
      <p>Figurent ensuite pour chaque lieu :</p>
      <ul>
        <li>ses département, canton et commune d’appartenance à la date de 2011 ; lorsqu’un lieu est situé conjointement
          dans plusieurs communes, seule la première d’entre elles figure ici ; lorsqu’une commune est divisée entre
          plusieurs cantons, ce qui est fréquent pour les grands centres urbains, il n’a pas été possible de déterminer
          précisément le canton dont dépendent les différents lieux situés dans le territoire communal, auquel cas la
          colonne « Canton » mentionne le nom de la commune suivi de l’indication NP (« non précisé ») ;</li>
        <li>la description qu’en donne le dictionnaire topographique, à savoir la nature de ce lieu et la
          circonscription administrative dont il dépendait à la date de rédaction du dictionnaire. Cette circonscription
          peut être différente de celle qui est mentionnée dans les colonnes précédentes, par exemple si une commune a
          fusionné avec une autre entre la date de rédaction du dictionnaire et 2011.</li>
      </ul>
      <p><b>Filtres et tris</b>. Les résultats du tableau, triés par défaut par ordre alphabétique de nom de lieu,
        peuvent être triés par département, canton ou commune d’appartenance en cliquant sur la flèche
        <v-icon>arrow_downward</v-icon> située à droite de l’intitulé de la colonne. Un premier clic active le tri par
        ordre alphabétique, un deuxième l’inverse, un troisième le désactive. Plusieurs critères de tri peuvent être
        appliqués simultanément, auquel cas un numéro indique leur ordre de priorité.
        Enfin, les résultats peuvent être filtrés par département et par canton en cliquant sur le symbole
        <v-icon>mdi-filter</v-icon> et en sélectionnant une ou plusieurs options ; le tableau se limite alors aux lignes
        de résultats correspondant à des lieux situés dans le ou les départements ou cantons sélectionnés.
      </p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">La cartographie</span>
      </h2>
      <p>La carte constitue le second moyen d’affichage des résultats d’une requête. Ceux-ci sont projetés sous la forme
        d’une carte de chaleur ; un zoom avant permet de les visualiser sous la forme de points : chaque point bleu
        correspond à une ligne du tableau des résultats de recherche. Lorsqu’un lieu figurant dans les résultats est
        situé conjointement dans plusieurs communes, seule la première d’entre elles est signalée par un point.</p>
      <p><b>Zoom</b>. Il est possible de zoomer sur un lieu précis sélectionné dans le tableau de résultats en cliquant
        sur le symbole <v-icon color="primary">location_on</v-icon>.
      </p>
      <p>La très grande majorité des lieux faisant l’objet d’un article dans les dictionnaires a pu être géolocalisée.
        Cette géolocalisation a été effectuée à l’échelle communale et se limite à celle-ci. Ainsi l’ensemble des lieux
        situés dans une commune sont, par convention, géolocalisés au centre géographique de celle-ci. De ce fait, il ne
        faut pas s’étonner, dans le cas d’une recherche aboutissant à plusieurs lieux situé sur le même territoire
        communal, de voir ces différents lieux localisés strictement au même point, qui plus est différent de ceux
        qu’indiquent d’autres bases de données cartographiques. Seul le recours à celles-ci ou aux fonds de carte
        proposés par l’application permettra éventuellement de préciser la localisation de chacun.</p>
      <p><b>Fond</b>. Par défaut, les résultats sont affichés sur un fond de carte fourni par <a
        href="https://www.openstreetmap.fr/" target="_blank">Open Street Map</a>. L’icône <span
        class="img-layers"></span> en haut à droite permet de modifier la transparence de ce fond pour laisser
        apparaître la carte de Cassini ou supprimer tout fond de carte.</p>
    </section>
    <section>
      <h2 class="mb-5">
        <span class="display-1 headline">Les notices détaillées</span>
      </h2>
      <p>Cliquer sur un nom de lieu dans le tableau de résultats ou sur un point de la carte permet d’afficher, en
        vis-à-vis de celle-ci, la notice détaillée relative à ce lieu, contenant le texte du dictionnaire topographique,
        ainsi que des informations complémentaires.</p>
      <p>À la suite du nom du lieu, dans la forme retenue par le dictionnaire comme étant en usage à la date de sa
        rédaction, figurent :</p>
      <ul>
        <li>les département, canton et commune dont dépendait ce lieu à la date de 2011 ;</li>
        <li>la référence bibliographique du dictionnaire dont est tiré le texte de la notice ; lorsque ce dictionnaire a
          été numérisé sur Gallica, il est possible de l’afficher dans un nouvel onglet du navigateur en cliquant sur
          cette référence, ou bien en regard de la notice, à la place de la carte, en cliquant sur l’icône
          <v-icon>mdi-book-open-outline</v-icon>
          située à droite ;
        </li>
        <li>le texte de la notice, composé de tout ou partie des trois éléments suivants : une description du lieu,
          précisant notamment sa nature et sa localisation à la date de rédaction du dictionnaire ; une liste des formes
          anciennes du nom de ce lieu, chaque forme étant datée et munie d’une référence documentaire ; un commentaire
          historique plus ou moins développé. Il est à noter que les références documentaires accompagnant les formes
          anciennes sont abrégées ; la plupart d’entre elles sont explicitées dans l’introduction de chaque
          dictionnaire, introductions qu’il est possible de consulter en version océrisée sur Gallica ou sur <a
            href="https://pandor.u-bourgogne.fr/pages/toponymie-fr.html" target="_blank">PANDOR</a>.
        </li>
        <li>la liste des lieux situés dans la même commune (dans son périmètre de 2011) ;</li>
        <li>des liens vers plusieurs sites web de référence susceptibles de donner des informations complémentaires sur
          le lieu recherché (renseignements principalement disponibles pour les communes) ;
        </li>
        <li>enfin, des liens permettant de citer cette notice en utilisant son adresse pérenne et de télécharger son
          contenu aux formats <a href="https://dicotopo.cths.fr/documentation">JSON API</a> et <a
            ref="https://github.com/LinkedPasts/linked-places" target="_blank">Linked Places</a>.
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'UserGuideSection'
  }
</script>

<style scoped>
  .img-layers {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-image: url(data:image/png;base64,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);
    position: relative;
    top: 15px;
  }
</style>
