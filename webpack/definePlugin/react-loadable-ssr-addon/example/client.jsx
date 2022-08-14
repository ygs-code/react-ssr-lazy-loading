import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from  'react-loadable';   //"client/component/Loadable";
import App from './components/App';

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<App />, document.getElementById('app'));
  });
};
