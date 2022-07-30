const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OmitJSforCSSPlugin = require('webpack-omit-js-for-css-plugin');
const WebpackPluginRouter = require('../../definePlugin/webpack-plugin-router');
const MyExampleWebpackPlugin = require('../../definePlugin/MyExampleWebpackPlugin');
const HelloWorldCheckerPlugin = require('../../definePlugin/HelloWorldCheckerPlugin');
// const HelloWorldCheckerPlugin = require('../../definePlugin/webpack-plugin-no-require-css');
const HappyPack = require('happypack');
const os = require('os');
const WebpackBar = require('webpackbar');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
    COMPILER_ENV,
} = process.env; // 环境参数
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
const rootPath = process.cwd();

htmlWebpackPluginOptions = (() => {
    const regex = /(?<=\{)(.+?)(?=\})/g; // {} 花括号，大括号
    htmlWebpackPluginOptions = htmlWebpackPluginOptions.match(regex);
    if (htmlWebpackPluginOptions) {
        htmlWebpackPluginOptions = htmlWebpackPluginOptions[0];
        let htmlWebpackPluginOptionsArr = htmlWebpackPluginOptions.split(',');
        htmlWebpackPluginOptions = {};
        for (let item of htmlWebpackPluginOptionsArr) {
            let [key, value] = item.split(':');
            htmlWebpackPluginOptions[`${key}`] = value;
        }
    } else {
        htmlWebpackPluginOptions = {};
    }
    return htmlWebpackPluginOptions;
})();

const cacheLoader = (happypackId) => {
    return isEnvDevelopment
        ? [
              `happypack/loader?id=${happypackId}&cacheDirectory=true`,
              //   'thread-loader',
              'cache-loader',
          ]
        : [
              // 'thread-loader',

              `happypack/loader?id=${happypackId}`,
          ];
};

module.exports = {
    name: 'server',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true,
        global: false,
    },
    entry: path.join(process.cwd(), '/server/middleware/clientRouter.js'),
    // entry: {
    //     serverRenderer: path.join(
    //         process.cwd(),
    //         '/server/middleware/clientRouter.js'
    //     ),
    //     // vendors: [
    //     //     'react',
    //     //     'react-dom',
    //     //     // 'react-loadable',
    //     //     // 'react-redux',
    //     //     // 'redux',
    //     //     // 'react-router-dom',
    //     //     // 'react-router-redux',
    //     //     // 'redux-thunk',
    //     // ],
    // },
    output: {
        filename: 'static/js/[name].js',
        path: path.join(process.cwd(), './dist/server'),
        publicPath: '/',
        chunkFilename: 'static/js/[name].js',
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
        library: 'server',
        //   导出库(exported library)的类型
        // libraryTarget: 'umd',
        libraryTarget: 'commonjs2',

        // 在 UMD 库中使用命名的 AMD 模块
        // umdNamedDefine: true,
        // globalObject: 'this',
    },
    //在第一个错误出现时抛出失败结果，而不是容忍它
    bail: true,
    //统计信息(stats)
    stats: {
        // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
        all: undefined,
        // 添加资源信息
        assets: false,
        // 对资源按指定的字段进行排序
        // 你可以使用 `!field` 来反转排序。
        assetsSort: 'field',
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
        chunksSort: 'id',
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
        modulesSort: 'id',
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
        warnings: true,
        // 过滤警告显示（从 webpack 2.4.0 开始），
        // 可以是 String, Regexp, 一个获取 warning 的函数
        // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
        // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
    },
    resolve: {
        // 路径配置
        alias: {
            '@': path.join(process.cwd(), '/client'),
        },
        extensions: [
            '.js',
            '.jsx',
            '.css',
            '.less',
            '.scss',
            '.png',
            '.jpg',
            '.svg',
        ],
        // modules: [
        //     path.resolve(rootPath, 'client'),
        //     path.resolve(rootPath, 'server'),
        //     'node_modules',
        // ],
    },
    module: {
        rules: [
            {
                test: /(\.jsx?$)|(\.js?$)/,
                exclude: /node_modules/,
                // include: path.resolve(rootPath, 'client'),
                use: cacheLoader('jsx'),
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
                use: cacheLoader('url-loader'),
                //  {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 1024,
                //         name: 'img/[sha512:hash:base64:7].[ext]',
                //     },
                // },
            },
        ],
    },
    plugins: [
        new OmitJSforCSSPlugin(),
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

        // 使用此插件有助于缓解OSX上的开发人员不遵循严格的路径区分大小写的情况，
        // 这些情况将导致与其他开发人员或运行其他操作系统（需要正确使用大小写正确的路径）的构建箱发生冲突。
        new CaseSensitivePathsPlugin(),
        //友好的错误认识webpackerrors WebPACK插件类  这是很容易添加类型的错误，所以如果你想看moreerrors得到处理
        new FriendlyErrorsPlugin(),
        // 编译进度条
        new WebpackBar(),
        // // 编译进度条
        // new ProgressPlugin({
        //     activeModules: true, // 默认false，显示活动模块计数和一个活动模块正在进行消息。
        //     entries: true, // 默认true，显示正在进行的条目计数消息。
        //     modules: false, // 默认true，显示正在进行的模块计数消息。
        //     modulesCount: 5000, // 默认5000，开始时的最小模块数。PS:modules启用属性时生效。
        //     profile: false, // 默认false，告诉ProgressPlugin为进度步骤收集配置文件数据。
        //     dependencies: false, // 默认true，显示正在进行的依赖项计数消息。
        //     dependenciesCount: 10000, // 默认10000，开始时的最小依赖项计数。PS:dependencies启用属性时生效。
        // }),
        new ESBuildPlugin(),
        // ts
        new HappyPack({
            id: 'jsx',
            //添加loader
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,
                    },
                },
            ],
            // 输出执行日志
            // verbose: true,
            // 使用共享线程池
            threadPool: happyThreadPool,
        }),

        new HappyPack({
            id: 'url-loader',
            //添加loader
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'img/[sha512:hash:base64:7].[ext]',
                    },
                },
            ],
            // 输出执行日志
            // verbose: true,
            // 使用共享线程池
            threadPool: happyThreadPool,
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
        // 注入全局常量
        new ExtendedDefinePlugin({
            GLOBAL_VARIABLE: {
                // ...process.env,
                NODE_ENV, // 环境参数
                WEB_ENV, // 环境参数
                target, // 环境参数
                COMPILER_ENV,
                htmlWebpackPluginOptions
            },
            // process: {
            //     // ...process,
            //     env: {
            //         // ...process.env,
            //         NODE_ENV, // 环境参数
            //         WEB_ENV, // 环境参数
            //         target, // 环境参数
            //         COMPILER_ENV,
            //     },
            // },
            // htmlWebpackPluginOptions,
        }),
        // // html静态页面
        // new HtmlWebpackPlugin({
        //     ...htmlWebpackPluginOptions,
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new ReactLoadablePlugin({
            filename: path.join(
                process.cwd(),
                './dist/server/react-loadable.json'
            ),
        }),
    ],
};
