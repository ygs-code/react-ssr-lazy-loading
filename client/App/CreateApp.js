import React, { Component } from 'react';
import Loadable, { Capture } from 'react-loadable';
import PropTypes from 'prop-types';
import { getEv } from '@/utils';
import App from './App.js';
// import './App.less';

let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
    COMPILER_ENV,
} = getEv(); // 环境参数



const CreateApp = (props = {}) => {
    const { modules = [] } = props;

    return target === 'ssr' ? (
        <Capture
            report={(moduleName) => {
                return modules.push(moduleName);
            }}
        >
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
