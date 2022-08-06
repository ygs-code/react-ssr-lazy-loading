/*
 * @Date: 2022-08-06 13:38:04
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-06 13:38:15
 * @FilePath: /react-loading-ssr/client/utils/getGlobal.js
 * @Description:
 */

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}

export default getGlobal
