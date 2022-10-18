/*
 * @Date: 2022-08-01 17:29:00
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:52:33
 * @FilePath: /react-loading-ssr/client/utils/getBaseInitState.js
 * @Description: ()
 */
// 这种方式需要前后命名一致才行能做到这样效果
export const getBaseInitState = async (dispatch, state, props) => {
  const dispatchBaseInitState = dispatch.baseInitState;
  // 函数命名必须是这样
  const reg = /(?<=^get)(.+?)(?=Async$)/g;
  // let reg1 = /Async$/g;
  for (const key in dispatchBaseInitState) {
    if (Object.prototype.hasOwnProperty.call(dispatchBaseInitState, key)) {
      let dataKey = key.match(reg);
      if (dataKey) {
        dataKey =
          dataKey[0].substr(0, 1).toLocaleLowerCase() + dataKey[0].substr(1);
        if (state.baseInitState[dataKey]) {
          return false;
        }
        await dispatchBaseInitState[key](props);
      }
    }
  }
};
