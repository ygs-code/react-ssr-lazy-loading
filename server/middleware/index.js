import staticCache from 'koa-static-cache';
import cors from 'koa2-cors';
// import clientRouter from './clientRouter.js';

import path from 'path';

let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
} = process.env; // 环境参数

console.log('NODE_ENV===============', NODE_ENV);

//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

export default class Middleware {
    constructor(app) {
        console.log('app=============', app);
        this.app = app;
        this.init();
    }
    init() {
        this.addMiddleware();
    }

    addStaticCacheMiddleware() {
        this.app.use(
            staticCache(path.resolve(__dirname, '../../../web'), {
                maxAge: 365 * 24 * 60 * 60,
                gzip: true,
            })
        );
    }
    addClientRouterMiddleware() {
        const clientRouter = require('./clientRouter').default;
        this.app.use(clientRouter());
    }
    addCorsMiddleware() {
        console.log('this.app==========', this.app);
        this.app.use(cors());
    }

    addWebpackHotMiddleware() {
        
            const WebpackHot = require('./webpackHot').default
            console.log('WebpackHot======',WebpackHot)
            new WebpackHot(this.app);
         
    }

    addMiddleware() {
        this.addCorsMiddleware();
        console.log('isEnvDevelopment===============', isEnvDevelopment);
        if (isEnvDevelopment) {
            this.addWebpackHotMiddleware();
        } else {
            this.addStaticCacheMiddleware();
            this.addClientRouterMiddleware();
        }
    }
}
