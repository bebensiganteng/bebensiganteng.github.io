const precss = require('precss');
const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {

  context: __dirname + '/src',
  entry: './js/main.js',
  output: {
    path: __dirname + '/src',
    filename: '/js/bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015'
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
  postcss: function() {
    return [precss, autoprefixer]
  }
};
