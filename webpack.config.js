const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
}
