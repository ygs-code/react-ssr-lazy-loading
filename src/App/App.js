import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux';
import Routers from '@/router';

const App = (props) => {
    const { history, context ,location} = props;
    // console.log('App===========');
    // console.log('store===========', store);
    return (
        <Provider store={store}>
            <Routers history={history} context={context} location={location} />
        </Provider>
    );
};

export default App;
