/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 13:55:21
 * @FilePath: /react-loading-ssr/client/pages/marketing/pages/DiscountCoupon/index.js
 * @Description:
 */
import React from "react";
import Nav from "@/component/Nav";
import Head from "@/component/Head";

// 2234;
// 权限跳转登录页面可以在这控制
function Index(props = {}) {
  return (
    <div>
      <Head />
      <Nav {...props} />

      <div className="center-box">当前页面是DiscountCoupon页面</div>
    </div>
  );
}

export default Index; // mapRedux()(Index);
