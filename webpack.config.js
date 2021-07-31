const path = require("path");
const miniCss = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: "./index.js",
  output: {
    filename: "bundle.js",
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
        test: /\.(png|jpe?g|gif|svg|mp4|MP4)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
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
    new miniCss({
      filename: "style.css",
    }),
    new HTMLWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new HTMLWebpackPlugin({
      template: "./index_uz.html",
      filename: "index_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./all_courses.html",
      filename: "all_courses.html",
    }),
    new HTMLWebpackPlugin({
      template: "./all_masterclasses.html",
      filename: "all_masterclasses.html",
    }),
    new HTMLWebpackPlugin({
      template: "./masterclass.html",
      filename: "masterclass.html",
    }),
    new HTMLWebpackPlugin({
      template: "./open_lessons.html",
      filename: "open_lessons.html",
    }),
    new HTMLWebpackPlugin({
      template: "./open_lesson.html",
      filename: "open_lesson.html",
    }),
    new HTMLWebpackPlugin({
      template: "./career.html",
      filename: "career.html",
    }),
    new HTMLWebpackPlugin({
      template: "./career_two.html",
      filename: "career_two.html",
    }),
    new HTMLWebpackPlugin({
      template: "./replies.html",
      filename: "replies.html",
    }),
    new HTMLWebpackPlugin({
      template: "./all_courses_uz.html",
      filename: "all_courses_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./all_masterclasses_uz.html",
      filename: "all_masterclasses_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./masterclass_uz.html",
      filename: "masterclass_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./open_lessons_uz.html",
      filename: "open_lessons_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./open_lesson_uz.html",
      filename: "open_lesson_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./career_uz.html",
      filename: "career_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./career_two_uz.html",
      filename: "career_two_uz.html",
    }),
    new HTMLWebpackPlugin({
      template: "./replies_uz.html",
      filename: "replies_uz.html",
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, "dist"),
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "files", to: "files" },
        { from: "services", to: "services" },
      ],
    }),
  ],
};
