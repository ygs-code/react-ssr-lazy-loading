/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 18:31:35
 * @FilePath: /react-ssr-lazy-loading/client/redux/models/baseInitState.js
 * @Description:
 */

import { getWeather } from "../../assets/js/request/requestApi";

const setInitData = (global, name) => {
  let initState = {};
  if (global && global.__INITIAL_STATE__ && global.__INITIAL_STATE__[name]) {
    initState = global.__INITIAL_STATE__[name];
  }

  return initState;
};
export default (global) => ({
  state: {
    ...setInitData(global, "baseInitState"),
    menuActive: "/"
  },
  reducers: {
    setInitState(state, newState) {
      return {
        ...state,
        ...newState
      };
    },
    setMenuActive(state, newState) {
      return {
        ...state,
        ...newState
      };
    }
  },
  // effects: {
  //     async incrementAsync(num1, rootState, num2) {
  //         /*
  //                     第二个变量rootState， 为当前model的state的值
  //                     第一个变量num1， 第三个变量num2分别， 调用incrementAsync时传递进来的第一个参数， 第二个参数，后面依次类推。
  //                     例如：dispatch.count.incrementAsync(10, 20)时，num1 = 10, num2 = 20
  //                 */
  //         // await new Promise((resolve) => setTimeout(resolve, 2000));
  //         // this.increment(num1);
  //     },
  // },
  effects: (dispatch) => ({
    async getWeatherAsync() {
      return await getWeather({
        key: "2d935fc56c5f9ab2ef2165822cedff56",
        city: "440300",
        extensions: "all"
      })
        .then((data) => {
          dispatch.baseInitState.setInitState({
            weather: data.forecasts[0]
          });
          return data;
        })
        .catch((err) => {
          console.log("Error: ", err.message);
        });
    }
  })
});
