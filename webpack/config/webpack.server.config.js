// const CopyPlugin = require('copy-webpack-plugin');
const ResolveAlias = require('../definePlugin/webpack-plugin-resolve-alias');
const path = require('path');

let $ResolveAlias = new ResolveAlias({
    resolve: {
        // 路径配置
        alias: {
            '@/': path.join(process.cwd(), '/dist/server/src/'),
        },
    },
});

// // https://www.npmjs.com/package/babel-plugin-module-resolver
// module.exports = {
//     // watch: true,
//     // watchOptions: {
//     //     //延迟监听时间
//     //     aggregateTimeout: 300,
//     //     //忽略监听文件夹
//     //     ignored: '/node_modules/',
//     // },
//     // resolve: {
//     //     // 路径配置
//     //     alias: {
//     //         '@': path.join(process.cwd(), '/src'),
//     //     },
//     // },
//     mode: 'development',
//     // optimization: {
//     //     // 压缩
//     //     minimize: false,
//     //     minimizer: [],

//     //     //  任何字符串：用于设置 process.env.NODE_ENV 的值。
//     //     nodeEnv: 'development',
//     //     // moduleIds: "named",
//     //     // chunkIds: "named",

//     //     // 开启这个编译包更小
//     //     // runtimeChunk: {
//     //     //   name: (entrypoint) => `runtime~${entrypoint.name}`,
//     //     // },
//     // },
//     // devtool: 'cheap-module-source-map', // 生产环境和开发环境判断
//     devtool: 'source-map',
//     entry: {
//         // index: [
//         //   path.join(process.cwd(), '/server/test') // 如果没有配置 context 则需要这样引入  path.join(__dirname, "../../app/index")
//         // ]
//     },
//     output: {
//         // 输出目录
//         path: path.join(process.cwd(), '/dist/server'),
//         filename: '[name].js',
//         chunkFilename: '[name][contenthash].js',
//         // 访问静态资源目录 比如 css img
//         // publicPath: '/',
//         // // 导出库(exported library)的名称
//         // library: 'server',
//         // //   导出库(exported library)的类型
//         // libraryTarget: 'umd',
//         // // 在 UMD 库中使用命名的 AMD 模块
//         // umdNamedDefine: true,
//         // globalObject: 'this',
//         // // chunk 请求到期之前的毫秒数，默认为 120000
//         // chunkLoadTimeout: 120000,
//         // // 「devtool 中模块」的文件名模板 调试webpack的配置问题
//         // // 你的文件在chrome开发者工具中显示为webpack:///foo.js?a93h, 。如果我们希望文件名显示得更清晰呢，比如说 webpack:///path/to/foo.js
//         // devtoolModuleFilenameTemplate: (info) => {
//         //   // "webpack://[namespace]/[resource-path]?[loaders]"
//         //   return `webpack:///${info.resourcePath}?${info.loaders}`;
//         // },
//         // // 如果多个模块产生相同的名称，使用
//         // devtoolFallbackModuleFilenameTemplate: (info) => {
//         //   return `webpack:///${info.resourcePath}?${info.loaders}`;
//         // },
//         // // 如果一个模块是在 require 时抛出异常，告诉 webpack 从模块实例缓存(require.cache)中删除这个模块。
//         // // 并且重启webpack的时候也会删除cache缓存
//         // strictModuleExceptionHandling: true
//     },
//     // plugins: [
//     //     // 复制
//     //     new CopyPlugin([
//     //         {
//     //             from: path
//     //                 .join(process.cwd(), '/server/**/*')
//     //                 .replace(/\\/gi, '/'),
//     //             to: path
//     //                 .join(process.cwd(), '/dist/server')
//     //                 .replace(/\\/gi, '/'),
//     //             // transform(content, absoluteFrom) {
//     //             //     let reg = /.jsx|.js$/g;
//     //             //     if (reg.test(absoluteFrom)) {
//     //             //         return $ResolveAlias.alias(content.toString(), '');
//     //             //     }

//     //             //     return content;
//     //             // },
//     //         },
//     //     ]),
//     //     new CopyPlugin([
//     //         {
//     //             from: path
//     //                 .join(process.cwd(), '/src/**/*')
//     //                 .replace(/\\/gi, '/'),
//     //             to: path
//     //                 .join(process.cwd(), '/dist/server')
//     //                 .replace(/\\/gi, '/'),
//     //             // transform(content, absoluteFrom) {
//     //             //     let reg = /.jsx|.js$/g;
//     //             //     if (reg.test(absoluteFrom)) {
//     //             //         return $ResolveAlias.alias(content.toString(), '');
//     //             //     }

//     //             //     return content;
//     //             // },
//     //         },
//     //     ]),
//     // ],
// };

const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CopyPlugin = require('copy-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isServer = process.env.BUILD_TYPE === 'server';

const rootPath = path.join(__dirname, '../');
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
    // mode: NODE_ENV,
    ...(NODE_ENV = 'development'
        ? {
              watch: true,
              watchOptions: {
                  //延迟监听时间
                  aggregateTimeout: 500,
                  //忽略监听文件夹
                  ignored: '/node_modules/',
              },
          }
        : {}),
    devtool: 'source-map',
    // context: path.join(process.cwd(), '/src'),
    entry: {
        test: path.join(process.cwd(), '/server/test.js'),
    },
    output: {
        path: path.join(process.cwd(), '/dist/server'),
        filename: '[name].js',
        chunkFilename: '[name][contenthash].js',

        // filename: 'static/[name].[hash:8].js',
        // path: path.resolve(process.cwd(), './dist/web'),
        // publicPath: '/',
        // chunkFilename: 'static/[name]-[hash:8].js',
        // libraryTarget: isServer?'commonjs2':'umd',
    },
    // resolve: {
    //     // 路径配置
    //     alias: {
    //         '@': path.join(process.cwd(), '/src'),
    //     },
    //     extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.png', '.jpg'],
    //     modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
    // },
    module: {
        rules: [],
    },
    plugins: [
        // 复制
        new CopyPlugin([
            {
                from: path
                    .join(process.cwd(), '/server/**/*')
                    .replace(/\\/gi, '/'),
                to: path
                    .join(process.cwd(), '/dist/server')
                    .replace(/\\/gi, '/'),
                transform(content, absoluteFrom) {
                    let reg = /.jsx|.js$/g;
                    if (reg.test(absoluteFrom)) {
                        return $ResolveAlias.alias(content.toString(), '');
                    }

                    return content;
                },
            },
        ]),
        new CopyPlugin([
            {
                from: path
                    .join(process.cwd(), '/src/**/*')
                    .replace(/\\/gi, '/'),
                to: path
                    .join(process.cwd(), '/dist/server')
                    .replace(/\\/gi, '/'),
                transform(content, absoluteFrom) {
                    let reg = /.jsx|.js$/g;
                    if (reg.test(absoluteFrom)) {
                        return $ResolveAlias.alias(content.toString(), '');
                    }

                    return content;
                },
            },
        ]),
    ],
};
