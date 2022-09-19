import React, { useEffect } from "react";
import Nav from "client/component/Nav";
import Head from "client/component/Head";
import { mapRedux } from "client/redux";
const Index = () => {
  useEffect(() => {
    console.log("DiscountCoupon");
  }, []);
  return (
    <div>
      <Head />
      <Nav />

      <div className="center-box">当前页面是DiscountCoupon页面</div>
    </div>
  );
};

export default mapRedux()(Index);
