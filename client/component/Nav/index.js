import React, { Component, useMemo, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapRedux } from '@/redux';
import addRouterApi from '@/router/addRouterApi';
// import './index.less';

const Index = (props) => {
    const {
        history: { push } = {},
        dispatch: { baseInitState: { setInitState, setMenuActive } = {} } = {},
        state: { baseInitState: { menu = [], menuActive } = {} } = {},
        location: { pathname } = {},
        pushRoute,
    } = props;

    return (
        <div className="navigate-box center-box">
            <Nav fill pills className="navigate">
                {[
                    {
                        title: '首页',
                        path: '/',
                        name: 'home',
                    },
                    {
                        title: '用户页面',
                        path: '/user',
                        name: 'user',
                    },
                    {
                        title: '优惠券',
                        path: '/marketing/discount-coupon',
                        name: 'DiscountCoupon',
                    },
                ].map((item, index) => {
                    const { path, title, name } = item;
                    return (
                        <NavItem key={index}>
                            <NavLink
                                active={pathname == path}
                                onClick={() => {
                                    setMenuActive({
                                        menuActive: path,
                                    });
                                    if (index == 1) {
                                        pushRoute({ path });
                                    } else {
                                        pushRoute({ name });
                                    }
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
export default mapRedux()(addRouterApi(Index));
