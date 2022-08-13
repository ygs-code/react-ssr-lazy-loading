/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:53:40
 * @FilePath: /react-loading-ssr/client/App/App.js
 * @Description:
 */
import React from "react";
import { Provider } from "react-redux";
import Routers from "client/router";
import "./App.less";
import "client/assets/css/base.less";
import "bootstrap/dist/css/bootstrap.css";
console.log("process.env=====", process.env);
const App = (props) => {
  const { history, location, store } = props;
  return (
    <Provider store={store}>
      <Routers history={history} location={location} />
    </Provider>
  );
};
// App.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default App;
