<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="420"
      offset-x
    >
      <template v-slot:activator="{ on }">
        
        <v-btn
          flat fab small
          v-on="on"
          :disabled="!placenameId"
        >
         <v-icon>get_app</v-icon> {{title}}
        </v-btn>
      </template>
      
      <v-card>
        <v-list>
          <v-list-tile >
            <v-list-tile-content>
              <v-list-tile-title>Export des données</v-list-tile-title>
              <v-list-tile-sub-title>Export des données du lieu identifié</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        
        <v-divider></v-divider>
        
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
               <a :href="`${apiUrl}/placenames/${placenameId}`" target="_blank">JSONAPI</a>
                <v-chip small label class="ref-chip">{{placenameId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Export du lieu identifié au format <a href='https://jsonapi.org/format/1.0/'>JSON API 1.0</a></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <a :href="`${apiUrl}/placenames/${placenameId}?export=linkedplaces`"
                   target="_blank">Linked Places</a>
                <v-chip small label class="ref-chip">{{placenameId}}</v-chip>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Export du lieu identifié au format <a href='https://github.com/LinkedPasts/linked-places'>Linked Places</a>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
  
        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>
<script>
  export default {
    name: 'ExportMenu',
    props: {
      title: {type: String},
      placenameId : {type: String}
    },
    data: () => ({
      menu: false
    }),
    computed: {
      apiUrl() {
        return process.env.VUE_APP_API_BASE_URL
      }
    }
  }
</script>

<style scoped>
  .ref-chip {
    margin-left: 12px;
  }
</style>
