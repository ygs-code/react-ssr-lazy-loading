import React, {
  createContext,
  Component,
  //   createElement,
  Children
} from "react";

var createNamedContext = function createNamedContext(name) {
  var context = createContext();
  context.displayName = name;
  return context;
};

const RouterContext = createNamedContext("Router");

class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location
    };

    this._isMounted = false;
    this._pendingLocation = null;

    if (!props.staticContext) {
      this.unlisten = props.history.listen(({ location }) => {
        this._pendingLocation = location;
      });
    }

    return this;
  }
  componentDidMount() {
    this._isMounted = true;

    if (this.unlisten) {
      this.unlisten();
    }

    if (!this.props.staticContext) {
      this.unlisten = this.props.history.listen(({ location }) => {
        if (this._isMounted) {
          this.setState({
            location: location
          });
        }
      });
    }

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  }
  computeRootMatch = (pathname) => {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };
  render() {
    const { children, staticContext, loading, history } = this.props;
    const { location } = this.state;
    return (
      <RouterContext.Provider
        value={{
          history,
          location,
          staticContext,
          loading
        }}>
        {children ? Children.only(children) : null}
      </RouterContext.Provider>
    );
    /* eslint-disable   */
    // return createElement(context.Provider, {
    //   value: {
    //     history: this.props.history,
    //     location: this.state.location,
    //     staticContext: this.props.staticContext
    //   },
    //   children: this.props.children || null
    // });
    /* eslint-enable   */
  }
}

export { Router, RouterContext as __RouterContext };
