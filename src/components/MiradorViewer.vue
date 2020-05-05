<template>
    <div id="vue-mirador-container" v-show="viewer" />
</template>

<script>

import Mirador from 'mirador'

export default {
  name: 'MiradorViewer',
  components: {},
  props: {
    manifestUrl: { type: String, required: true },
    canvasIndex: { type: Number, default: 0 }
  },
  data () {
    return {
      viewer: null
    }
  },
  created () {

  },
  mounted () {
    const manifests = {}
    manifests[this.manifestUrl] = {
      // metadata:
      // 'provider': ''
    }
    // instantiate the viewer with a single manifest & window for simplicity
    this.viewer = Mirador.viewer({
      'id': 'vue-mirador-container',
      'manifests': manifests,
      'windows': [
        {
          'loadedManifest': this.manifestUrl,
          'canvasIndex': this.canvasIndex
        }
      ],
      'window': {
        'allowClose': false,
        'allowMaximize': false,
        'defaultSideBarPanel': 'info',
        'sideBarOpenByDefault': false,
        'maximizedByDefault': true
      },
      'workspaceControlPanel': {
        'enabled': false
      }
    })
  },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped>
  #vue-mirador-container {
    height: 100%;
    position: relative;
  }
</style>
