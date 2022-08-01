/*
 * @Date: 2022-08-01 17:17:17
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-01 17:29:54
 * @FilePath: /react-loading-ssr/server/index.js
 * @Description:
 */
import cluster from 'cluster'
import App from './app'

// 开启的子进程数
const workerNum = 3
// 如果是主进程
if (cluster.isMaster) {
  // 创建子进程
  for (let i = 0; i < workerNum; i++) {
    // 通过cluster.fork创建子进程
    cluster.fork()
  }
  // 如果有子进程，就启动相关服务,这里会使用三个进程来执行http服务演示
} else {
  new App()
}
