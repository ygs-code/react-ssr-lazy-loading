/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:11:14
 * @FilePath: /react-loading-ssr/client/router/addRouterApi.js
 * @Description:
 */
import React from "react";
import { withRouter } from "client/router/react-router-dom";
import routePaths from "./routePaths";
import { historyPush } from "./historyPush";

const addRouterApi = (Component) => {
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

  return withRouter(AddRouter);
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
