const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const rootPath = process.cwd();
let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
} = process.env; // 环境参数

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
const devConfig = {
    // mode: 'production',
    ...(target == 'web'
        ? {
              devServer: {
                  open: true,
                  contentBase: 'assets',
                  hot: true,
                  historyApiFallback: true,
                  liveReload: true, // 编译之后是否自动刷新浏览器
                  writeToDisk: true, // 写入硬盘
                  port: 5000,
              },
          }
        : {
              //   mode: 'production',
          }),
    watch: true,
    watchOptions: {
        //延迟监听时间
        aggregateTimeout: 500,
        //忽略监听文件夹
        ignored: '/node_modules/',
    },
    // context: path.join(process.cwd(), '/src'),
    devtool: 'source-map',
    entry: {
        client: path.join(process.cwd(), '/src/index.js'),
        vendors: [
            'react',
            'react-dom',
            'react-loadable',
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
    },
    resolve: {
        // 路径配置
        alias: {
            '@': path.join(process.cwd(), '/src'),
        },
        extensions: ['.js', '.jsx', 'css', 'less', 'scss', 'png', 'jpg'],
        modules: [path.resolve(rootPath, 'src'), 'node_modules'],
    },
    devServer: {
        contentBase: 'assets',
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(rootPath, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['env', 'react', 'stage-0'],
                        // plugins: ['transform-runtime', 'add-module-exports'],
                        cacheDirectory: true,
                    },
                },
            },

            {
                test: /\.(css|.less)$/,
                exclude: /node_modules/,
                include: path.resolve(rootPath, 'src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', //style-loader 将css插入到页面的style标签
                    use: [
                        {
                            loader: 'css-loader', //css-loader 是处理css文件中的url(),require()等
                            options: {
                                sourceMap: true,
                            },
                        },
                        // 'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'autoprefixer',
                                            {
                                                // Options
                                            },
                                        ],
                                    ],
                                },
                            },
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: 'last 5 versions',
                                    }),
                                ],
                                sourceMap: true,
                            },
                        },
                        // {
                        //     loader: 'sass-loader',
                        //     options: {
                        //         sourceMap: true,
                        //     },
                        // },
                    ],
                }),
            },
            {
                test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'img/[sha512:hash:base64:7].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
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
            // title: 'Custom template using Handlebars',
            // 生成出来的html文件名
            filename: 'index.html',
            minify:true,
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
        // new CopyWebpackPlugin([{ from: 'favicon.ico' }]),
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin({ summary: false }),
        new ExtractTextPlugin({ filename: 'style.[hash].css' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'development'
            ),
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendors', 'manifest'],
        //     minChunks: 2,
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'test1',
        //     filename: 'index.html',
        //     template: './index.ejs',
        // }),
    ],
};

module.exports = devConfig;
