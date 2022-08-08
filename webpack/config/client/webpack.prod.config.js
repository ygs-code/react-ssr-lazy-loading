const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackPluginCopyFile = require('../../definePlugin/webpack-plugin-copy-file');
const rootPath = process.cwd();
let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
} = process.env; // 环境参数
const isDevelopment = NODE_ENV == 'development';

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
    mode: NODE_ENV,
    ...(isDevelopment
        ? {
              watch: true,
              watchOptions: {
                  //延迟监听时间
                  aggregateTimeout: 300,
                  //忽略监听文件夹
                  ignored: '/node_modules/',
              },
          }
        : {
              watch: false,
          }),

    module: {
        rules: [
            // css
            {
                test: /\.css$/i,
                // 排除文件,因为这些包已经编译过，无需再次编译
                // exclude: /(node_modules|bower_components)/,
                use: [
                    // 'thread-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
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
                ],
            },
            //   less
            {
                test: /\.less$/i,
                use: [
                    // 'thread-loader',
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    'css-loader',
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
                ],
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
        ],
    },
    plugins: [
        ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),

        ...(target == 'ssr'
            ? [
                  new webpackPluginCopyFile(
                      [
                          // {
                          //     from:  path.join(process.cwd(), 'webpack/definePlugin/*'),
                          //     to:    path.join(process.cwd(), '/webpack/newDefinePlugin'),
                          //     transform(content, absoluteFrom) {
                          //         // let reg = /.jsx|.js$/g;
                          //         // if (reg.test(absoluteFrom)) {
                          //         //     return $ResolveAlias.alias(content.toString(), '');
                          //         // }

                          //         return content;
                          //     },
                          // },

                          {
                              from: path
                                  .join(process.cwd(), '/server/**/*')
                                  .replace(/\\/gi, '/'),
                              to: path
                                  .join(process.cwd(), '/dist/server/server')
                                  .replace(/\\/gi, '/'),
                              transform(content, absoluteFrom) {
                                  // let reg = /.jsx|.js$/g;
                                  // if (reg.test(absoluteFrom)) {
                                  //     return $ResolveAlias.alias(content.toString(), '');
                                  // }

                                  return content;
                              },
                          },
                          {
                              from: path
                                  .join(process.cwd(), '/client/**/*')
                                  .replace(/\\/gi, '/'),
                              to: path
                                  .join(process.cwd(), '/dist/server/client')
                                  .replace(/\\/gi, '/'),
                              transform(content, absoluteFrom) {
                                  return content;
                              },
                          },
                      ],
                      {
                          resolve: {
                              // 路径配置
                              alias: {
                                  '@/': path.join(
                                      process.cwd(),
                                      '/dist/server/client/'
                                  ),
                              },
                          },
                      }
                  ),
              ]
            : []),

        new ManifestPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),

        new CleanWebpackPlugin(['./dist/server', './dist/client'], {
            root: rootPath,
        }),

        // // 复制
        // new CopyWebpackPlugin([
        //     {
        //         from: path
        //             .join(process.cwd(), '/client/static/**/*')
        //             .replace(/\\/gi, '/'),
        //         to: path
        //             .join(process.cwd(), '/dist/client/static')
        //             .replace(/\\/gi, '/')
        //     },
        // ]),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        // new webpack.optimize.OccurrenceOrderPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendors', 'manifest'],
        //     minChunks: 2,
        // }),
        // new ReactLoadablePlugin({
        //     filename: path.join(rootPath, './dist/react-loadable.json'),
        // }),
        // new ReactLoadablePlugin({
        //     filename: path.join(
        //         process.cwd(),
        //         '/dist/client/react-loadable.json'
        //     ),
        // }),
    ],
};
