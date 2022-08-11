/*
 * @Author: your name
 * @Date: 2021-09-29 11:46:06
 * @LastEditTime: 2022-08-11 19:17:43
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /react-loading-ssr/client/assets/js/request/token.js
 */

class Token {
  constructor(doNotToken = []) {
    this.queue = [];
    // 配置不需要token的请求
    this.doNotToken = [
      ...doNotToken,
      "/v3/weather/weatherInfo",
      "/set/user/getVerifyCode",
      "/set/user/login",
      "/api/getHaoKanVideo"
    ];
  }

  subscribeQueue(resolve) {
    this.queue.push(resolve);
  }

  publishQueue(token) {
    this.queue.forEach((item) => {
      const { resolve } = item;
      resolve(token);
    });
    this.queue = [];
  }

  clearQueue() {
    this.queue.forEach((item) => {
      const { reject } = item;
      reject(null);
    });
    this.queue = [];
  }

  get(url) {
    const token = ""; // localStorage.getItem("token");

    if (!url) {
      return token;
    }
    return new Promise((resolve, reject) => {
      if (token) {
        return resolve(token);
      }
      if (this.doNotToken.includes(url)) {
        return resolve("");
      }
      this.subscribeQueue({ resolve, reject });
    });
  }
}

export { Token };
export default new Token();
