<template>
  <l-map class="l-map" ref="map"
         :zoom="initialZoom"
         :center="initialCenter"
         :max-zoom="maxZoom"
         :min-zoom="minZoom"
         :options="options"
         :style="`min-height:${minHeight}; min-width: ${minWidth}; `">
  </l-map>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from 'vue2-leaflet'
// import * as Gp from 'geoportal-extensions-leaflet'
// import styles from '../../node_modules/geoportal-extensions-leaflet/dist/GpPluginLeaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'

require('leaflet.heat')

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap
  },
  props: {
    mapmarkerItems: { type: Array, default: () => [] },
    onMarkerClick: { type: Function },
    onMapClick: { type: Function },
    useMarkers: { type: Boolean, default: true },
    useHeatmap: { type: Boolean, default: true },
    useFlyAnimation: { type: Boolean, default: true },
    minHeight: { type: String, default: '100px' },
    minWidth: { type: String, default: '100px' },
    initialZoom: { type: Number, default: 6 },
    maxZoom: { type: Number, default: 17 },
    minZoom: { type: Number, default: 6 },
    initialCenter: { type: Array, default: () => [46.453806, 2.65392] }
  },
  data () {
    return {
      markerLayer: null,
      heatLayer: null,
      options: {
        zoomSnap: 0,
        zoomDelta: 1.0
      }
    }
  },
  methods: {
    init () {
      let switchableLayers = [{
        layer: L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(this.map),
        config: {
          title: 'Open Street Map',
          description: 'Couche Open Street Maps'
        }
      }]
      /*
    Gp.Services.getConfig({
      callbackSuffix: '',
      serverUrl: `${process.env.BASE_URL}autoconf-https.json`,
      onSuccess: () => this.addIGNServices(switchableLayers),
      onFailure: function () {
        console.error('GP failure')
      }
    })
*/
      this.markerLayer = L.markerClusterGroup({
        showCoverageOnHover: false
      })
      this.map.addLayer(this.markerLayer)

      if (this.useHeatmap) {
        this.heatLayer = L.heatLayer([], { radius: 22, blur: 12, minOpacity: 0.25 })
        this.map.addLayer(this.heatLayer)
        this.toggleMarkerLayer()
        this.map.on('zoomend', this.toggleMarkerLayer)
      }

      if (this.onMapClick) {
        this.map.on('click', this.onMapClick)
      }

      this.setMarkers(this.mapmarkerItems)

      if (this.selectedItem) {
        this.flyToCoordinates(this.coords)
      }

      this.map.setMaxBounds(this.map.getBounds())
    },
    addIGNServices: function (layers) {
      const ignLayers = [
        // 'GEOGRAPHICALGRIDSYSTEMS.CASSINI',
        // 'ORTHOIMAGERY.ORTHOPHOTOS',
        // 'GEOGRAPHICALGRIDSYSTEMS.CASSINI'
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

      if (this.useHeatmap) {
        layers.push(
          {
            layer: this.heatLayer,
            config: {
              title: 'Densité toponymique',
              description: 'Carte de densité des toponymes'
            }
          }
        )
      }

      const layerSwitcher = L.geoportalControl.LayerSwitcher({
        layers: layers
      })

      this.map.addControl(layerSwitcher)
    },

    addMarkers (markers) {
      console.log('add markers', markers)
      let newMarkers = []
      for (let m of markers) {
        if (this.useMarkers) {
          let newMarker = L.marker(m.coordinates)
          if (this.onMarkerClick) {
            newMarker.on('click', () => this.onMarkerClick({ id: m.id, coordinates: m.coordinates }))
          }
          newMarkers.push(newMarker)
        }
        if (this.useHeatmap) {
          // add the point heatmap using a trick to not trigger .redraw when the layer is not on the map
          this.heatLayer._latlngs.push(m.coordinates)
        }
      }
      if (this.useMarkers) {
        this.markerLayer.addLayers(newMarkers)
        console.log('add marker layer with markers', newMarkers)
      }
      if (this.useHeatmap) {
        // Yet i want to redraw the heatmap layer if it is currently visible
        if (this.map.hasLayer(this.heatLayer)) {
          this.heatLayer.redraw()
        }
      }
    },
    clearMarkers () {
      console.log('clear markers')
      // clear the heat map markers
      // using a trick to not trigger .redraw when the layer is not on the map
      if (this.map.hasLayer(this.heatLayer)) {
        this.heatLayer.setLatLngs([])
      }
      // clear the place markers
      this.markerLayer.clearLayers()
    },
    setMarkers (markers) {
      this.clearMarkers()
      this.addMarkers(markers)
    },
    toggleMarkerLayer () {
      if (this.map.getZoom() < 10) {
        this.map.removeLayer(this.markerLayer)
        this.map.addLayer(this.heatLayer)
      } else {
        this.map.removeLayer(this.heatLayer)
        this.map.addLayer(this.markerLayer)
      }
      if (this.map.hasLayer(this.heatLayer)) {
        this.heatLayer.redraw()
      }
    },
    flyToCoordinates (coords) {
      if (coords) {
        const latlgns = L.latLng(coords[0], coords[1])
        if (this.useFlyAnimation) {
          this.map.flyTo(coords, 13, { easeLinearity: 0.8, duration: 1.6 })
        } else {
          this.map.panTo(coords)
        }
      }
    }
  },
  created () {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.init()
    next()
  },
  mounted () {
    // console.log(`autoconf: ${process.env.BASE_URL}autoconf-https.json`)
    this.init()
  },
  computed: {
    ...mapState('mapmarkers', { mapmarkerLoading: 'isLoading' }),
    ...mapState('places', ['selectedItem']),

    map () { return this.$refs.map.mapObject }
  },
  watch: {
    mapmarkerItems () {
      this.setMarkers(this.mapmarkerItems)
    },
    mapmarkerLoading (val) {
      if (this.mapmarkerLoading) {
        this.clearMarkers()
      }
    },
    selectedItem (val) {
      if (val) {
        this.flyToCoordinates(val.coordinates)
      }
    }
  }
}
</script>

<style scoped>
  .l-map {
    z-index: 0;
    min-height: 100px;
    min-width: 100px;
    background-color: white;
  }
</style>
