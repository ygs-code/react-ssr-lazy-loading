import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { store } from '@/index';
import Routers from '@/router';
import './App.less';
import '@/assets/css/base.less';
import 'bootstrap/dist/css/bootstrap.css';
const App = (props) => {
    const { history, context, location, store } = props;
    return (
        <Provider store={store}>
            <Routers history={history} context={context} location={location} />
        </Provider>
    );
};

export default App;
