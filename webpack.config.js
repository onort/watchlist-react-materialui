const config = {
  devtool: 'source-map',
  entry: './src/index.js',              
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
          
  devServer: {
    inline: true,
    port: 8080,
    contentBase: './dist'
  },
                
module: {

  loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',                                           
        query: {
            presets: ['es2015', 'react']
        }
      }
    ]
  }
}

module.exports = config;
