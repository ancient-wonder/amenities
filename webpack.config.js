const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'client/dist')
const APP_DIR = path.resolve(__dirname, 'client')
const common = {
  context: APP_DIR
}

const client = {
  entry: './client.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'env']
            }
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
}

const server = {
  entry: './server.jsx',
  target: 'node',
  output: {
    path: BUILD_DIR,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'env']
            }
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
      }
    ]
  }
}
module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
]

// module: {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       include: APP_DIR,
//       use: [
//         {
//           loader: 'babel-loader',
//           query: {
//             presets: ['react', 'env']
//           }
//         }
//       ]
//     },
//     {
//       test: /\.(s*)css$/,
//       use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
//     }
//   ]
// plugins: [
//   new webpack.DefinePlugin({
//     'process.env': {
//       NODE_ENV: JSON.stringify('production')
//     }
//   }),
//   new webpack.optimize.UglifyJsPlugin(), //minify everything
//   new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
//   new CompressionPlugin({
//     asset: '[path].gz[query]',
//     algorithm: 'gzip',
//     test: /\.js$|\.css$|\.html$/,
//     threshold: 10240,
//     minRatio: 0.8
//   })
// ]
// }
