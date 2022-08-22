/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:13:35
 * @FilePath: /react-ssr-lazy-loading/client/router/Routers.js
 * @Description:
 */
import React from "react";
import PropTypes from "prop-types";
// import loadable from "client/component/Loadable";
import Loading from "client/component/Loading";
// import lazy from "client/component/lazy";
import { Router, Switch as Routes, Route } from "./react-router-dom";
// import { matchPath } from "react-router-dom";
// import initState, { InitState } from "client/redux/initComponentState";
// import addRouterApi, { AddRouterApi } from "./addRouterApi";

const Routers = (props) => {
  const { history, routesComponent = [] } = props;
  return (
    <Router history={history}>
      <Routes {...props} loading={Loading}>
        {routesComponent.map((route) => {
          let { path, exact, Component } = route;

          return (
            <Route
              key={path}
              exact={exact}
              path={path}
              // component={Component}
              component={() => {
                return Component;
              }}
              // component={
              //   (props) => {
              //     const { match: { url } = {} } = props;
              //     let isMatchRoute = getMatch(routesComponent, url);
              //     isMatchRoute.Component.SyncComponent().then((c) => {
              //       NextComponentRef.current = c.default;
              //     });
              //     return (
              //       <InitState {...props}>
              //         {(props) => {
              //           return (
              //             <AddRouterApi {...props}>
              //               {(props) => {
              //                 return AsynComponent ? (
              //                   <AsynComponent
              //                     {...props}
              //                     NextComponent={NextComponentRef.current}
              //                   />
              //                 ) : (
              //                   <SyncComponent
              //                     {...props}
              //                     NextComponent={NextComponentRef.current}
              //                   />
              //                 );
              //               }}
              //             </AddRouterApi>
              //           );
              //         }}
              //       </InitState>
              //     );
              //   }
              //   // initState(addRouterApi(Component))
              // }
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
              <p>There s nothing here!</p>
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
