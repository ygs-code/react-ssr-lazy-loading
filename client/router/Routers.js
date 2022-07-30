import React, {Suspense, lazy, Children} from 'react';
import {
    Router,
    Router as BrowserRouter,
    Switch as Routes,
    Route,
} from 'react-router-dom';
import InitState from '@/component/InitState';

import routesConfig from './routesComponent';
import PropTypes from 'prop-types';
const Routers = (props) => {
    const {history, context} = props;
    return (
        <Router history={history} context={context}>
            <Routes>
                {routesConfig.map((route) => {
                    const {path, exact, Component} = route;
                    return (
                        <Route
                            key={path}
                            exact={exact}
                            path={path}
                            // component={Component}
                            render={(props) => {
                                return (
                                    <InitState {...props}>
                                        {(props) => {
                                            return <Component {...props} />;
                                        }}
                                    </InitState>
                                );
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
                        <div style={{padding: '1rem'}}>
                            <p>{'There s nothing here!'}</p>
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
    context: PropTypes.object,
};
export default Routers;
