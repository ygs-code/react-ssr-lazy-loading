/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 15:54:43
 * @FilePath: /react-loading-ssr/client/utils/throttlingStabilization.js
 * @Description:
 */
import lodash from "lodash";

// 节流函数
export const throttle = (() => {
  let startTime = null;
  return (time, callback) =>
    new Promise((resolve) => {
      const nowTime = new Date().getTime();
      if (!startTime || nowTime - startTime > time) {
        startTime = nowTime;
        if (callback && callback instanceof Function) {
          callback();
        }

        resolve();
        // callback&&callback()
      }
    });
})();

// 防抖函数
export const stabilization = (() => {
  let timer = null;
  return (time, callback) =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (callback && callback instanceof Function) {
          callback();
        }

        resolve();
      }, time);
    });
})();

// 因为状态拦截需要传递的是地址，所以只能传对象参数
export const statusThrottle = (() => {
  const objParameter = {
    status: true
  };
  return (callback) =>
    new Promise((resolve, reject) => {
      if (!lodash.isObject(objParameter)) {
        console.error("objParameter参数必须是一个对象");
        reject();
        return;
      }

      if (objParameter.status === false) {
        reject();
        return;
      }
      objParameter.status = false;
      if (callback && callback instanceof Function) {
        callback(objParameter);
      }

      resolve(objParameter);
    });
  // callback && callback(objParameter)
})();
