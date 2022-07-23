//18
import { hydrate, render } from 'react-dom';
import React, { Suspense, lazy } from 'react';
import App from './App/index.js';
import Loadable from 'react-loadable';
import { getHistory } from '@/router/history';
console.log('htmlWebpackPluginOptions=', htmlWebpackPluginOptions);
console.log('process=', process);

let renderComponent = process.env.target === 'ssr' ? hydrate : render;

 
window.main = () => {
    let modules = [];
    let history = getHistory();
    let context = [];
    let location = '/';
    // window.addEventListener('load', () => {
    Loadable.preloadReady().then(() => {
        console.log('process.env.target=', process.env.target);
        console.log('App=========', App);

        renderComponent(
            App({
                modules,
                history,
                context,
                location,
            }),
            document.getElementById('root')
        );
    });

    // });
};
