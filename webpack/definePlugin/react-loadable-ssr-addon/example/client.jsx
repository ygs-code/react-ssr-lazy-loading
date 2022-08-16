/*
 * @Date: 2022-08-15 19:23:52
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 18:52:54
 * @FilePath: /react-ssr-lazy-loading/webpack/definePlugin/react-loadable-ssr-addon/example/client.jsx
 * @Description: 
 */
import React from "react";
import ReactDOM from "react-dom";
import Loadable from  "react-loadable"//"client/component/Loadable";
import App from "./components/App";

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<App />, document.getElementById("app"));
  });
};
