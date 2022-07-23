require('./ignore.js')();
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
    createMemoryHistory,
    createBrowserHistory,
    createHashHistory,
} from 'history';
import { getBundles } from 'react-loadable/webpack';
import stats from '../../web/react-loadable.json';
import Helmet from 'react-helmet';
import { matchPath } from 'react-router-dom';
// import { matchRoutes } from 'react-router-config';
import store from '../src/redux';
import routesConfig from '../src/router/routesComponent';
// import client from '../src/app/index.js';
import path from 'path';
import fs from 'fs';
const CreateApp = require('../src/App').default;

const createTags = (modules) => {
    let bundles = getBundles(stats, modules);
    let scriptfiles = bundles.filter((bundle) => bundle.file.endsWith('.js'));
    let stylefiles = bundles.filter((bundle) => bundle.file.endsWith('.css'));
    let scripts = scriptfiles
        .map((script) => `<script src="/${script.file}"></script>`)
        .join('\n');
    let styles = stylefiles
        .map((style) => `<link href="/${style.file}" rel="stylesheet"/>`)
        .join('\n');
    return { scripts, styles };
};

const prepHTML = (
    data,
    { html, head, rootString, scripts, styles, initState }
) => {
    rootString = rootString + 'asdfsddsf';
    data = data.replace('<html', `<html ${html}`);
    data = data.replace('</head>', `${head} \n ${styles}</head>`);
    data = data.replace(
        '<div id="root"></div>',
        `<div id="root"><div> asfsdfsd  ${rootString}</div></div>`
    );
    data = data.replace(
        '<body>',
        `<body> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(
            initState
        )}</script>`
    );
    data = data.replace('</body>', `${scripts}</body>`);
    return data;
};

const getMatch = (routesArray, url) => {
    for (let router of routesArray) {
        let $router = matchPath(url, {
            path: router.path,
            exact: router.exact,
        });

        if ($router) {
            return {
                // ...router,
                ...$router,
            };
        }
    }
};

const makeup = (ctx, store, CreateApp, html, isMatchRoute) => {
    let initState = store.getState();
    console.log('ctx.req.url=', ctx.req.url);
    let history = createMemoryHistory({ initialEntries: [ctx.req.url] });
    history = {
        ...history,
        ...isMatchRoute,
    };
    console.log('history====', history);
    let modules = [];
    let context = [];
    let location = ctx.req.url;

    let rootString = renderToString(
        CreateApp({ store, context, history, modules, location })
    );

    // <ul></ul><div>当前页面是Home页面 123213</div><div class="home"><a
    // href="/user/123">跳转到用户页面</a></div><div>跳转到DiscountCoupon页面</div>

    let { scripts, styles } = createTags(modules);

    const helmet = Helmet.renderStatic();
    let renderedHtml = prepHTML(html, {
        html: helmet.htmlAttributes.toString(),
        head:
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString(),
        rootString,
        scripts,
        styles,
        initState,
    });
    return renderedHtml;
};

const clientRouter = async (ctx, next) => {
    let html = fs.readFileSync(
        path.join(path.resolve(__dirname, '../../web'), 'index.html'),
        'utf-8'
    );
    let isMatchRoute = getMatch(routesConfig, ctx.req.url);
    if (isMatchRoute) {
        let renderedHtml = await makeup(
            ctx,
            store,
            CreateApp,
            html,
            isMatchRoute
        );
        ctx.body = renderedHtml;
    }
    await next();
};

export default clientRouter;
