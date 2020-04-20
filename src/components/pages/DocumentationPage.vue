<template>
  <v-app>
    <main-toolbar></main-toolbar>

    <v-navigation-drawer permanent app  fixed style="border-top: 1px solid darkgrey">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Documentation
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list two-line subheader>
        <v-subheader>Services</v-subheader>

        <v-list dense>
          <v-list-tile
            v-for="feat in features"
            :key="feat.anchor"
          >
            <v-list-tile-content >
              <v-list-tile-title><a :href="'#' + feat.anchor">{{ feat.attributes.title }}</a></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-list>

      <v-list subheader two-line >
        <v-subheader>Ressources</v-subheader>
        <v-list dense>
        <v-list-tile
          v-for="res in resources"
          :key="res.anchor"
        >
          <v-list-tile-content >
            <v-list-tile-title><a :href="'#' + res.anchor">{{ res.title }}</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </v-list>
      </v-list>

    </v-navigation-drawer>

    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex  xs12>
              <h1>Documentation de l'API Dicotopo</h1>
              <img src="@/assets/json-api-logo-300x113.png" height="100px" style="padding: 8px;"/>
              <p>
                La présente API a été conçue conformément à la spécification
                <a href='https://jsonapi.org/format/1.0/'>JSON API 1.0</a>.
                <br/>
                Les resources sont disponibles en HTTPS via la méthode GET
              </p>
          </v-flex>

          <h2>Services</h2>
          <v-flex xs12  v-for="feat in features" :key="feat.anchor">
            <v-card class="vcard">
              <v-toolbar flat>
                <v-card-title><h3 :id="feat.anchor">{{feat.attributes.title}}</h3></v-card-title>
              </v-toolbar>
              <v-card-text>
                <p>{{feat.attributes.content}}</p>
                <v-data-table
                  :headers="[{ text: 'description', value: 'desc', sortable:false },
                              { text: 'url', value: 'url', sortable:false }]"
                  :items="feat.attributes.examples"
                  class="elevation-0"
                  :hide-actions="true"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.description }}</td>
                    <td><a :ref="props.item.content" target="_blank">{{ props.item.content}}</a></td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-flex>

          <h2>Ressources</h2>

          <v-flex xs12>
            <v-card class="vcard">
              <v-toolbar flat>
                <v-card-title><h3 :id="parameters">Paramètres HTTP GET disponibles</h3></v-card-title>
              </v-toolbar>
              <v-card-text>
                <v-data-table
                  :headers="[{ text: 'nom', value: 'nom', sortable:false },
                              { text: 'description', value: 'desc', sortable:false },
                              { text: 'type', value: 'type', sortable:true }]"
                  :items="parameters"
                  class="elevation-0"
                  :hide-actions="true"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.attributes.name }}</td>
                    <td>{{ props.item.attributes.description}}</td>
                    <td>{{ props.item.attributes['item-kind'] }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 v-for="res in resources" :key="res.anchor">
            <v-card class="vcard">
              <v-toolbar flat class="blue-grey lighten-1" dark>
                <v-card-title><h3 :id="res.anchor">{{res.title}}</h3></v-card-title>
              </v-toolbar>
              <v-card-text>
                <p>{{res.attributes.description}}</p>
                <h4>Collection</h4>
                <v-chip label small>Url</v-chip><a :href="res.attributes.endpoints.collection.url" target="_blank">{{res.attributes.endpoints.collection.url}}</a>

                <v-layout row wrap>
                  <v-flex xs6>
                    <h4>Ressource</h4>
                    <v-chip label small>Url</v-chip>
                    {{res.attributes.endpoints.resource.url}}
                    <h5>Attributs</h5>
                    <v-data-table
                      :headers="[{ text: 'nom', value: 'name', sortable:false },
                              { text: 'description', value: 'desc', sortable:false }]"
                      :items="res.attributes.endpoints.resource.attributes"
                      class="elevation-0"
                      :hide-actions="true"
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.description}}</td>
                      </template>
                    </v-data-table>
                    <h5>Relations</h5>
                    <v-data-table
                      :headers="[{ text: 'nom', value: 'name', sortable:false },
                              { text: 'description', value: 'desc', sortable:false },
                              { text: 'type', value: 'type', sortable:true }]"
                      :items="res.attributes.endpoints.resource.relationships"
                      class="elevation-0"
                      :hide-actions="true"
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.description}}</td>
                        <td><a :href="'#' + props.item.ref">{{ props.item.type}} de type {{ props.item.ref}}</a></td>
                      </template>
                    </v-data-table>
                  </v-flex>

                  <v-flex xs6>
                      <pre v-show="!!curlOutputs[res.attributes.examples.url]"
                           style="background-color: #f5f5f5;"
                           > CURL -X GET {{res.attributes.examples.url}}
  <code style="background-color: white;  max-height: 540px; overflow-y: scroll; margin: 14px"
        class="javascript">{{curlOutputs[res.attributes.examples.url]}}</code></pre>
                  </v-flex>
                </v-layout>

              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MainToolbar from '../ui/MainToolbar'
import { api } from '@/utils/http-common'
import Vue from 'vue'

export default {
  name: 'DocumentationPage',
  components: { MainToolbar },
  data () {
    return {
      capabilities: [],
      features: [],
      resources: [],
      parameters: [],
      curlOutputs: {}
    }
  },
  created () {
    api.get(`../1.0?capabilities`).then(r => {
      this.capabilities = r.data
      this.features = this.capabilities.data.filter(c => c.type === 'feature').map(c => {
        return { title: c.id, anchor: `${c.id}`, ...c }
      })
      this.parameters = this.capabilities.data.filter(c => c.type === 'parameter').map(c => {
        return { anchor: `${c.id}`, ...c }
      })
      this.resources = this.capabilities.data.filter(c => c.type === 'resource').map(c => {
        this.runCURL(c.attributes.examples.url)
        return {
          title: c.id,
          anchor: `${c.id}`,
          ...c
        }
      })
    })
  },
  methods: {
    runCURL (url) {
      return api.get(url).then(r => {
        Vue.set(this.curlOutputs, url, r.data)
      })
    }
  },
  computed: {

  }
}
</script>

<style scoped>
  .vcard {
    margin-top: 18px;
  }
</style>
