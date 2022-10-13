import React, {
  Component,
  Children,
  createContext
  // createElement
} from "react";
import invariant from "tiny-invariant";
import { matchPath } from "./matchPath";
import { __RouterContext as RouterContext } from "./Router";
import PropTypes from "prop-types";
var createNamedContext = function createNamedContext(name) {
  var context = createContext();
  context.displayName = name;
  return context;
};

const MatchContext = createNamedContext("Router-Match");

const isValidElement = (object) => {
  return typeof object === "object" && object !== null && object.$$typeof;
};

const NullComponent = () => {
  return <div> </div>;
};
class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AsynComponent: NullComponent,
      locationKey: "",
      match: null,
      isSync: true
    };
  }
  componentDidMount() {
    let { loading: Loading } = this.context;
    if (Loading) {
      this.setState({
        AsynComponent: Loading
      });
    }
  }

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
      /* eslint-disable   */
      // component = await new Promise(async (relove, reject) => {
      //   setTimeout(async () => {
      //     let data = await component;
      //     relove(data);
      //   }, 2000);
      // });
      /* eslint-enable   */
      component = await component;
      component = this.resolveComponent(component, callback);
    } else {
      component = this.getSyncComponent(component, callback);
    }
    return component;
  };

  getComponent = () => {
    const { AsynComponent, locationKey, match } = this.state;
    let { children } = this.props;
    let { history = {}, location = {} } = this.context;
    let { key } = location;

    if (!Object.keys(this.context).length) {
      throw new Error(
        invariant(false, "You should not use <Switch/> outside a <Router>")
      );
    }

    if (key === locationKey) {
      return (
        <MatchContext.Provider
          value={{
            history,
            location,
            match
          }}>
          <AsynComponent
            match={match}
            history={history}
            location={location}
            exact={match.isExact}
          />
        </MatchContext.Provider>
      );
    }

    var newMatch = null;
    let SyncComponent = null;
    Children.forEach(children, (el) => {
      if (newMatch === null) {
        let {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
          component,
          element,
          render
        } = el.props;
        let path = pathProp || from;
        component = component || element || render;
        newMatch = matchPath(location.pathname, {
          path: path,
          exact: exact,
          strict: strict,
          sensitive: sensitive
        });
        if (newMatch) {
          SyncComponent = this.getSyncComponent(component, (AsynComponent) => {
            this.setState({
              isSync: false,
              AsynComponent,
              match: newMatch,
              locationKey: key
            });
          });
          if (SyncComponent) {
            this.setState({
              isSync: true,
              AsynComponent: SyncComponent,
              match: newMatch,
              locationKey: key
            });
          }
        }
      }
    });
    return SyncComponent ? (
      <MatchContext.Provider
        value={{
          history,
          location,
          match: newMatch
        }}>
        <SyncComponent
          match={newMatch}
          history={history}
          location={location}
          exact={newMatch?.isExact}
        />
      </MatchContext.Provider>
    ) : (
      <MatchContext.Provider
        value={{
          history,
          location,
          match: newMatch
        }}>
        <AsynComponent
          match={newMatch}
          history={history}
          location={location}
          exact={newMatch?.isExact}
        />
      </MatchContext.Provider>
    );
  };

  render() {
    return this.getComponent();
  }
}

Switch.contextType = RouterContext;
Switch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { Switch, MatchContext };
