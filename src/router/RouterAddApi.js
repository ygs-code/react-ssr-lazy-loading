import React, {useEffect} from 'react';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Navigate, // 重定向
    useSearchParams,
    useNavigate,
    useLocation,
    useParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const RouterAddApi = (props) => {
    const {Component} = props;

    return <Component />;
};

RouterAddApi.propTypes = {
    Component: PropTypes.element,
};

export default RouterAddApi;
