/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2021-09-30 12:01:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/index.js
 */
import XMLHttpRequest from "./XMLHttpRequest";
import baseUrl from "./baseUrl";
// 合并成一个对象
// import * as requestApi from './requestApi';
// 改名接口导入
// export { register as Register } from './requestApi';

export {
  XMLHttpRequest,
  baseUrl,
  // 改名导出
  // baseUrl as $baseUrl
};

// 整体输出
export * from "./requestApi";
