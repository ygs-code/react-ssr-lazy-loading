import React, { useEffect, useCallback } from "react";
import routesComponent, { routesConfigs } from "@/router/routesComponent";
import { matchPath } from "react-lazy-router-dom";
import { mapRedux } from "@/redux";
import { findTreeData, getBaseInitState } from "@/utils";

// 注入initState
const InitState = (props) => {
  const {
    children = () => {},
    history: { location: { pathname } = {} } = {},
    state = {},
    dispatch
  } = props;
  const { baseInitState = {} } = state;

  const getMatch = useCallback((routesArray, url) => {
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
  }, []);

  // 获取组件初始化数据
  const findInitData = useCallback((routesConfigs, value, key) => {
    return (findTreeData(routesConfigs, value, key) || {}).initState;
  }, []);

  const getInitState = useCallback(async () => {
    let { name } = getMatch(routesComponent, pathname);
    if (
      state[name]?.initState &&
      state[name]?.initState instanceof Object &&
      Object.keys(state[name]?.initState).length
    ) {
      return false;
    }
    let initStateFn = findInitData(routesConfigs, name, "name");
    if (initStateFn && initStateFn instanceof Function) {
      let data = await initStateFn();
      dispatch[name].setInitState({
        initState: data
      });
    }
  }, []);

  useEffect(() => {
    getBaseInitState(dispatch, state);
    getInitState();
  }, []);
  return <> {children(props)}</>;
};

export default mapRedux()(InitState);
