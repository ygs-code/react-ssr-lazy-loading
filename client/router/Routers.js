import React, { Suspense, lazy, Children } from "react";
import { Router, Switch as Routes, Route } from "./react-router-dom";

import initComponentState from "@/redux/initComponentState";
import addRouterApi from "./addRouterApi";
import routesConfig from "./routesComponent";
import PropTypes from "prop-types";
const Routers = (props) => {
  const { history, context } = props;
  return (
    <Router history={history} context={context}>
      <Routes>
        {routesConfig.map((route) => {
          const { path, exact, Component } = route;
          return (
            <Route
              key={path}
              exact={exact}
              path={path}
              component={initComponentState(addRouterApi(Component))}
              // render={(props) => {
              //     return (
              //         <InitState {...props}>
              //             {(props) => {
              //                 // const AddRouterApi =
              //                 //     addRouterApi(Component);
              //                 return <Component {...props} />;
              //             }}
              //         </InitState>
              //     );
              // }}
              // loader={async () => {
              //     console.log('loader================loader');
              // }}
            />
          );
        })}
        <Route
          path="*"
          element={
            <div style={{ padding: "1rem" }}>
              <p>{"There s nothing here!"}</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  context: PropTypes.object
};
export default Routers;
