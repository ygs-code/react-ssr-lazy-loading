/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:11:14
 * @FilePath: /react-loading-ssr/client/router/addRouterApi.js
 * @Description:
 */
import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { withRouter } from "./react-router-dom";
import routePaths from "./routePaths";
import { historyPush } from "./historyPush";

const addRouterApi = (Component) => {
  const displayName =
    "withRouter(" + (Component.displayName || Component.name) + ")";
  class AddRouter extends React.Component {
    constructor(props) {
      super(props);
    }

    pushRoute = (parameter) => {
      const { name, url, path } = parameter;
      const { history } = this.props;
      historyPush({
        history,
        ...parameter,
        url: routePaths[name] || url || path
      });
    };

    render() {
      return (
        <Component
          {...this.props}
          routePaths={routePaths}
          pushRoute={this.pushRoute}
        />
      );
    }
  }

  AddRouter.displayName = displayName;
  AddRouter.WrappedComponent = Component;
  return hoistStatics(withRouter(AddRouter), Component);
};

@withRouter
class AddRouterApi extends React.Component {
  constructor(props) {
    super(props);
  }

  pushRoute = (parameter) => {
    const { name, url, path } = parameter;
    const { history } = this.props;

    historyPush({
      history,
      ...parameter,
      url: routePaths[name] || url || path
    });
  };

  render() {
    const { children } = this.props;
    return (
      <>
        {children({
          ...this.props,
          routePaths: routePaths,
          pushRoute: this.pushRoute
        })}
      </>
    );
  }
}

export { AddRouterApi };

export default addRouterApi;
