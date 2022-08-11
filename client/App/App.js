/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 13:55:53
 * @FilePath: /react-loading-ssr/client/App/App.js
 * @Description:
 */
import React from "react";
import { Provider } from "react-redux";
import Routers from "@/router";
import "./App.less";
import "@/assets/css/base.less";
import "bootstrap/dist/css/bootstrap.css";

function App(props) {
  const obj = {
    c: "1"
    // c: "3"
  };
  const {
    history,
    location,
    store,
    a,
    b,
    c,
    d,
    e,
    f,
    sadfasdfasdfsadfasdfasdfasdfasdfsdf
  } = props;
  if (a) {
    console.log(a);
  } else {
    console(b);
  }

  return (
    <Provider store={store}>
      <Routers history={history} location={location} />
    </Provider>
  );
}
// App.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default App;
