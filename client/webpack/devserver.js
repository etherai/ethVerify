const webpack          = require('webpack'),
      WebpackDevServer = require('webpack-dev-server'),
      config           = require('./webpack.config.js'),
      devServerConfig  = {
        hot : true,
        noInfo: true
      },
      devServer = new WebpackDevServer(webpack(config), devServerConfig);

devServer.listen(3001, err => {
  if (err) {
    return console.log(err);
  }

  console.log('webpack dev server running on port 3001');
});
