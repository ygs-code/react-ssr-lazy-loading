/*
 * @Date: 2022-08-06 11:29:32
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-06 14:39:04
 * @FilePath: /react-loading-ssr/client/assets/js/request/test.js
 * @Description:
 */

// const superagent = require('superagent');
import superagent from "superagent";
import FormData from "form-data";
import fetch from "node-fetch";
import XMLHttpRequest from "./XMLHttpRequest";

new XMLHttpRequest().xhRequest({
  url: "http://127.0.0.1:3100/api/set/user/login",
  parameter: {
    password: "guan13688426",
    username: "qq281113270",
    verificationCode: "U8C2W"
  },
  method: "POST",
  headers: { "Content-Type": "application/json" },
  success: (data) => {
    console.log("data1==========", data);
  }
});

// const ajax = async () => {
//   const body = {
//     password: 'guan13688426',
//     username: 'qq281113270',
//     verificationCode: 'FCfq6',
//   }

//   const formData = new FormData()
//   formData.append('greeting', 'Hello, world!')

//   //   const formData = new FormData()
//   //   // const parameters = new URLSearchParams(await this.text());

//   //   for (const [name, value] of body) {
//   //     formData.append(name, value)
//   //   }

//   //   console.log('formData====', formData)

//   //   const body = {a: 1};
//   const response = await fetch('http://127.0.0.1:3100/api/set/user/login', {
//     method: 'POST',
//     body: formData, //JSON.stringify( body),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   //   const data = await response.json()
//   console.log(response)

//   //   superagent
//   //   .post('http://127.0.0.1:3100/api/set/user/login')
//   //   .send(body) // sends a JSON post body

//   //   .end(function (err, res) {
//   //     console.log('err========',err)
//   //     console.log('res========',res)

//   //     // Calling the end function will send the request
//   //   });
// }

// ajax()
