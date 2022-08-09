/*
 * @Date: 2022-08-01 09:57:50
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-09 10:39:13
 * @FilePath: /react-loading-ssr/webpack/index.js
 * @Description:
 */
const webpack = require('webpack')
const client = require('./config/client')
const server = require('./config/server')
const webpackMerge = require('webpack-merge')
require('dotenv').config({ path: '.env' })

let {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = '',
} = process.env // 环境参数

const isSsr = target === 'ssr'
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production'
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development'

module.exports = {
  compiler: () => {
    if (isEnvProduction && isSsr) {
      // 先编译前端，在编译后台
      let clientCompiler = webpack(client)

      return false
    }

    return webpack(isSsr ? [client, server] : [client])
  },
  config: isSsr ? [client, server] : [client],
}
