/*
 * @Date: 2022-08-12 10:01:17
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 13:01:18
 * @FilePath: /react-ssr-lazy-loading/client/assets/js/request/test1.js
 * @Description: 
 */
new Promise((resolve, reject) => {
  let appliance = new window.XDomainRequest();
  appliance.onprogress = function () {}; // no aborting
  appliance.ontimeout = function () {
    // alert("timeout")
    reject({ eror: "timeout" });
  }; // "
  appliance.onload = function (e) {
    // do something with appliance.responseText
    // alert("onload" + appliance.responseText)
    resolve(appliance.responseText);
  };
  appliance.onerror = function (e, b) {
    // error handling
    // alert("error" + JSON.stringify(e) + JSON.stringify(b))
    reject({ eror: e });
  };
  //appliance.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  appliance.withCredentials = true; // to support sending cookies with CORS
  appliance.open("POST", axios.defaults.baseURL + url);
  appliance.send(dataToString);
});
