import React, { useEffect, useCallback } from "react";
import routesComponent, { routesConfigs } from "@/router/routesComponent";
import { matchPath } from "react-router-dom";
import { mapRedux } from "@/redux";
import { findTreeData, getBaseInitState } from "@/utils";

// 注入initState
const initState = (Component) => {
  class InitState extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      const {
        children = () => {},
        history: { location: { pathname } = {} } = {},
        state = {},
        dispatch
      } = this.props;

      getBaseInitState(dispatch, state);
      this.getInitState();
    }

    getMatch = (routesArray, url) => {
      for (let router of routesArray) {
        let $router = matchPath(url, {
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
    findInitData = (routesConfigs, value, key) => {
      return (findTreeData(routesConfigs, value, key) || {}).initState;
    };

    getInitState = async () => {
      const {
        children = () => {},
        history: { location: { pathname } = {} } = {},
        state = {},
        dispatch
      } = this.props;

      let { name } = this.getMatch(routesComponent, pathname);
      if (
        state[name]?.initState &&
        state[name]?.initState instanceof Object &&
        Object.keys(state[name]?.initState).length
      ) {
        return false;
      }
      let initStateFn = this.findInitData(routesConfigs, name, "name");
      if (initStateFn && initStateFn instanceof Function) {
        let data = await initStateFn();
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
