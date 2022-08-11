/*
 * @Date: 2022-08-09 09:35:04
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 12:23:25
 * @FilePath: /react-loading-ssr/client/App/CreateApp.js
 * @Description:
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Loadable, { Capture } from "@/component/Loadable";
import App from "./App.js";
import "./App.less";

const {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = ""
} = process.env; // 环境参数

function CreateApp(props = {}) {
  const { modules = [] } = props;

  return target === "ssr" ? (
    <Capture report={(moduleName) => modules.push(moduleName)}>
      <App {...props} />
    </Capture>
  ) : (
    <App {...props} />
  );
}

CreateApp.propTypes = {
  modules: PropTypes.object
};
export default CreateApp;
