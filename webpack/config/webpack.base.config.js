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
const WebpackPluginRouter = require('../definePlugin/webpack-plugin-router');
const MyExampleWebpackPlugin = require('../definePlugin/MyExampleWebpackPlugin');
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
} = process.env; // 环境参数
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
const isServer = process.env.BUILD_TYPE === 'server';
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
    entry: {
        client: path.join(process.cwd(), '/src/index.js'),
        vendors: [
            'react',
            'react-dom',
            // 'react-loadable',
            // 'react-redux',
            // 'redux',
            // 'react-router-dom',
            // 'react-router-redux',
            // 'redux-thunk',
        ],
    },
    output: {
        filename: 'static/js/[name].[hash:8].js',
        path: path.resolve(process.cwd(), './dist/web'),
        publicPath: '/',
        chunkFilename: 'static/js/[name]-[hash:8].js',
        // libraryTarget: isServer?'commonjs2':'umd',
    },
    //在第一个错误出现时抛出失败结果，而不是容忍它
    bail: true,
    resolve: {
        // 路径配置
        alias: {
            '@': path.join(process.cwd(), '/src'),
        },
        extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.png', '.jpg'],
        modules: [path.resolve(rootPath, 'src'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /(\.jsx?$)|(\.js?$)/,
                exclude: /node_modules/,
                include: path.resolve(rootPath, 'src'),
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
        // eslint 插件
        new ESLintPlugin({
            emitError: true, //发现的错误将始终被触发，将禁用设置为false。
            emitWarning: true, //如果将disable设置为false，则发现的警告将始终被发出。
            failOnError: true, //如果有任何错误，将导致模块构建失败，禁用设置为false。
            failOnWarning: false, //如果有任何警告，如果设置为true，将导致模块构建失败。
            quiet: false, //如果设置为true，将只处理和报告错误，而忽略警告。
            fix: true, //自动修复
        }),

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
        new WebpackPluginRouter(),
        // 注入全局常量
        new ExtendedDefinePlugin({
            process: {
                env: {
                    NODE_ENV, // 环境参数
                    WEB_ENV, // 环境参数
                    target, // 环境参数
                },
            },
            htmlWebpackPluginOptions,
        }),
        // html静态页面
        new HtmlWebpackPlugin({
            ...htmlWebpackPluginOptions,
            minify: true,
            // title: 'Custom template using Handlebars',
            // 生成出来的html文件名
            filename: 'index.html',
            // 每个html的模版，这里多个页面使用同一个模版
            template: path.join(process.cwd(), '/src/public/index.html'),
            // 自动将引用插入html
            // inject: 'body',
            // hash: true,
            // // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            // chunks: [
            //     'vendor',
            //     'manifest',
            //     'index',
            //     // "static/vendor.dll",
            //     // "static/vendor.manifest",
            // ],
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};
