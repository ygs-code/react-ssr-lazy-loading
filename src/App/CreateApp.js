import React, {Component} from 'react';
import Loadable, {Capture} from 'react-loadable';
import PropTypes from 'prop-types';
import App from './App.js';
import './App.less';

const CreateApp = (props = {}) => {
    const {modules = []} = props;

    return process.env.target === 'ssr' ? (
        <Capture report={(moduleName) => modules.push(moduleName)}>
            <App {...props} />
        </Capture>
    ) : (
        <App {...props} />
    );
};

CreateApp.propTypes = {
    modules: PropTypes.object,
};
export default CreateApp;
