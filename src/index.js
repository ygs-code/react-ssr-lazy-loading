//18
import {hydrate, render} from 'react-dom';
import React, {Suspense, lazy} from 'react';
import app from './App/index.js';
import Loadable from 'react-loadable';
import {getHistory} from '@/router/history';
import createStore from '@/redux';

const store = createStore(window);
// console.log('htmlWebpackPluginOptions=', htmlWebpackPluginOptions);
// console.log('process=', process);

let renderComponent = process.env.target === 'ssr' ? hydrate : render;
// node 服务器中只能在这个页面使用window
window.main = () => {
    let modules = [];
    let history = getHistory();
    let context = [];
    let location = '/';
    Loadable.preloadReady().then(() => {
        // console.log('process.env=', process.env);
        renderComponent(
            app({
                modules,
                history,
                context,
                location,
                store,
            }),
            document.getElementById('root')
        );
    });
};

window.store = store;
