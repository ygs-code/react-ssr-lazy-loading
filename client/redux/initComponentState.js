/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:12:53
 * @FilePath: /react-loading-ssr/client/redux/initComponentState.js
 * @Description:
 */
import React from "react";
import { matchPath } from "react-lazy-router-dom";
import hoistStatics from "hoist-non-react-statics";
import routesComponent, { routesConfigs } from "client/router/routesComponent";
import { mapRedux } from "client/redux";
import { findTreeData, getBaseInitState } from "client/utils";

// 注入initState
const initState = (Component) => {
  const displayName =
    "withRouter(" + (Component.displayName || Component.name) + ")";
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

  InitState.displayName = displayName;
  InitState.WrappedComponent = Component;
  // return hoistStatics(withRouter(AddRouter), Component);
  return hoistStatics(mapRedux()(InitState), Component);
};

@mapRedux()
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
    const { children } = this.props;
    return <>{children(this.props)}</>;
  }
}

export { InitState };

export default initState;
