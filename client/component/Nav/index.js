import React, { Component, useMemo } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapRedux } from '@/redux';
import './index.less';

const Index = (props) => {
    const {
        history: { push } = {},
        dispatch: { baseInitState: { setInitState, setMenuActive } = {} } = {},
        state: { baseInitState: { menu = [], menuActive } = {} } = {},
        location: { pathname } = {},
    } = props;
   
    return (
        <div className="navigate-box center-box">
            <Nav fill pills className="navigate">
                {[
                    {
                        title: '首页',
                        path: '/',
                    },
                    {
                        title: '用户页面',
                        path: '/user',
                    },
                    {
                        title: '优惠券',
                        path: '/marketing/discount-coupon',
                    },
                ].map((item, key) => {
                    const { path, title } = item;
                    return (
                        <NavItem key={key}>
                            <NavLink
                                active={pathname == path}
                                onClick={() => {
                                    setMenuActive({
                                        menuActive: path,
                                    });
                                    push(path);
                                }}
                            >
                                {title}
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>
        </div>
    );
};
Index.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    state: PropTypes.object,
};
export default mapRedux()(withRouter(Index));
