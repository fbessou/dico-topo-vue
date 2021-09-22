<template>
  <article>
    <v-card
      v-if="!!placeItem"
      class="mx-auto"
      :class="`${popup ? 'place-card-popup' : 'place-card'}`"
    >
      <div class="grey lighten-4">
        <v-card-title class="display-1 font-weight-medium">
          <div style="width: 100%">
            <span class="" v-html="placeItem.label" />
            <span v-if="popup" class="title-buttons">
              <v-btn small icon @click="flyToSelectedItem" class="mr-3">
                <v-icon>location_on</v-icon>
              </v-btn>
              <v-btn small icon :to="`/places/${placeItem.id}`">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
              <v-btn small icon class="ml-2" @click="unselectPlace">
                <v-icon>close</v-icon>
              </v-btn>
            </span>
          </div>
          <administrative-breadcrumbs />
        </v-card-title>
      </div>

      <div class="d-flex flex-row"  v-if="placeItem && placeItem.responsibility">
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-card-subtitle v-on="on">
                  <a v-if="placeItem.responsibility.attributes.bibl.gallica_ark" :href="gallicaLink" target="__blank" v-html="computedBiblRef"/>
                  <span v-else v-html="computedBiblRef"/>
                </v-card-subtitle>
            </template>
            <span v-html="placeItem.responsibility.attributes.bibl.bibl"/>
          </v-tooltip>
        <div class="iiif-buttons">
        <v-tooltip bottom  v-if="!popup && IIIFAvailability">
          <template v-slot:activator="{ on }">
            <v-btn  v-on="on"
              icon
              @click="toggleIIIFViewerVisibility"
              :class="showIIIFViewer ? 'blue--text' : ''"
            >
              <v-icon>mdi-book-open-outline</v-icon>
            </v-btn>
          </template>
             <span v-if="!showIIIFViewer">
               Afficher la source secondaire
             </span>
                <span v-else>
               Cacher la source secondaire
             </span>
          </v-tooltip>
        </div>
      </div>

      <v-card-text
        class="text-justify text--primary body-1"
        style="min-height: 80px"
        :class="`${popup ? 'scrollable' : ''}`"
      >
        <div v-for="(description, idx) in placeItem.descriptions" :key="idx">
          <p v-html="description.attributes.content" />
        </div>
      </v-card-text>

      <v-expansion-panels
        accordion
        flat
        hover
        light
        v-model="panel"
        :multiple="!popup"
      >
        <v-expansion-panel :disabled="placeOldLabels.length === 0">
          <v-expansion-panel-header class="grey lighten-4">
            <div class="subtitle-1 font-weight-medium">
              Formes anciennes ({{ placeOldLabels.length }})
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="body-2 pt-4"
            :class="`${popup ? 'scrollable' : ''}`"
            v-show="placeOldLabels.length > 0"
          >
            <!-- <a class="caption">Table des abréviations</a> -->
            <ul class="mt-2">
              <li v-for="oldLabel in placeOldLabels" :key="oldLabel.id">
                <span class="font-weight-medium" v-html="oldLabel.label" />
                <span v-html="prettifyOldLabel(oldLabel)" />
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel :disabled="placeItem && placeItem.comments.length < 1">
          <v-expansion-panel-header class="grey lighten-4">
            <div class="subtitle-1 font-weight-medium">Commentaire</div>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="text-justify body-1 pt-4"
            :class="`${popup ? 'scrollable' : ''}`"
          >
            <article v-for="(comment, idx) in placeItem.comments" :key="idx">
              <p class="" v-html="comment.attributes.content" />
            </article>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel :disabled="linkedPlaces.length === 0">
          <v-expansion-panel-header class="grey lighten-4">
            <div class="subtitle-1 font-weight-medium" :key="commune.id">
              {{ linkedPlacesPanelLabel }} ({{ linkedPlaces.length }})
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="text-justify body-2 pt-4"
            :class="`${popup ? 'scrollable' : 'scrollable-tall'}`"
            v-show="linkedPlaces.length > 0"
          >
            <ul class="mt-2">
              <li v-for="lp in linkedPlaces" :key="lp.id">
                <router-link
                  class="font-weight-medium"
                  :to="{ name: 'place', params: { placeId: lp.id } }"
                  >{{ lp.label }}</router-link
                >
                <div v-for="(description, idx) in lp.descriptions" :key="idx">
                  <div  class="capitalize-first-letter" v-html="description"/>
                </div>
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </article>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AdministrativeBreadcrumbs from './AdministrativeBreadcrumbs'

export default {
  name: 'PlaceCard',
  components: { AdministrativeBreadcrumbs },
  props: {
    placeId: { type: String },
    popup: { type: Boolean, default: true }
  },
  data: () => {
    return {
      panel: [0]
    }
  },
  mounted () {
    this.fetchData(this.placeId)
  },
  methods: {
    ...mapActions('searchParameters', ['toggleIIIFViewerVisibility']),
    ...mapActions('mapmarkers', ['setFlyToItem']),
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('PlaceCard', ['fetchPlaceCard', 'clearPlaceCard']),
    ...mapActions('commune', { fetchCommune: 'fetch', clearCommune: 'clear' }),

    async fetchData (id) {
      console.log('fetch place page data', id)
      this.clearPlaceCard()
      this.clearCommune()
      await this.fetchPlaceCard(id)
      if (this.placeItem.insee_code) {
        await this.fetchCommune(this.placeItem.insee_code)
      }
    },
    prettifyOldLabel (o) {
      const date = o.date ? o.date : ''
      const ref = o.reference ? `(${o.reference})` : ''
      return `, ${date} ${ref}`
    },
    flyToSelectedItem () {
      const longlat = this.commune.data.attributes.longlat
      const coords = longlat.substr(1, longlat.length - 2).split(',')

      const item = {
        id: this.placeItem.id,
        coordinates: [
          parseFloat(coords[1]),
          parseFloat(coords[0])
        ]
      }
      this.setFlyToItem(item)
    }
  },
  computed: {
    ...mapState('PlaceCard', ['placeItem', 'placeOldLabels', 'linkedPlaces']),
    ...mapState('commune', ['commune']),
    ...mapState('searchParameters', ['showIIIFViewer']),
    ...mapState('mapmarkers', ['flyToItem']),
    ...mapGetters('PlaceCard', ['computedBiblRef', 'gallicaLink', 'IIIFAvailability']),
    linkedPlacesPanelLabel () {
      if (!this.commune || !this.commune.data) {
        return 'Autres lieux'
      }
      return `${
        this.linkedPlaces.length === 1 ? 'Autre lieu à' : 'Autres lieux à'
      } ${this.commune.data.attributes['NCCENR']}`
    }
  }
}
</script>

<style>

.place-card-popup {
  position: absolute !important;
  top: 90px  !important;
  left: 60px  !important;
  width: 650px  !important;
  z-index: 10000  !important;
}
.title-buttons {
  float: right;
}
.iiif-buttons {
  padding: 8px;
  position: absolute;
  right: 12px;
}
.scrollable {
  max-height: 350px;
  overflow-y: auto;
}
.scrollable-tall {
  max-height: 800px;
  overflow-y: auto;
}
p::first-letter,
.capitalize-first-letter::first-letter {
  text-transform: uppercase;
}
.sc {
  font-variant: small-caps !important;
}
dfn {
    font-style: normal !important;
}

@media screen and (max-width: 760px) {
  .place-card-popup {
    display:none;
  }
}

</style>
