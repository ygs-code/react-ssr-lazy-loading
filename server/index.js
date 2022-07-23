require('./ignore.js')();

import clientRouter from './clientRouter.js';
import staticCache from 'koa-static-cache';
import path from 'path';
import cors from 'koa2-cors';
import Loadable from 'react-loadable';
import koaRouter from 'koa-router';
import { menu } from './baseInitState';
import app from './app.js';
const port = process.env.port || 3002;

app.use(cors());

const router = koaRouter({
    prefix: '/api', // 路由前缀
});

// 修改为其他请求类型，只需要将get改成需要的类型即可
router.get('/menu', async (ctx, next) => {
    ctx.body = JSON.stringify({
        code: 200,
        message: '请求成功',
        menuList: menu(),
    });
    await next();
});

// 加载路由中间件
app.use(router.routes());

app.use(clientRouter);
app.use(
    staticCache(path.resolve(__dirname, '../../web'), {
        maxAge: 365 * 24 * 60 * 60,
        gzip: true,
    })
);

console.log(
    `\n==> 🌎  node服务器启动成功，监听端口：${port}. 请打开浏览器 http://localhost:${port}/ \n`
);
Loadable.preloadAll().then(() => {
    app.listen(port);
});
