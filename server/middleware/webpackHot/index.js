import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { compiler } from '../../../webpack';

class WebpackHot {
    constructor(app) {
        this.app = app;
        this.init();
    }
    init() {
        this.compiler = compiler();
        this.addMiddleware();
    }
    addMiddleware() {
        this.addWebpackDevMiddleware();
        // this.addWebpackHotMiddleware();
        this.addWebpackHotServerMiddleware();
    }
    addWebpackDevMiddleware() {
        const _this = this;
        this.app.use(
            _this.koaDevware(
                webpackDevMiddleware(_this.compiler, {
                    noInfo: true,
                    serverSideRender: true, // 是否是服务器渲染
                    publicPath: '/',
                    writeToDisk: true, //是否写入本地磁盘
                }),
                _this.compiler
            )
        );
    }

    addWebpackHotMiddleware() {
        const _this = this;
        this.app.use(
            webpackHotMiddleware(
                _this.compiler.compilers.find(
                    (compiler) => compiler.name === 'client'
                )
            )
        );
    }

    addWebpackHotServerMiddleware() {
        const _this = this;
        this.app.use(
            webpackHotServerMiddleware(_this.compiler, {
                createHandler: webpackHotServerMiddleware.createKoaHandler,
                serverRendererOptions: {
                    foo: 'Bar',
                },
            })
        );
    }
    koaDevware(dev, compiler) {
        const waitMiddleware = () =>
            new Promise((resolve, reject) => {
                dev.waitUntilValid(() => resolve(true));
                compiler.plugin('failed', (error) => reject(error));
            });

        return async (ctx, next) => {
            await waitMiddleware();
            await dev(
                ctx.req,
                {
                    end(content) {
                        ctx.body = content;
                    },
                    setHeader: ctx.set.bind(ctx),
                    locals: ctx.state,
                },
                next
            );
        };
    }
}

export default WebpackHot;
