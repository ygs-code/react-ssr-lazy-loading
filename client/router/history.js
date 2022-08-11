/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2022-08-11 19:10:38
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/router/history.js
 */

import { createBrowserHistory } from "history";

export const history = {};

// createBrowserHistory({
//    basename: "/", // 基链接
//    forceRefresh: false, // 是否强制刷新整个页面
//    keyLength: 10, // location.key的长度
//   //  getUserConfirmation: (message,callback) =>{
//   //    console.log('message=====',message)
//   //  } // 跳转拦截函数
// });

export const getHistory = (props = {}) =>
  createBrowserHistory({
    basename: "/", // 基链接
    forceRefresh: false, // 是否强制刷新整个页面
    // keyLength: 10, // location.key的长度
    //  getUserConfirmation: (message,callback) => callback(window.confirm(message)) // 跳转拦截函数
    ...props
  });

export const listen = (fn = () => {}) =>
  history.listen((location, action) => {
    fn(location, action);
  });
