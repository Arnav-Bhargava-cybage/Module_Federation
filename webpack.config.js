const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: 'development',
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader:
          'babel-loader',
        options: {
          presets: [
            '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react',
          ], // to compile react to ES5
        },
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "parentApp",
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react, eager: true },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: deps['react-router-dom'] },
        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] },
        "react-icons": { singleton: true, eager: true, requiredVersion: deps['react-icons'] },
        "react-redux": { singleton: true, eager: true, requiredVersion: deps['react-redux'] },
        "redux-persist": { singleton: true, eager: true, requiredVersion: deps['redux-persist'] },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
  }),
  ],
};
