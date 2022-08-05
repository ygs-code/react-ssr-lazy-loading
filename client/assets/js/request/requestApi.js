/*
 * @Author: your name
 * @Date: 2020-12-14 10:03:45
 * @LastEditTime: 2022-08-05 16:51:35
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/assets/js/request/requestApi.js
 */
import Request, { gql, GraphqlClient } from "./request";
import filterGraphqlData from "./filterGraphqlData";

var userId = "559645cd1a38532d14349246";

// 获取验证码
export const getHaoKanVideo = (parameter) => {


  // ` https://api.apiopen.top/api/getHaoKanVideo?page=${page}&size=${size}`

  return Request.get("/api/getHaoKanVideo",parameter);
};

 

// 登录
export const login = (parameter) => {
  return Request.post("/set/user/login", parameter);
};
