/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2022-08-11 19:45:04
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/assets/js/request/baseUrl.js
 */
const env = process.env.NODE_ENV; // 环境参数
let baseUrl = "";
if (env === "development") {
  baseUrl = "https://api.apiopen.top";
}
if (env === "production") {
  baseUrl = "https://api.apiopen.top";
}

export default baseUrl;
