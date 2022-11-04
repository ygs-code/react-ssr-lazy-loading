/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 13:01:55
 * @FilePath: /react-ssr-lazy-loading/client/component/Nav/index.js
 * @Description:
 */
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { mapRedux } from "client/redux";
import addRouterApi from "client/router/addRouterApi";
import "./index.less";

const Index = (props) => {
  const {
    dispatch: { nav: { setMenuActive } = {} } = {},
    match: { params = {}, path: matchPath } = {},
    pushRoute
  } = props;

  return (
    <div className="navigate-box center-box">
      <Nav fill pills className="navigate">
        {[
          {
            title: "首页",
            path: "/",
            name: "home"
          },
          {
            title: "用户页面",
            path: "/user",
            name: "user"
          },
          {
            title: "优惠券",
            path: "/marketing/discount-coupon/:id",
            name: "DiscountCoupon"
          }
        ].map((item, index) => {
          const { path, title, name } = item;
          return (
            <NavItem key={index}>
              <NavLink
                active={matchPath === path}
                onClick={() => {
                  setMenuActive({
                    menuActive: path
                  });
                  if (index === 1) {
                    pushRoute({ path });
                  } else if (index === 2) {
                    pushRoute({
                      path,
                      params: {
                        id: 123
                      }
                    });
                  } else {
                    pushRoute({ name });
                  }
                }}>
                {title}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </div>
  );
};

Index.getInitPropsState = async (props = {}) => {
  const {
    dispatch: { nav: { setMenuActive } = {} } = {},
    match: { path: matchPath } = {}
  } = props;
  setMenuActive({
    menuActive: matchPath
  });
};

Index.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  state: PropTypes.object
};
export default mapRedux()(addRouterApi(Index));
