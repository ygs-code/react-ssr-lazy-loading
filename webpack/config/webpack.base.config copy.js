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
const WebpackPluginRouter = require('../definePlugin/webpack-plugin-router');
const MyExampleWebpackPlugin = require('../definePlugin/MyExampleWebpackPlugin');
const isServer = process.env.BUILD_TYPE === 'server';
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
                test: /\.jsx?$/,
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
                test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                // exclude: /node_modules/,
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
        new MyExampleWebpackPlugin(),
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
