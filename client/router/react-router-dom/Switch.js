import React, {
  Component,
  Children,
  isValidElement,
  cloneElement,
  createElement
} from "react";
import { matchPath } from "react-router-dom";
const Loading = () => {
  return <div>Loading</div>;
};
class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: Loading,
      pathname: null,
      match: null
    };
    this.getRoute(this.props);
  }

  componentDidMount = () => {};

  getRoute = (props) => {
    var route = this?.context?.router?.route || {};
    var children = props.children;
    var location = props.history.location || route.location;
    var match = null;
    Children.forEach(children, async (element) => {
      if (match === null && isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
          SyncComponent
        } = element.props;
        var path = pathProp || from;
        match = matchPath(
          location.pathname,
          { path: path, exact: exact, strict: strict, sensitive: sensitive },
          route.match
        );

        if (match) {
          await SyncComponent().then((res) => {
            this.setState({
              Component: res.default,
              match,
              pathname: props.history.location.pathname
            });
          });
        }
      }
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { pathname } = nextState;
    if (pathname !== nextProps.history.location.pathname) {
      this.getRoute(nextProps);
    }
    return true;
  }
  render() {
    const { Component, match } = this.state;
    return (
      <Component
        match={match}
        history={this.props.history}
        location={this.props.history.location}
      />
    );
  }
}

export { Switch };
