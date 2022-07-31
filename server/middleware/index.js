import staticCache from 'koa-static-cache';
import cors from 'koa2-cors';
// import { getEv } from '@/utils';
import path, { resolve } from 'path';

let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
    COMPILER_ENV,
} = process.env; // 环境参数

// 如果是中间件编译
const isCompile = COMPILER_ENV === 'middleware';

//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

export default class Middleware {
    constructor(app) {
        this.app = app;
        this.init();
    }
    init() {
        this.addMiddleware();
    }

    addStaticCacheMiddleware() {
        this.app.use(
            staticCache(resolve(resolve('./'), '/dist/web'), {
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
        this.app.use(cors());
    }

    addWebpackHotMiddleware() {
        const WebpackHot = require('./webpackHot').default;
        new WebpackHot(this.app);
    }

    addMiddleware() {
        this.addCorsMiddleware();

        if (isCompile) {
            this.addWebpackHotMiddleware();
        } else {
            this.addStaticCacheMiddleware();
            this.addClientRouterMiddleware();
        }
    }
}
