import staticCache from 'koa-static-cache';
import cors from 'koa2-cors';
import clientRouter from '../clientRouter.js';
import path from 'path';

export default class Middleware {
    constructor(app) {
        console.log('app=============',app)
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
        this.app.use(clientRouter());
    }
    addCorsMiddleware() {
        console.log('this.app==========', this.app);
        this.app.use(cors());
    }

    addMiddleware() {
        this.addCorsMiddleware();
        this.addClientRouterMiddleware();
        this.addStaticCacheMiddleware();
    }
}
