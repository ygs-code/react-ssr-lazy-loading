import React, { useEffect } from 'react';
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

export default (props) => {
    const { Component } = props;

    return <Component {...api} />;
};
