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
  const { error } = props;

  return error ? <div>Error:{error}</div> : <div>Loading...</div>;
};
