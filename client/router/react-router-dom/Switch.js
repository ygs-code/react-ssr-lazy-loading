import React, {
  Component,
  Children,
  // isValidElement,
  cloneElement,
  createElement
} from "react";
import { matchPath } from "react-router-dom";

const isValidElement = (object) => {
  return typeof object === "object" && object !== null && object.$$typeof;
};

const Loading = () => {
  return <div>Loading</div>;
};
class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AsynComponent: Loading,
      pathname: null,
      match: null,
      isSync: true
    };
    // this.getRoute(this.props);
  }

  componentDidMount = () => {
    this.getRoute(this.props);
  };

  validComponent = async (component) => {
    if (isValidElement(component)) {
      return component;
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      component = await component;
      component = this.validComponent(component);
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Function"
    ) {
      component = component(this.props);
      component = this.validComponent(component);
    }
    return component;
  };
  getRoute = (props) => {
    var route = this?.context?.router?.route || {};
    var children = props.children;
    var location = props.history.location || route.location;
    var match = null;
    let currentComponent = null;
    Children.forEach(children, async (element) => {
      if (match === null && isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
          AsynComponent
        } = element.props;
        var path = pathProp || from;
        match = matchPath(
          location.pathname,
          { path: path, exact: exact, strict: strict, sensitive: sensitive },
          route.match
        );

        if (match) {
          currentComponent = await this.validComponent(AsynComponent);
          this.setState(
            {
              AsynComponent: currentComponent,
              match,
              pathname: props.history.location.pathname
            },
            () => {
              // this.forceUpdate();
              // debugger;
            }
          );
        }
      }
    });
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { pathname } = nextState;
  //   if (pathname !== nextProps.history.location.pathname) {
  //     this.getRoute(nextProps);
  //   }
  //   return true;
  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pathname } = prevState;
    if (pathname !== this.props.history.location.pathname) {
      this.getRoute(this.props);
    }
  }
  getSyncComponent = () => {
    var route = this?.context?.router?.route || {};
    var children = this.props.children;
    var location = this.props.history.location || route.location;
    var match = null;
    let CurrentComponent = null;
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
        console.log("match=====", match);
        console.log("element.props=====", element.props);

        if (match) {
          if (this.state.isSync) {
            if (SyncComponent) {
              CurrentComponent = SyncComponent;
            } else {
              this.setState({
                isSync: false
              });
              // this.getRoute(this.props);
            }
          }
        }
      }
    });
    console.log("CurrentComponent=======", CurrentComponent);
    return CurrentComponent ? (
      <CurrentComponent> </CurrentComponent>
    ) : (
      <Loading />
    );
  };

  render() {
    const { AsynComponent, match, isSync } = this.state;
    // console.log("AsynComponent=====", AsynComponent);
    // console.log("this.getSyncComponent()===", this.getSyncComponent());
    return isSync ? this.getSyncComponent() : <AsynComponent />;
  }
}

export { Switch };
