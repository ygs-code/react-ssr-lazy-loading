/*
 * @Date: 2022-08-04 09:21:17
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:12:21
 * @FilePath: /react-ssr-lazy-loading/client/index.js
 * @Description:
 */
// import { hydrate, render } from "react-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import app from "./App/index.js";
import { getBrowserHistory } from "client/router/history";
import store from "client/redux";
import routesComponent from "client/router/routesComponent";

// 如果是开发环境 先拷贝 服务器文件到 dist
let {
  target // 环境参数
} = process.env; // 环境参数

const isSsr = target === "ssr";

const renderApp = () => {
  const history = getBrowserHistory();

  if (isSsr && !module.hot) {
    hydrateRoot(
      document.getElementById("root"),
      app({
        history,
        store,
        routesComponent
      })
    );
  } else {
    createRoot(document.getElementById("root")).render(
      app({
        history,
        store,
        routesComponent
      })
    );
  }
};

// node 服务器中只能在这个页面使用window
window.main = () => {
  // preloadReady().then(() => {
  renderApp();
  // });
};

// // // // 只有当开启了模块热替换时 module.hot 才存在
// if (module.hot) {
//   // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
//   // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
//   module.hot.accept(["./App/index.js"], () => {
//     console.log("有个模块更新");
//     renderApp();
//     // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
//     //   let App=require('./App').default;
//     //   ReactDOM.render(<App />, document.getElementById('root'));
//   });
// }

// window.store = store;
