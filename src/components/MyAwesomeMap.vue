<template>
  <l-map class="l-map" ref="map" :zoom="zoom" :center="center" :max-zoom="17">
  
  </l-map>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  
  import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from 'vue2-leaflet'
  import * as Gp from 'geoportal-extensions-leaflet'
  import styles from '../../node_modules/geoportal-extensions-leaflet/dist/GpPluginLeaflet.css'

  import icon from 'leaflet/dist/images/marker-icon.png';
  import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
    props: {
      onMarkerClick : {type: Function},
      onMapClick: { type: Function }
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
        for(let m of markers) {
          let newMarker = L.marker(m.coordinates);
          if (this.onMarkerClick) {
            newMarker.on('click', () => this.onMarkerClick(m.id))
          }
          this.markerLayer.addLayer(newMarker)
          this.heatLayer.addLatLng(m.coordinates)
        }
      },
      clearMarkers() {
        console.log("clear markers")
        this.heatLayer.setLatLngs([])
        this.markerLayer.clearLayers()
      },
      toggleMarkerLayer()
      {
        if (this.map.getZoom() < 12) {
          this.map.removeLayer(this.markerLayer);
          this.map.addLayer(this.heatLayer);
        } else {
          this.map.removeLayer(this.heatLayer);
          this.map.addLayer(this.markerLayer);
        }
      }
    },
    mounted () {
  
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
      });
      
      Gp.Services.getConfig({
        // apiKey: '4bgxfnc1ufj44pmxpsloxq6j',
        callbackSuffix: '',
        serverUrl: '/autoconf-https.json',
        onSuccess: this.addIGNServices,
        onFailure: function () {
          console.error('GP failure')
        }
      })
  
      this.heatLayer = L.heatLayer([], { radius: 22, blur: 12, minOpacity: 0.25 })
      this.markerLayer = L.featureGroup()
  
      this.toggleMarkerLayer()
      this.map.on('zoomend', this.toggleMarkerLayer);
      if (this.onMapClick) {
        this.map.on('click', this.onMapClick)
      }
    },
    computed: {
      ...mapState('mapmarkers', { mapmarkerItems: 'items', mapmarkerLoading: 'isLoading'}),
      
      map () { return this.$refs.map.mapObject },
    },
    watch: {
      mapmarkerItems() {
        this.addMarkers(Array.from(this.mapmarkerItems.values()))
      },
      
      mapmarkerLoading(val) {
        if (val) {
          this.clearMarkers()
        }
      }
      
    }
  }
</script>

<style scoped>
  .l-map {
    z-index: 0;
    background-color: white;
  }
</style>
