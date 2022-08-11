/*
 * @Date: 2022-08-01 09:57:50
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:16:17
 * @FilePath: /react-loading-ssr/client/component/Loading/index.js
 * @Description:
 */
import React from "react";

export default (props) => {
  const { isLoading, timedOut, pastDelay, error } = props;
  let Component = null;
  if (isLoading) {
    if (timedOut) {
      Component = <div>Loader timed out!</div>;
    }
    if (pastDelay) {
      Component = <div>Loading...</div>;
    }
    Component = null;
  }
  if (error) {
    Component = <div>Error! Component failed to load</div>;
  }
  return Component;
};
