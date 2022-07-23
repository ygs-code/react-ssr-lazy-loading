import React, { Suspense, lazy, Children } from 'react';
import {
    withRouter,
    Router,
    Router as BrowserRouter,
    Switch,
    Switch as Routes,
    Route,
    Navigate, // 重定向
    useNavigate,
    MemoryRouter,
} from 'react-router-dom';
// import { StaticRouter } from 'react-router-dom/server';
import routesConfig from './routesComponent';

// <Router history={history}>
// <Suspense fallback={<div>Loading...</div>}>
//     <Switch>
//         {routesConfig.map((route) => (
//             <Route
//                 key={route.path}
//                 exact={route.exact}
//                 path={route.path}
//                 component={route.component}
//                 thunk={route.thunk}
//             />
//         ))}
//     </Switch>
// </Suspense>
// </Router>

// const Router = (props) => {
//     const { children, history, context, location } = props;
//     console.log('process.env.target=', process.env.target);
//     return process.env.target === 'ssr' ? (
//         // <StaticRouter history={history} context={context} location={location}>
//         <MemoryRouter history={history} context={context} location={location}>
//             {children}
//         </MemoryRouter>
//     ) : (
//         // </StaticRouter>
//         <BrowserRouter history={history}>{children}</BrowserRouter>
//     );

//     // return (
//     //     <BrowserRouter history={history}>
//     //         {Children.map(children, (child) => {
//     //             return <>{child}</>;
//     //         })}
//     //     </BrowserRouter>
//     // );
// };

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
                            // component={Component}
                            render={(props) => {
                                return <Component {...props} />;
                            }}
                            // loader={async () => {
                            //     console.log('loader================loader');
                            // }}
                        />
                    );
                })}
                <Route
                    path="*"
                    element={
                        <div style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
};

export default Routers;
