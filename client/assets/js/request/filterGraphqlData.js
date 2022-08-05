/*
 * @Author: your name
 * @Date: 2021-08-20 10:51:16
 * @LastEditTime: 2021-08-20 11:47:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/filterGraphqlData.js
 */
export default (data) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const { code } = data[key];
      if (code === 200) {
        return data[key];
      }
    }
  }
  return {};
};
