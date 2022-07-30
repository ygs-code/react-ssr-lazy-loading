import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import Routers from '@/router';
import './App.less';
import '@/assets/css/base.less';
import 'bootstrap/dist/css/bootstrap.css';  
const App = (props) => {
    const {history, location, store} = props;

    return (
        <Provider store={store}>
            <Routers history={history} location={location} />
        </Provider>
    );
};
// App.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default App;
