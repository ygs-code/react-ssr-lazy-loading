import React, { Component, createElement } from "react";
import invariant from "tiny-invariant";
import hoistStatics from "hoist-non-react-statics";
import { MatchContext } from "./Switch";

export const withRouter = (Target) => {
  const displayName = "withRouter(" + (Target.displayName || Target.name) + ")";
  class WithRouter extends Component {
    render() {
      return createElement(MatchContext.Consumer, null, (context) => {
        !context
          ? invariant(
              false,
              "You should not use <" + displayName + " /> outside a <Switch>"
            )
          : void 0;

        return <Target {...context} {...this.props} />;
      });
    }
  }

  WithRouter.displayName = displayName;
  WithRouter.WrappedComponent = Target;
  return hoistStatics(WithRouter, Target);
};
