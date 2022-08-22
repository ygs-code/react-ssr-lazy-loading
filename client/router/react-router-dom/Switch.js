import React, { Component, Children } from "react";
import { matchPath } from "react-router-dom";

const isValidElement = (object) => {
  return typeof object === "object" && object !== null && object.$$typeof;
};

const NullLoading = () => {
  return <div></div>;
};
class Switch extends Component {
  constructor(props) {
    super(props);
    const { loading: Loading, history: { location: { pathname } = {} } = {} } =
      this.props;
    this.state = {
      AsynComponent: NullLoading || Loading,
      pathname,
      match: null,
      isSync: true
    };
  }

  componentDidMount = () => {};

  getSyncComponent = (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) === "object Object"
    ) {
      if (isValidElement(component)) {
        return component;
      } else if (component.__esModule) {
        component = this.getSyncComponent(component.default, callback);
      }
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Function"
    ) {
      component = component(this.props);
      component = this.getSyncComponent(component, callback);
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      this.resolveComponent(component, callback).then((AsynComponent) => {
        callback(AsynComponent);
      });
      return null;
    }
    return component;
  };

  resolveComponent = async (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      component = await component;
      component = this.resolveComponent(component, callback);
    } else {
      component = this.getSyncComponent(component, callback);
    }
    return component;
  };

  componentDidUpdate(prevProps, prevState) {
    const { pathname } = prevState;
    const { history: { location: { pathname: propsPathname } = {} } = {} } =
      this.props;
    if (pathname !== propsPathname) {
      this.setState({
        pathname: propsPathname
      });
      this.getComponent();
    }
  }
  getComponent = () => {
    const { AsynComponent } = this.state;
    let { children, history = {} } = this.props;
    let { location } = history;
    const { router: { route: { location: routeLocation } = {} } = {} } =
      this.context || {};
    location = location || routeLocation;
    var match = null;
    let SyncComponent = null;
    Children.forEach(children, (element) => {
      if (match === null && isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
          component
        } = element.props;
        var path = pathProp || from;
        match = matchPath(location.pathname, {
          path: path,
          exact: exact,
          strict: strict,
          sensitive: sensitive
        });

        if (match) {
          SyncComponent = this.getSyncComponent(component, (AsynComponent) => {
            this.setState({
              isSync: false,
              AsynComponent
            });
          });
          if (SyncComponent) {
            this.setState({
              AsynComponent: SyncComponent
            });
          }
        }
      }
    });
    return SyncComponent ? (
      <SyncComponent match={match} history={history} location={location} />
    ) : (
      <AsynComponent match={match} history={history} location={location} />
    );
  };

  render() {
    const { AsynComponent, isSync } = this.state;
    return isSync ? this.getComponent() : <AsynComponent />;
  }
}

export { Switch };
