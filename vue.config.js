module.exports = {
  'runtimeCompiler': true,
  'pages': {
    'index': {
      'entry': 'src/main.ts',
      'template': 'public/index.html',
      'filename': 'index.html',
      'title': 'Dictionnaire Toponymique',
      'chunks': [
        'chunk-vendors',
        'chunk-common',
        'index'
      ]
    }
  },
  'css': {
    'extract': false
  },
  'publicPath': '/',
  'transpileDependencies': [
    'vuetify'
  ]
}
