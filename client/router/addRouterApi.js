import React, { useEffect } from "react";
import { withRouter } from "@/router/react-router-dom";
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

export default addRouterApi;
