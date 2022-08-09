/*
 * @Date: 2022-08-09 09:35:04
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-09 13:52:05
 * @FilePath: /react-loading-ssr/bin/index.js
 * @Description:
 */
import cluster from 'cluster'
import path from 'path'
import os from 'os'
import * as dotenv from 'dotenv'
import { Worker } from 'worker_threads'
import { copyFile, watchFile, readWriteFiles } from '../webpack/utils'
import { spawn, SpawnOptions } from 'child_process'
import kill from 'kill-port' // 杀死端口包
import { execute, iSportTake } from './cmd' // 杀死端口包
import { stabilization } from '../client/utils'
// 注入环境变量
dotenv.config({ path: '.env' })
// 如果是开发环境 先拷贝 服务器文件到 dist
let {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = '',
  port,
} = process.env // 环境参数
console.log('target=======', target)
const isSsr = target === 'ssr'
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production'
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development'
let counter = 0
let child = null
if (isEnvDevelopment && isSsr) {
  readWriteFiles({
    from: path.join(process.cwd(), '/server/**/*').replace(/\\/gi, '/'),
    to: path.join(process.cwd(), '/dist/server').replace(/\\/gi, '/'),
    transform(content, absoluteFrom) {
      // let reg = /.jsx|.js$/g;
      // if (reg.test(absoluteFrom)) {
      //     return $ResolveAlias.alias(content.toString(), '');
      // }
      return content
    },
    callback() {
      counter += 1
      if (child) {
        // spawn 杀死正在执行的子进程
        var kill = spawn('kill', [child.pid])
      }
      stabilization(300, () => {
        if (counter === 1) {
          child = execute(process.platform === 'win32' ? 'npm.cmd' : 'npm', [
            'run',
            'ssr:dev',
          ])
        } else {
          child = execute(process.platform === 'win32' ? 'npm.cmd' : 'npm', [
            'run',
            'bin',
          ])
        }
      })
    },
  })
}
