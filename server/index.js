require('./ignore.js')();
import clientRouter from './clientRouter.js';
import staticCache from 'koa-static-cache';
import path from 'path';
import cors from 'koa2-cors';
import Loadable from 'react-loadable';
import app from './app.js';
const port = process.env.port || 3002;
app.use(cors());
app.use(clientRouter);
app.use(
    staticCache(path.resolve(__dirname, '../../web'), {
        maxAge: 365 * 24 * 60 * 60,
        gzip: true,
    })
);

console.log(
    `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
);
Loadable.preloadAll().then(() => {
    app.listen(port);
});
