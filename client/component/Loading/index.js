/*
 * @Date: 2022-08-01 09:57:50
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 13:39:59
 * @FilePath: /react-loading-ssr/client/component/Loading/index.js
 * @Description:
 */
import React from "react";

export default function (props) {
  const { isLoading, timedOut, pastDelay, error } = props;

  if (isLoading) {
    if (timedOut) {
      return <div>Loader timed out!</div>;
    }
    if (pastDelay) {
      return <div>Loading...</div>;
    }
    return null;
  }
  if (error) {
    return <div>Error! Component failed to load</div>;
  }
  return null;
}
