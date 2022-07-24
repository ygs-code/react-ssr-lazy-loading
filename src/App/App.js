import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import Routers from '@/router';
import './App.less';
import '@/assets/css/base.less';
import 'bootstrap/dist/css/bootstrap.css';
const App = (props) => {
    const {history, context, location, store} = props;

    return (
        <Provider store={store}>
            <Routers history={history} context={context} location={location} />
        </Provider>
    );
};
App.propTypes = {
    location: PropTypes.object,
    store: PropTypes.object,
    context: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.object,
    state: PropTypes.object,
};

export default App;
