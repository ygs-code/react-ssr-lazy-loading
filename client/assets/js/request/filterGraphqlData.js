/*
 * @Author: your name
 * @Date: 2021-08-20 10:51:16
 * @LastEditTime: 2022-08-10 18:45:31
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/assets/js/request/filterGraphqlData.js
 */
export default (data) => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const { code } = data[key];
      if (code === 200) {
        return data[key];
      }
    }
  }
  return {};
};
