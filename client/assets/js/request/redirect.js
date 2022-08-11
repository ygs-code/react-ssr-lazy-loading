/*
 * @Author: your name
 * @Date: 2021-08-12 14:33:50
 * @LastEditTime: 2022-08-11 19:45:17
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/assets/js/request/redirect.js
 */
// import { routePaths, historyPush, getHistory } from "@/router";
import token from "./token";

export const codeMap = {
  // 没有权限跳转到登录页面
  401: (errorInfo) => {
    const XHRQueue = (errorInfo && errorInfo[2] && errorInfo[2].XHRQueue) || [];
    //  localStorage.removeItem("token");
    token.clearQueue();
    //  停止剩余的请求
    for (let index = XHRQueue.length - 1; index >= 0; index--) {
      XHRQueue[index].xmlHttp && XHRQueue[index].xmlHttp.abort();
      XHRQueue.splice(index, 1);
    }
    // 重定向到登录页面
    // historyPush({
    //   url: routePaths.logLn,
    // });
  },
  415: () => {
    // historyPush(
    //   url: routePaths.logLn,
    // });
  }
};
