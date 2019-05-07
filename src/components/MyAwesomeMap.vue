<template>
  <l-map class="l-map" ref="map" :zoom="zoom" :center="center" :max-zoom="17" :style="`min-height: ${minHeight}; min-width: ${minWidth}; `">
  
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
      onMapClick: { type: Function },
      useMarkers: { type: Boolean, default: true},
      useHeatmap: { type: Boolean, default: true },
      useFlyAnimation: { type: Boolean, default: true},
      minHeight: {type: String, default: '100px'},
      minWidth: { type: String, default: '100px' },
      initialZoom: {type: Number, default: 3}
    },
    data () {
      return {
        zoom: !!this.initialZoom && this.initialZoom > 0 && this.initialZoom <= 17? this.initialZoom : 3,
        center: [47.853806, 1.73392], //[49.56001319148936, 3.615102414893616],
        
        markerLayer: null,
        heatLayer: null,
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
        
        for (let identifier of ignLayers) {
          this.map.addLayer(
            L.geoportalLayer.WMTS({
              layer: identifier
            })
          )
        }
  
        const openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(this.map)
  
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
        
        let newMarkers = []
        for(let m of markers) {
          if (this.useMarkers) {
            let newMarker = L.marker(m.coordinates);
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
        }
        if (this.useHeatmap) {
          // Yet i want to redraw the heatmap layer if it is currently visible
          if (this.map.hasLayer(this.heatLayer)) {
            this.heatLayer.redraw()
          }
        }
      },
      clearMarkers() {
        // clear the heat map markers
        // using a trick to not trigger .redraw when the layer is not on the map
        if (this.map.hasLayer(this.heatLayer)) {
          if (this.useHeatmap) {
            this.heatLayer.setLatLngs([])
          } else {
            this.heatLayer._latlngs = []
          }
        }
        // clear the placename markers
        this.markerLayer.clearLayers()
      },
      toggleMarkerLayer()
      {
        if (this.map.getZoom() < 10) {
          this.map.removeLayer(this.markerLayer);
          this.map.addLayer(this.heatLayer);
        } else {
          this.map.removeLayer(this.heatLayer);
          this.map.addLayer(this.markerLayer);
        }
        if (this.map.hasLayer(this.heatLayer)) {
          this.heatLayer.redraw()
        }
      },
      flyToCoordinates(coords) {
        if (!!coords) {
          const latlgns = L.latLng(coords[0], coords[1])
          if (this.useFlyAnimation) {
            this.map.flyTo(coords, 13, { easeLinearity: 0.8, duration: 1.6 })
          } else {
            this.map.panTo(coords)
          }
        }
      }
    },
    mounted () {
  
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
      });
      console.log(`autoconf: ${process.env.BASE_URL}autoconf-https.json`)
      
      Gp.Services.getConfig({
        //apiKey: '4bgxfnc1ufj44pmxpsloxq6j',
        callbackSuffix: '',
        serverUrl: `${process.env.BASE_URL}autoconf-https.json`,
        onSuccess: this.addIGNServices,
        onFailure: function () {
          console.error('GP failure')
        }
      })
  
      this.heatLayer = L.heatLayer([], { radius: 22, blur: 12, minOpacity: 0.25 })
      this.markerLayer = L.markerClusterGroup({
        showCoverageOnHover: false
      })
  
      this.map.addLayer(this.heatLayer);
      this.map.addLayer(this.markerLayer);
      
      if (this.useHeatmap) {
        this.toggleMarkerLayer()
        this.map.on('zoomend', this.toggleMarkerLayer);
      }

      if (this.onMapClick) {
        this.map.on('click', this.onMapClick)
      }
      
      if (!!this.selectedItem) {
        this.flyToCoordinates(this.coords)
      }
    },
    computed: {
      ...mapState('mapmarkers', { mapmarkerItems: 'items', mapmarkerLoading: 'isLoading'}),
      ...mapState('placenames', ['selectedItem']),
  
      map () { return this.$refs.map.mapObject },
    },
    watch: {
      mapmarkerItems() {
        const items = Array.from(this.mapmarkerItems.values())
        if (items.length) {
          this.addMarkers(items)
        } else {
          this.clearMarkers()
        }
      },
      mapmarkerLoading(val) {
        if (val) {
          this.clearMarkers()
        }
      },
      selectedItem(val) {
        if (!!val) {
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
