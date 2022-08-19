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
  target // 环境参数
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
      }

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
  // 打包优化配置
  optimization: {
    // //告知 webpack 去决定每个模块使用的导出内容。这取决于 optimization.providedExports 选项。
    // //由 optimization.usedExports 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成， 当所有的使用都适配，导出名称会被处理做单个标记字符
    // usedExports: "global",
    // //告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。
    // sideEffects: true,
    // //使用 optimization.emitOnErrors 在编译时每当有错误时，就会 emit asset。这样可以确保出错的 asset 被 emit 出来。关键错误会被 emit 到生成的代码中，并会在运行时报错
    // emitOnErrors: true,
    // //如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块
    // removeAvailableModules: true,
    // //如果 chunk 为空，告知 webpack 检测或移除这些 chunk
    // removeEmptyChunks: true,
    // //告知 webpack 合并含有相同模块的 chunk
    // mergeDuplicateChunks: true,
    // //告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。
    // flagIncludedChunks: true,
    // //告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。
    // providedExports: true,
    // //告知 webpack 是否对未使用的导出内容，实施内部图形分析(graph analysis)。
    // innerGraph: true,
    // //在处理资产之后添加额外的散列编译通道，以获得正确的资产内容散列。如果realContentHash被设置为false，则使用内部数据来计算散列，当资产相同时，它可以更改。
    // realContentHash: true,
    // Chunk start splitChunks [name].chunk  公共包抽取  vendor
    // 开启这个编译包更小
    // runtimeChunk: 'single',
    // 开启这个编译包更小
    // runtimeChunk: {
    //   // name: (entrypoint) => `runtime~${entrypoint.name}`,
    // },
    //
    // 打包大小拆包
    splitChunks: {
      // // 最大超过多少就要拆分
      // maxSize: 204800, //大小超过204800个字节 200kb 就要拆分
      // // // 最小多少被匹配拆分
      // minSize: 102400, //大小超过102400个字节  100kb 就要拆分
      // enforceSizeThreshold: 102400,
      // name: false,
      // chunks: "all",
      // minRemainingSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 50,
      // maxInitialRequests: 50,
      // automaticNameDelimiter: "~",
      cacheGroups: {
        // client: {
        //   name: "chunk-client",
        //   // priority: -10, // 缓存组权重，数字越大优先级越高
        //   chunks: "initial", // 只处理初始 chunk
        //   // 最大超过多少就要拆分
        //   maxSize: 204800, //大小超过204800个字节 200kb 就要拆分
        //   // // 最小多少被匹配拆分
        //   minSize: 102400, //大小超过102400个字节  100kb 就要拆分
        //   enforceSizeThreshold: 102400,
        //   //第三方依赖
        //   priority: -10, //设置优先级，首先抽离第三方模块
        //   // name: "client",
        //   // test: /node_modules/,
        //   // chunks: "initial",
        //   // minSize: 0,
        //   minChunks: 1 //最少引入了1次
        // },
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          reuseExistingChunk: true,
          minChunks: 1, //最少引入了1次
          // name: "chunk-node_modules",
          chunks: "initial", // 只处理初始 chunk
          // 最大超过多少就要拆分
          maxSize: 204800, //大小超过204800个字节 200kb 就要拆分
          // // 最小多少被匹配拆分
          minSize: 102400, //大小超过102400个字节  100kb 就要拆分
          enforceSizeThreshold: 102400
        }

        // vendors: {
        //   // test: /[\\/]node_modules[\\/]/,
        //   priority: 1,
        //   reuseExistingChunk: true,
        //   minChunks: 1, //最少引入了1次
        //   // name: "chunk-node_modules",
        //   chunks: "initial", // 只处理初始 chunk
        //   // 最大超过多少就要拆分
        //   maxSize: 204800, //大小超过204800个字节 200kb 就要拆分
        //   // // 最小多少被匹配拆分
        //   minSize: 102400, //大小超过102400个字节  100kb 就要拆分
        //   enforceSizeThreshold: 102400
        // }

        // default: {
        //   minChunks: 1,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }

        // vendor: {
        //     //第三方依赖
        //     priority: 1, //设置优先级，首先抽离第三方模块
        //     name: 'vendor',
        //     test: /node_modules/,
        //     chunks: 'initial',
        //     minSize: 0,
        //     minChunks: 1, //最少引入了1次
        // },
        // //缓存组
        // common: {
        //     //公共模块
        //     chunks: 'initial',
        //     name: 'common',
        //     minSize: 1000, //大小超过1000个字节
        //     minChunks: 3, //最少引入了3次
        // },
      }
    }
    // Chunk end
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
