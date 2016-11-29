const webpack       = require('webpack'),
      path          = require('path'),
      isDevelopment = process.env.NODE_ENV === 'development',
      devEntry      = [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        path.join(__dirname,'../index.js')
      ];

module.exports = {
  context : __dirname,
  devtool : isDevelopment && 'source-map',
  entry   : isDevelopment ? devEntry : '../index.js',
  output  : {
    path       : path.join(__dirname, '../dist/'),
    publicPath : 'http://localhost:3001/', // this will prob need to change for prod
    filename   : 'bundle.js'
  },
  module : {
    loaders : [
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        loaders : ['react-hot', 'babel?presets[]=es2015,presets[]=react']
      },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve : {
    alias : {
      utils : path.join(__dirname, '../utils')
    }
  },
  plugins : isDevelopment && [
    new webpack.HotModuleReplacementPlugin()
  ]
};
