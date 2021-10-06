const path = require("path");
const miniCss = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: "./index.js",
  output: {
    publicPath: '',
    filename: '[name].js?t=' + new Date().getTime(),
    chunkFilename: '[name]-chunk.js?t=' + new Date().getTime(),
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mov|mp4)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
          plugins: ['transform-class-properties']
        },
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8804,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new miniCss(),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileWhitelist: [/styles(\.[0-9a-f]+)?\.css$/]
    }),
    new CopyPlugin({
      patterns: [
        { from: "libs", to: "libs" },
        { from: "services", to: "services" },
      ],
    }),
      new ReplaceInFileWebpackPlugin([{
        dir: 'dist',
        files: ['index.html'],
        rules: [{
          search: '<link href="styles.css" rel="stylesheet">',
          replace: ''
        }]
      }])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
