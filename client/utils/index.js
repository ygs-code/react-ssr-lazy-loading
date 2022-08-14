/*
 * @Date: 2022-08-01 17:29:00
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-06 13:40:32
 * @FilePath: /react-loading-ssr/client/utils/index.js
 * @Description:
 */
import {
  throttle,
  stabilization,
  statusThrottle
} from "./throttlingStabilization";
// import {
//     deepCopy
// } from './deepCopy'
// import {SubscribePublished} from './SubscribePublished';
import { CheckDataType } from "./CheckDataType";
import {
  filterTreeData,
  recursionTreeData,
  deepCopy,
  diffData,
  findTreeData
} from "./ergodic";
// import {FloatingBall} from './FloatingBall';
import { getStyle } from "./getCssAttr";
import {
  checkPhone,
  checkUser,
  checkPassword,
  checkVerificationCode,
  firstToUpper
} from "./regular";
import { setInitData } from "./setInitData";
import { getBaseInitState } from "./getBaseInitState";
import stringToObject from "./stringToObject";

export {
  stringToObject,
  getBaseInitState,
  // FloatingBall, // 浮动球 类
  throttle, // 节流函数
  stabilization, // 防抖函数
  statusThrottle, //  状态拦截器
  deepCopy, // 深度拷贝
  // SubscribePublished, // 订阅发布
  CheckDataType, // 检查数据类型
  filterTreeData, // 过滤树数据结构
  recursionTreeData, // 递归循环树数据
  diffData, // 比较新旧两个数据
  findTreeData, // 搜索到树数据的某一条数据单条 不包括父层数据的
  getStyle, // 获取样式
  checkPhone,
  checkUser,
  checkPassword,
  checkVerificationCode,
  firstToUpper,
  setInitData
};
// 整体输出
export * from "./regular.js";
