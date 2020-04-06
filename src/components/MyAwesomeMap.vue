<template>
  <l-map
    class="l-map"
    ref="map"
    :zoom="zoom"
    :center="center"
    :max-zoom="maxZoom"
    :min-zoom="minZoom"
    :options="options"
    :style="`min-height:${minHeight}; min-width: ${minWidth}; `"
  >
  </l-map>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from 'vue2-leaflet'
// import * as Gp from 'geoportal-extensions-leaflet'
// import styles from '../../node_modules/geoportal-extensions-leaflet/dist/GpPluginLeaflet.css'

// import icon from 'leaflet/dist/images/marker-icon.png'
// import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'

const idleIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const redIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

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
    useFlyAnimation: { type: Boolean, default: false },
    minHeight: { type: String, default: '100px' },
    minWidth: { type: String, default: '100px' },
    maxZoom: { type: Number, default: 17 },
    minZoom: { type: Number, default: 6 },
    initialZoom: { type: Number, default: 6 },
    initialCenter: { type: Object, default: undefined },
    savePosition: { type: Boolean, default: false }
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
      let switchableLayers = [
        {
          layer: L.tileLayer(
            'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
            {}
          ).addTo(this.map),
          config: {
            title: 'Open Street Map',
            description: 'Couche Open Street Maps'
          }
        }
      ]
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
        this.heatLayer = L.heatLayer([], {
          radius: 22,
          blur: 12,
          minOpacity: 0.25
        })
        this.map.addLayer(this.heatLayer)
        this.toggleMarkerLayer()
        this.map.on('zoomend', this.toggleMarkerLayer)
      }

      if (this.onMapClick) {
        this.map.on('click', this.onMapClick)
      }

      this.setMarkers(this.mapmarkerItems)

      // this.map.setMaxBounds(this.map.getBounds())

      if (this.initialCenter) {
        this.flyToCoordinates(this.initialCenter)
      }
      if (this.initialZoom) {
        this.map.setZoom(this.initialZoom)
      }
      // if (this.selectedItem) {
      //  this.flyToCoordinates(this.selectedItem.coords)
      // }
      if (this.savePosition) {
        this.map.on('zoomend', this.saveZoom)
        this.map.on('dragend', this.saveZoom)
      }
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
        layers.push({
          layer: this.heatLayer,
          config: {
            title: 'Densité toponymique',
            description: 'Carte de densité des toponymes'
          }
        })
      }

      const layerSwitcher = L.geoportalControl.LayerSwitcher({
        layers: layers
      })

      this.map.addControl(layerSwitcher)
    },

    addMarkers (markers) {
      let newMarkers = []
      for (let m of markers) {
        if (this.useMarkers) {
          let newMarker = L.marker(m.coordinates)
          newMarker.placeId = m.id
          if (m.label) {
            newMarker.bindTooltip(m.label, {
              direction: 'right',
              offset: L.point({ x: 16, y: -24 })
            })
          }

          if (this.onMarkerClick) {
            newMarker.on('click', () => {
              this.selectMarkerIcon(newMarker)
              this.onMarkerClick({ id: m.id, coordinates: m.coordinates })
            })
          }
          if (m.active) {
            this.selectMarkerIcon(newMarker)
          }
          newMarkers.push(newMarker)
        }
      }

      if (this.useMarkers) {
        this.markerLayer.addLayers(newMarkers)
        console.log('add marker layer with markers', newMarkers)
      }
      if (this.useHeatmap) {
        const ll = markers.map(m => m.coordinates)
        if (this.heatLayer) {
          if (this.map.hasLayer(this.heatLayer)) {
            this.heatLayer.setLatLngs(ll)
          } else {
            this.heatLayer._latlngs = ll
          }
        }
      }
    },
    clearMarkers () {
      console.log('clear markers')
      // clear the heat map markers
      // using a trick to not trigger .redraw when the layer is not on the map
      if (this.heatLayer) {
        if (this.map.hasLayer(this.heatLayer)) {
          this.heatLayer.setLatLngs([])
        } else {
          this.heatLayer._latlngs = []
        }
      }
      // clear the place markers
      this.markerLayer.clearLayers()
    },
    selectMarkerIcon (marker) {
      this.markerLayer.eachLayer(m => {
        m.setIcon(idleIcon)
      })
      if (marker) {
        marker.setIcon(redIcon)
      }
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
    },
    saveZoom () {
      this.$store.dispatch('searchParameters/saveZoom', { zoom: this.map.getZoom(), center: this.map.getCenter() })
    }
  },
  created () {
    L.Marker.prototype.options.icon = idleIcon
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
    ...mapState('mapmarkers', {
      mapmarkerLoading: 'isLoading',
      flyToItem: 'flyToItem'
    }),
    ...mapState('places', ['selectedItem']),
    ...mapState('searchParameters', ['zoom', 'center']),

    map () {
      return this.$refs.map.mapObject
    }

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
    flyToItem (val) {
      if (val) {
        this.flyToCoordinates(this.flyToItem.coordinates)
        const marker = this.markerLayer
          .getLayers()
          .find(l => l.placeId === this.flyToItem.id)
        this.selectMarkerIcon(marker)
      }
    },
    selectedItem (val) {
      if (val) {
      } else {
        this.selectMarkerIcon()
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
