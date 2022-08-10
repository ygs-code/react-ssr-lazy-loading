/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-05 12:04:29
 * @FilePath: /react-loading-ssr/client/component/Nav/index.js
 * @Description: 
 */
import React, {Component, useMemo, useState} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {mapRedux} from '@/redux';
import addRouterApi from '@/router/addRouterApi';
import './index.less';

const Index = (props) => {
    const {
        history: {push} = {},
        dispatch: {baseInitState: {setInitState, setMenuActive} = {}} = {},
        state: {baseInitState: {menu = [], menuActive} = {}} = {},
        location: {pathname} = {},
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
                    const {path, title, name} = item;
                    return (
                        <NavItem key={index}>
                            <NavLink
                                active={pathname == path}
                                onClick={() => {
                                    setMenuActive({
                                        menuActive: path,
                                    });
                                    if (index == 1) {
                                        pushRoute({path});
                                    } else {
                                        pushRoute({name});
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
