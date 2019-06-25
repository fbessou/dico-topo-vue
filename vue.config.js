module.exports = {
  runtimeCompiler: true,

  pages: {
    index: {
      // entry for the page
      entry: 'src/main.ts',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Dictionnaire Toponymique',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },

  css: {
    extract: false
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/dico-topo/static' : '/',

  outputDir: undefined,
  assetsDir: undefined,
  productionSourceMap: undefined,
  parallel: undefined
}
