require('./ignore.js')()
import Loadable from 'react-loadable'
import Koa from 'koa'
import Router from './router'
import Middleware from './middleware'
// import { getEv } from '@/utils';

let {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = '',
} = process.env // 环境参数

//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production'
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development'

const port = process.env.port || 3002

class App {
  constructor() {
    this.init()
  }
  init() {
    this.app = new Koa()
    this.addRouter()
    this.addMiddleware()
    this.listen()
  }
  addRouter() {
    new Router(this.app)
  }
  addMiddleware() {
    new Middleware(this.app)
  }
  listen() {
    Loadable.preloadAll().then(() => {
      const server = this.app.listen(port, function () {
        var port = server.address().port
        console.log(
          `\n==> 🌎  node服务器启动成功，监听端口：${port}. 请打开浏览器 http://localhost:${port}/ \n`,
        )
      })
    })
  }
}

export default App