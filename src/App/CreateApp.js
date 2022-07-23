import React, { Component } from 'react';
import Loadable, { Capture } from 'react-loadable';
import App from './App.js';

const CreateApp = (props = {}) => {
    const { modules = [] } = props;
    console.log('CreateApp============');

    // if (process.env.target === 'ssr') {
    //     return (
    //         <Capture report={(moduleName) => modules.push(moduleName)}>
    //             <App {...props} />
    //         </Capture>
    //     );
    // } else {
        return <App {...props} />;
    // }
};

export default CreateApp;
