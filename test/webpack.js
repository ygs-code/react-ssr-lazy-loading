/*
 * @Date: 2022-08-04 13:33:43
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-04 14:22:07
 * @FilePath: /react-loading-ssr/test/webpack.js
 * @Description:
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = {
  name: 'server',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
    global: false,
  },
  entry: {
    // 妙啊
   ['../../index']: path.join(__dirname, '/index.js'),
  },
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    chunkFilename: 'static/js/[name].js',

    // strictModuleExceptionHandling: !isEnvProduction,
    // 导出库(exported library)的名称
    library: 'server',
    //   导出库(exported library)的类型
    libraryTarget: 'umd',
    // libraryTarget: 'commonjs2',
    // 在 UMD 库中使用命名的 AMD 模块
    umdNamedDefine: true,
    globalObject: 'this',
  },
  //在第一个错误出现时抛出失败结果，而不是容忍它
  bail: true,
  module: {
    rules: [
      {
        test: /(\.jsx?$)|(\.js?$)/,
        exclude: /node_modules/,
        // include: path.resolve(rootPath, 'client'),
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['env', 'react', 'stage-0'],
            // plugins: ['transform-runtime', 'add-module-exports'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    // 复制
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(process.cwd(), '/test/index.js').replace(/\\/gi, '/'),
    //     to: path.join(process.cwd(), '/test/dist').replace(/\\/gi, '/'),
    //   },
    // ]),
  ],
}
