import React, { useEffect } from "react";
import Nav from "client/component/Nav";
import Head from "client/component/Head";
import setMetaProps from "client/component/SetMetaProps";
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

Index.getInitPropsState = async (props = {}) => {
  const {
    dispatch: {
      home: { setInitState }
    },
    match: {
      params: { page = 1, size = 10 }
    }
  } = props;

  await Head.getInitPropsState(props);
  await Nav.getInitPropsState(props);
};

export default mapRedux()(
  setMetaProps({
    title: "优惠券页面",
    keywords: "优惠券页面网站关键词",
    description: "优惠券页面网站描述"
  })(Index)
);
