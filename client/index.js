//18
import { hydrate, render } from 'react-dom';
import React, { Suspense, lazy } from 'react';
import app from './App/index.js';
import Loadable from 'react-loadable';
import { getHistory } from '@/router/history';
import createStore from '@/redux';

const store = createStore(window);
 

let renderComponent = module.hot ? render : hydrate;
const renderApp = () => {
    let modules = [];
    let history = getHistory();
    let context = [];
    let location = '/';
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
};

// node 服务器中只能在这个页面使用window
window.main = () => {
    Loadable.preloadReady().then(() => {
        renderApp();
    });
};

// // // 只有当开启了模块热替换时 module.hot 才存在
// if (module.hot) {
//     // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
//     // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
//     module.hot.accept(['./App/index.js'], () => {
//         renderApp();
//         // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
//         //   let App=require('./App').default;
//         //   ReactDOM.render(<App />, document.getElementById('root'));
//     });
// }

window.store = store;