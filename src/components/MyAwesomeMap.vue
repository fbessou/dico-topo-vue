<template>
  <l-map class="l-map" ref="map" :zoom="zoom" :center="center" :max-zoom="17">
  
  </l-map>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  
  import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from 'vue2-leaflet'
  import * as Gp from 'geoportal-extensions-leaflet'
  import styles from '../../node_modules/geoportal-extensions-leaflet/dist/GpPluginLeaflet.css'

  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
  import 'leaflet.markercluster/dist/leaflet.markercluster.js';
  
  require('leaflet.heat')
  
  export default {
    name: 'MyAwesomeMap',
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
      LMarker,
      LPopup
    },
    data () {
      return {
        zoom: 13,
        center: [49.56001319148936, 3.615102414893616],
        
        markerLayer: null,
        heatLayer: null
      }
    },
    methods: {
      addIGNServices: function () {
        const ignLayers = [
          //'GEOGRAPHICALGRIDSYSTEMS.CASSINI',
          //'ORTHOIMAGERY.ORTHOPHOTOS',
          'GEOGRAPHICALGRIDSYSTEMS.CASSINI',
          // "CADASTRALPARCELS.PARCELS",
          // "GEOGRAPHICALGRIDSYSTEMS.MAPS",
          // "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD",
          // "GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
        ]
        
        const openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(this.map)
        
        for (let identifier of ignLayers) {
          this.map.addLayer(
            L.geoportalLayer.WMTS({
              layer: identifier
            })
          )
        }
        const layerSwitcher = L.geoportalControl.LayerSwitcher({
          layers: [{
            layer: openStreetMapLayer,
            config: {
              title: 'Open Street Map',
              description: 'Couche Open Street Maps'
            }
          }, {
            layer: this.heatLayer,
            config: {
              title: 'Densité toponymique',
              description: 'Carte de densité des toponymes'
            }
          }
          ]
        })
        
        this.map.addControl(layerSwitcher)
      },
      
      addMarkers(markers) {
        console.log("add markers")
        for(let m of markers) {
          let newMarker = L.marker(
            m.coordinates,
          );
          newMarker.on('click', function (ev) {
            console.log("click on ", m.id)
          })
          //this.markerLayer.addLayer(newMarker)
        }
        const latlgns = markers.map(m => m.coordinates)
        //latlgns.forEach(l => this.heatLayer.addLatLng)
        this.heatLayer.setLatLngs(latlgns)
      },
      clearMarkers() {
        console.log("clear markers")
        //this.heatLayer.setLatLngs([])
      }
    },
    mounted () {
      Gp.Services.getConfig({
        // apiKey: '4bgxfnc1ufj44pmxpsloxq6j',
        callbackSuffix: '',
        serverUrl: '/autoconf-https.json',
        onSuccess: this.addIGNServices,
        onFailure: function () {
          console.error('GP failure')
        }
      })
  
      this.heatLayer = L.heatLayer([[49.43528384615384, 3.6123421153846156, 1.0]], { radius: 20, blur: 10, minOpacity: 0.2 }).addTo(this.map)
      this.markerLayer = L.featureGroup().addTo(this.map);
      
    },
    computed: {
      ...mapState('mapmarkers', { mapmarkerItems: 'items', mapmarkerLoading: 'isLoading'}),
      
      map () { return this.$refs.map.mapObject },
    },
    watch: {
      mapmarkerItems(newVal, oldVal) {
        this.addMarkers(Array.from(this.mapmarkerItems.values()))
      },
      /*
      mapmarkerLoading: function(val) {
        if (val) {
          this.clearMarkers()
        }
      }
      */
    }
  }
</script>

<style scoped>
  .l-map {
    z-index: 0;
    background-color: white;
  }
</style>
