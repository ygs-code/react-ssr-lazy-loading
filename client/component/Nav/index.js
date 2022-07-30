import React, {Component, useMemo} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// import './index.less';

const Navigation = (props) => {

    const {
        history: {push} = {},
        dispatch: {baseInitState: {setInitState, setMenuActive} = {}} = {},
        state: {baseInitState: {menu = [], menuActive} = {}} = {},
    } = props;
    // const menu = useMemo(() => {}, []);
    return (
        <div className="navigate-box center-box">
            <Nav fill pills className="navigate">
                <NavItem>
                    <NavLink
                        active
                        onClick={() => {
                            setMenuActive('/');
                            push('/');
                        }}
                    >
                        首页 
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => {
                            setMenuActive('/user');
                            push('/user');
                        }}
                    >
                        用户页面
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => {
                            setMenuActive('/marketing/discount-coupon');
                            push('/marketing/discount-coupon');
                        }}
                    >
                        优惠券
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
};
Navigation.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    state: PropTypes.object,
};
export default Navigation;
