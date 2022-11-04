/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:07:47
 * @FilePath: /react-ssr-lazy-loading/client/App/App.js
 * @Description:
 */
import React, { Component } from "react";
import { Provider } from "react-redux";
import Routers from "client/router";
// import { stringToObject } from "client/utils";
import "./App.less";
import "client/assets/css/base.less";
import "bootstrap/dist/css/bootstrap.css";

// let {
//   NODE_ENV, // 环境参数
//   target, // 环境参数
//   htmlWebpackPluginOptions = ""
// } = process.env; // 环境参数

class App extends Component {
  render() {
    const { history, store, routesComponent } = this.props;

    /*
  Warning: Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.
  来自Provider组件
  */
    return (
      <Provider store={store}>
        <Routers history={history} routesComponent={routesComponent} />
      </Provider>
    );
  }
  componentDidCatch(error, info) {
    console.error("Error：", error);
    console.error("错误发生的文件栈：", info.componentStack);
  }
}

// App.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default App;
