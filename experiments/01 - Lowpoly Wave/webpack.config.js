const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  entry: './src/main.js',
  amd: { jQuery: true },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./dist/']}
    })
  ]
}
