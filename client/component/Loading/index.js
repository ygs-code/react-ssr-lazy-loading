/*
 * @Date: 2022-08-01 09:57:50
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-05 10:16:38
 * @FilePath: /react-loading-ssr/client/component/Loading/index.js
 * @Description:
 */
import React from "react";

export default (props) => {
  const { isLoading, timedOut, pastDelay, error } = props;

  if (isLoading) {
    if (timedOut) {
      return <div>Loader timed out!</div>;
    } else if (pastDelay) {
      return <div>Loading...</div>;
    }
    return null;
  } else if (error) {
    return <div>Error! Component failed to load</div>;
  }
  return null;
};
