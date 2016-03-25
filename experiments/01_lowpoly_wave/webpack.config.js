const precss = require('precss');
const autoprefixer = require('autoprefixer');
const browserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  context: __dirname + '/src',
  entry: './js/main.js',
  output: {
    path: __dirname + '/public',
    filename: '/js/bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        // include: [
        //   path.resolve(__dirname, "./css")
        // ],
        loader: "style-loader!css-loader!postcss-loader!"
      }
    ]
  },
  plugins: [
    new browserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {baseDir: ['./public']},
      open: 'local'
    })
  ],
  eslint: {
    fix: true,
    formatter: require('eslint-friendly-formatter'),
    failOnError: true
  },
  postcss: function() {
    return [precss, autoprefixer]
  }
};
