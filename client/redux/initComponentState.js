/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:12:53
 * @FilePath: /react-loading-ssr/client/redux/initComponentState.js
 * @Description:
 */
import React from "react";
import { matchPath } from "react-router-dom";
import routesComponent, { routesConfigs } from "@/router/routesComponent";
import { mapRedux } from "@/redux";
import { findTreeData, getBaseInitState } from "@/utils";

// 注入initState
const initState = (Component) => {
  class InitState extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const { state = {}, dispatch } = this.props;

      getBaseInitState(dispatch, state);
      this.getInitState();
    }

    getMatch = (routesArray, url) => {
      for (const router of routesArray) {
        const $router = matchPath(url, {
          path: router.path,
          exact: router.exact
        });

        if ($router) {
          return {
            ...router,
            ...$router
          };
        }
      }
    };

    // 获取组件初始化数据
    findInitData = (routesConfigs, value, key) =>
      (findTreeData(routesConfigs, value, key) || {}).initState;

    getInitState = async () => {
      const {
        history: { location: { pathname } = {} } = {},
        state = {},
        dispatch
      } = this.props;

      const { name } = this.getMatch(routesComponent, pathname);
      if (
        state[name]?.initState &&
        state[name]?.initState instanceof Object &&
        Object.keys(state[name]?.initState).length
      ) {
        return false;
      }
      const initStateFn = this.findInitData(routesConfigs, name, "name");
      if (initStateFn && initStateFn instanceof Function) {
        const data = await initStateFn();
        dispatch[name].setInitState({
          initState: data
        });
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  }

  return mapRedux()(InitState);
};

export default initState;
