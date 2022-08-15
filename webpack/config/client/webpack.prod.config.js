const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackPluginCopyFile = require("../../definePlugin/webpack-plugin-copy-file");
const rootPath = process.cwd();
let {
  NODE_ENV, // 环境参数
  target, // 环境参数
} = process.env; // 环境参数
const isDevelopment = NODE_ENV == "development";


module.exports = {
  mode: NODE_ENV,
  watch: false,
  module: {
    rules: [
      // css
      {
        test: /\.css$/i,
        // 排除文件,因为这些包已经编译过，无需再次编译  不排除bootstrap
        exclude: /(node_modules|bower_components)^((?!bootstrap).)+$/,
        use: [
          // 'thread-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      //   less
      {
        test: /\.less$/i,
        // 排除文件,因为这些包已经编译过，无需再次编译  不排除bootstrap
        exclude: /(node_modules|bower_components)^((?!bootstrap).)+$/,
        use: [
          // 'thread-loader',
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },

      // //  scss
      // {
      //     test: /\.s[ac]ss$/i,
      //     use: [
      //         // 'thread-loader',
      //         MiniCssExtractPlugin.loader,
      //         // Translates CSS into CommonJS
      //         'css-loader',
      //         // Compiles Sass to CSS
      //         // 'sass-loader',
      //         {
      //             loader: 'sass-loader',
      //             options: {
      //                 // Prefer `dart-sass`
      //                 implementation: require('sass'),
      //                 sourceMap: true,
      //             },
      //         },
      //         {
      //             loader: 'postcss-loader',
      //             options: {
      //                 postcssOptions: {
      //                     plugins: [
      //                         [
      //                             'autoprefixer',
      //                             {
      //                                 // Options
      //                             },
      //                         ],
      //                     ],
      //                 },
      //             },
      //         },
      //     ],
      // },
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
