/*
 * @Author: your name
 * @Date: 2020-12-14 10:03:45
 * @LastEditTime: 2022-08-06 16:26:37
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/assets/js/request/requestApi.js
 */
import Request, { gql, GraphqlClient } from "./request";
import filterGraphqlData from "./filterGraphqlData";

var userId = "559645cd1a38532d14349246";

// 获取验证码
export const getHaoKanVideo = (parameter) => {
  return Request.get("/api/getHaoKanVideo", parameter);
};

//
export const getWeather = (parameter) => {
  return Request.get("/v3/weather/weatherInfo", parameter, {
    baseUrl: "https://restapi.amap.com"
  });
};

// 登录
export const login = (parameter) => {
  return Request.post("/set/user/login", parameter);
};
