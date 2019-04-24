<template>
  <l-map class="l-map" ref="map" :zoom="zoom" :center="center">

  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from 'vue2-leaflet'
import * as Gp from 'geoportal-extensions-leaflet'
import styles from '../../node_modules/geoportal-extensions-leaflet/dist/GpPluginLeaflet.css'

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
      zoom: 17,
      center: [47.313220, -1.319482]
    }
  },
  methods: {
    addIGNServices: function () {
      const ignLayers = [
        'ORTHOIMAGERY.ORTHOPHOTOS',
        'GEOGRAPHICALGRIDSYSTEMS.CASSINI'
        // "CADASTRALPARCELS.PARCELS",
        // "GEOGRAPHICALGRIDSYSTEMS.MAPS",
        // "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD",
        // "GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
      ]
      for (let identifier of ignLayers) {
        this.map.addLayer(
          L.geoportalLayer.WMTS({
            layer: identifier
          })
        )
      }

      const openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(this.map)

      const heatLayer = L.heatLayer([
        [47.313220, -1.319482, 1.0], // lat, lng, intensity
        [47.313220, -1.319, 3.0], // lat, lng, intensity
        [47.314220, -1.319482, 6.0],
        [47.314220, -1.319, 10.0]
      ], { radius: 20 }).addTo(this.map)

      const layerSwitcher = L.geoportalControl.LayerSwitcher({
        layers: [{
          layer: openStreetMapLayer,
          config: {
            title: 'Open Street Map',
            description: 'Couche Open Street Maps'
          }
        }, {
          layer: heatLayer,
          config: {
            title: 'Densité toponymique',
            description: 'Carte de densité des toponymes'
          }
        }
        ]
      })

      this.map.addControl(layerSwitcher)
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
  },
  computed: {
    map () { return this.$refs.map.mapObject }
  }
}
</script>

<style scoped>
  .l-map {
    z-index: 0;
    background-color: white;
  }
</style>
