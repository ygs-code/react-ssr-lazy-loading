const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("../../definePlugin/mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// const OmitJSforCSSPlugin = require('webpack-omit-js-for-css-plugin');
const WebpackPluginRouter = require("../../definePlugin/webpack-plugin-router");
const MyExampleWebpackPlugin = require("../../definePlugin/MyExampleWebpackPlugin");
const HelloWorldCheckerPlugin = require("../../definePlugin/HelloWorldCheckerPlugin");
// const HelloWorldCheckerPlugin = require('../../definePlugin/webpack-plugin-no-require-css');
const HappyPack = require("happypack");
const os = require("os");
const WebpackBar = require("webpackbar");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const ESLintPlugin = require("eslint-webpack-plugin");
const { stringToObject, alias } = require("../../utils");
let {
  NODE_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = ""
} = process.env; // 环境参数
//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
const rootPath = process.cwd();

const cacheLoader = (happypackId) => {
  return isEnvDevelopment
    ? [
        `happypack/loader?id=${happypackId}&cacheDirectory=true`,
        //   'thread-loader',
        "cache-loader"
      ]
    : [
        // 'thread-loader',

        `happypack/loader?id=${happypackId}`
      ];
};

module.exports = {
  mode: NODE_ENV,
  name: "server",
  target: "node",
  node: {
    __filename: true,
    __dirname: true,
    global: false
  },
  output: {
    filename: "[name].js",
    path: path.join(process.cwd(), "./dist/server"),
    publicPath: "/",
    chunkFilename: "[name].chunk.js",
    // libraryTarget: isServer?'commonjs2':'umd',
    chunkLoadTimeout: 120000,
    // 「devtool 中模块」的文件名模板 调试webpack的配置问题
    // 你的文件在chrome开发者工具中显示为webpack:///foo.js?a93h, 。如果我们希望文件名显示得更清晰呢，比如说 webpack:///path/to/foo.js
    devtoolModuleFilenameTemplate: (info) => {
      // "webpack://[namespace]/[resource-path]?[loaders]"
      return `webpack:///${info.resourcePath}?${info.loaders}`;
    },
    // 如果多个模块产生相同的名称，使用
    devtoolFallbackModuleFilenameTemplate: (info) => {
      return `webpack:///${info.resourcePath}?${info.loaders}`;
    },
    // 如果一个模块是在 require 时抛出异常，告诉 webpack 从模块实例缓存(require.cache)中删除这个模块。
    // 并且重启webpack的时候也会删除cache缓存
    strictModuleExceptionHandling: !isEnvProduction,
    // 导出库(exported library)的名称
    library: "server",
    //   导出库(exported library)的类型
    libraryTarget: "umd",
    // libraryTarget: 'commonjs2',
    // 在 UMD 库中使用命名的 AMD 模块
    umdNamedDefine: true,
    globalObject: "this"
  },
  //在第一个错误出现时抛出失败结果，而不是容忍它
  bail: true,
    // // 打包优化配置
    // optimization: {
    //   // //告知 webpack 去决定每个模块使用的导出内容。这取决于 optimization.providedExports 选项。
    //   // //由 optimization.usedExports 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成， 当所有的使用都适配，导出名称会被处理做单个标记字符
    //   // usedExports: "global",
    //   // //告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。
    //   // sideEffects: true,
    //   // //使用 optimization.emitOnErrors 在编译时每当有错误时，就会 emit asset。这样可以确保出错的 asset 被 emit 出来。关键错误会被 emit 到生成的代码中，并会在运行时报错
    //   // emitOnErrors: true,
    //   // //如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块
    //   // removeAvailableModules: true,
    //   // //如果 chunk 为空，告知 webpack 检测或移除这些 chunk
    //   // removeEmptyChunks: true,
    //   // //告知 webpack 合并含有相同模块的 chunk
    //   // mergeDuplicateChunks: true,
    //   // //告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。
    //   // flagIncludedChunks: true,
    //   // //告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。
    //   // providedExports: true,
    //   // //告知 webpack 是否对未使用的导出内容，实施内部图形分析(graph analysis)。
    //   // innerGraph: true,
    //   // //在处理资产之后添加额外的散列编译通道，以获得正确的资产内容散列。如果realContentHash被设置为false，则使用内部数据来计算散列，当资产相同时，它可以更改。
    //   // realContentHash: true,
    //   // Chunk start splitChunks [name].chunk  公共包抽取  vendor
    //   // 开启这个编译包更小
    //   // runtimeChunk: 'single',
    //   // 开启这个编译包更小
    //   // runtimeChunk: {
    //   //   // name: (entrypoint) => `runtime~${entrypoint.name}`,
    //   // },
    //   //
    //   // 打包大小拆包
    //   splitChunks: {
    //     // 最大超过多少就要拆分
    //     maxSize: 204800, //大小超过204800个字节 200kb 就要拆分
    //     // // 最小多少被匹配拆分
    //     minSize: 102400, //大小超过102400个字节  100kb 就要拆分
    //     enforceSizeThreshold: 102400,
    //     name: false,
    //     chunks: "all",
    //     // minRemainingSize: 0,
    //     minChunks: 1,
    //     maxAsyncRequests: 50,
    //     maxInitialRequests: 50,
    //     automaticNameDelimiter: "~",
    //     cacheGroups: {
    //       // vendor: {
    //       //     //第三方依赖
    //       //     priority: 1, //设置优先级，首先抽离第三方模块
    //       //     name: 'vendor',
    //       //     test: /node_modules/,
    //       //     chunks: 'initial',
    //       //     minSize: 0,
    //       //     minChunks: 1, //最少引入了1次
    //       // },
    //       // //缓存组
    //       // common: {
    //       //     //公共模块
    //       //     chunks: 'initial',
    //       //     name: 'common',
    //       //     minSize: 1000, //大小超过1000个字节
    //       //     minChunks: 3, //最少引入了3次
    //       // },
    //       // defaultVendors: {
    //       //   test: /[\\/]node_modules[\\/]/,
    //       //   priority: -10,
    //       //   reuseExistingChunk: true,
    //       //   // minSize: 100, //大小超过1000个字节
    //       //   minChunks: 1 //最少引入了1次
    //       // },
    //       // default: {
    //       //   minChunks: 2,
    //       //   priority: -20,
    //       //   reuseExistingChunk: true
    //       // }
    //     }
    //   }
    //   // Chunk end
    // },
  //统计信息(stats)
  stats: {
    // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
    all: undefined,
    // 添加资源信息
    assets: false,
    // 对资源按指定的字段进行排序
    // 你可以使用 `!field` 来反转排序。
    assetsSort: "field",
    // 添加构建日期和构建时间信息
    builtAt: false,
    // 添加缓存（但未构建）模块的信息
    cached: false,
    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: false,
    // 添加 children 信息
    children: false,
    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: false,
    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,
    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: false,
    // 按指定的字段，对 chunk 进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    chunksSort: "id",
    // 用于缩短 request 的上下文目录
    // context: "../client/",
    // `webpack --colors` 等同于 显示日志不同的颜色
    colors: true,
    // 显示每个模块到入口起点的距离(distance)
    depth: false,
    // 通过对应的 bundle 显示入口起点
    entrypoints: false,
    // 添加 --env information
    env: false,
    // 添加错误信息
    errors: true,
    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,
    // 将资源显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    // excludeAssets: "filter" | /filter/ | (assetName) => ... return true|false |
    //   ["filter"] | [/filter/] | [(assetName) => ... return true|false],
    // 将模块显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    // excludeModules: "filter" | /filter/ | (moduleSource) => ... return true|false |
    //   ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],
    // // 和 excludeModules 相同
    // exclude: "filter" | /filter/ | (moduleSource) => ... return true|false |
    //   ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],
    // 添加 compilation 的哈希值
    hash: false,
    // 设置要显示的模块的最大数量
    // maxModules: 15,
    // 添加构建模块信息
    modules: false,
    // 按指定的字段，对模块进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    modulesSort: "id",
    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace: true,
    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: false,
    // 显示模块的导出
    providedExports: false,
    // 添加 public path 的信息
    publicPath: false,
    // 添加模块被引入的原因
    reasons: false,
    // 添加模块的源码
    source: false,
    // 添加时间信息
    timings: true,
    // 显示哪个模块导出被用到
    usedExports: false,
    // 添加 webpack 版本信息
    version: true,
    // 添加警告
    warnings: true
    // 过滤警告显示（从 webpack 2.4.0 开始），
    // 可以是 String, Regexp, 一个获取 warning 的函数
    // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
    // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
  },
  resolve: {
    // 路径配置
    alias,

    extensions: [
      ".js",
      ".jsx",
      ".css",
      ".less",
      ".scss",
      ".png",
      ".jpg",
      ".svg"
    ]
    // modules: [
    //     path.resolve(rootPath, 'client'),
    //     path.resolve(rootPath, 'server'),
    //     'node_modules',
    // ],
  },
  //防止将某些 const      的包(package)打包到 bundle 中,而是在运行时(runtime)再去从外部获取这些扩展依赖
  externals: [
    //引入缓存
    // nodeExternals({
    //   allowlist: ["webpack/hot/poll?1000"]
    // }),
    //将node_modules目录下的所有模块加入到externals中    告知 webpack  ，并忽略 externals 中的模块
    (() => {
      const nodeModules = {};
      fs.readdirSync(path.join(process.cwd(), "/node_modules"))
        .filter((catalogue) => {
          return (
            catalogue.indexOf("bootstrap") == -1 &&
            [".bin"].indexOf(catalogue) === -1
          );
        })
        .forEach((mod) => {
          if (mod.indexOf(".") === 0) return;
          nodeModules[mod] = "commonjs " + mod;
        });

      return nodeModules;
    })()
  ],
  module: {
    rules: [
      // css
      {
        test: /\.css$/i,
        // 排除文件,因为这些包已经编译过，无需再次编译
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
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // 'thread-loader',
      //     MiniCssExtractPlugin.loader,
      //     // Translates CSS into CommonJS
      //     "css-loader",
      //     // Compiles Sass to CSS
      //     // 'sass-loader',
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         // Prefer `dart-sass`
      //         // implementation: require("sass"),
              
      //         sourceMap: true
      //       }
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             [
      //               "autoprefixer",
      //               {
      //                 // Options
      //               }
      //             ]
      //           ]
      //         }
      //       }
      //     }
      //   ]
      // },

      {
        test: /\.(graphql|gql|sql)$/,
        // 排除文件,因为这些包已经编译过，无需再次编译
        exclude: /(node_modules|bower_components)/,
        use: ["thread-loader", "raw-loader"]
        //use:cacheLoader('rawLoader'),
        // use: {
        //   loader: "raw-loader",
        // },
      },
      {
        test: /(\.jsx?$)|(\.js?$)/,
        exclude: /node_modules/,
        // include: path.resolve(rootPath, 'client'),
        use: cacheLoader("jsx")
        // {
        //     loader: 'babel-loader',
        //     options: {
        //         // presets: ['env', 'react', 'stage-0'],
        //         // plugins: ['transform-runtime', 'add-module-exports'],
        //         cacheDirectory: true,
        //     },
        // },
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        // exclude: /node_modules/,
        use: cacheLoader("url-loader")
        //  {
        //     loader: 'url-loader',
        //     options: {
        //         limit: 1024,
        //         name: 'img/[sha512:hash:base64:7].[ext]',
        //     },
        // },
      }
    ]
  },
  plugins: [
    // new OmitJSforCSSPlugin(),
    // new HelloWorldCheckerPlugin(),
    // eslint 插件
    // new ESLintPlugin({
    //     emitError: true, //发现的错误将始终被触发，将禁用设置为false。
    //     emitWarning: true, //如果将disable设置为false，则发现的警告将始终被发出。
    //     failOnError: true, //如果有任何错误，将导致模块构建失败，禁用设置为false。
    //     failOnWarning: false, //如果有任何警告，如果设置为true，将导致模块构建失败。
    //     quiet: false, //如果设置为true，将只处理和报告错误，而忽略警告。
    //     fix: true, //自动修复
    // }),
    // 全局变量
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV, // 环境参数  除非有定义 process.env.NODE_ENV，否则就使用 NODE_ENV
    //   target, // 环境参数
    //   htmlWebpackPluginOptions: stringToObject(htmlWebpackPluginOptions),
    // }),
    new CleanWebpackPlugin(),
    // 使用此插件有助于缓解OSX上的开发人员不遵循严格的路径区分大小写的情况，
    // 这些情况将导致与其他开发人员或运行其他操作系统（需要正确使用大小写正确的路径）的构建箱发生冲突。
    new CaseSensitivePathsPlugin(),
    //友好的错误认识webpackerrors WebPACK插件类  这是很容易添加类型的错误，所以如果你想看moreerrors得到处理
    new FriendlyErrorsPlugin(),
    // 编译进度条
    new WebpackBar(),
    // 编译进度条
    new ProgressPlugin({
      // activeModules: true, // 默认false，显示活动模块计数和一个活动模块正在进行消息。
      // entries: true, // 默认true，显示正在进行的条目计数消息。
      // modules: false, // 默认true，显示正在进行的模块计数消息。
      // modulesCount: 5000, // 默认5000，开始时的最小模块数。PS:modules启用属性时生效。
      profile: true // 默认false，告诉ProgressPlugin为进度步骤收集配置文件数据。
      // dependencies: false, // 默认true，显示正在进行的依赖项计数消息。
      // dependenciesCount: 10000, // 默认10000，开始时的最小依赖项计数。PS:dependencies启用属性时生效。
    }),
    new ESBuildPlugin(),
    // ts
    new HappyPack({
      id: "jsx",
      //添加loader
      use: [
        {
          loader: "babel-loader",
          options: {
            // cacheDirectory: true,
          }
        }
      ],
      // 输出执行日志
      // verbose: true,
      // 使用共享线程池
      threadPool: happyThreadPool
    }),

    new HappyPack({
      id: "url-loader",
      //添加loader
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "img/[sha512:hash:base64:7].[ext]"
          }
        }
      ],
      // 输出执行日志
      // verbose: true,
      // 使用共享线程池
      threadPool: happyThreadPool
    }),

    // new MyExampleWebpackPlugin(),
    // new WebpackPluginRouter({
    //     entry: path.join(process.cwd(), '/client'),
    //     //延迟监听时间
    //     aggregateTimeout: 1000,
    //     watch: ['routesConfig.js'],
    //     output: {
    //         routesComponent: '/client/router/routesComponent.js',
    //         routePaths: '/client/router/routePaths.js',
    //     },
    // }),

    // // html静态页面
    // new HtmlWebpackPlugin({
    //     ...htmlWebpackPluginOptions,
    //  ...stringToObject(htmlWebpackPluginOptions),
    //     minify: true,
    //     // title: 'Custom template using Handlebars',
    //     // 生成出来的html文件名
    //     filename: 'index.html',
    //     // 每个html的模版，这里多个页面使用同一个模版
    //     template: path.join(process.cwd(), '/client/public/index.html'),
    //     // 自动将引用插入html
    //     // inject: 'body',
    //     // hash: true,
    //     // // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    //     // chunks: [
    //     //     'vendor',
    //     //     'manifest',
    //     //     'index',
    //     //     // "static/vendor.dll",
    //     //     // "static/vendor.manifest",
    //     // ],
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
