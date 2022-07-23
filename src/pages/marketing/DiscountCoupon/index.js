import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    useEffect,
    memo,
} from 'react';
import Nav from '@/component/Nav';
import { Link } from 'react-router-dom';
import { mapRedux } from '@/redux';

// 2234;
// 权限跳转登录页面可以在这控制
const Index = (props) => {
    return (
        <div>
            <Nav {...props} />
            <div>当前页面是DiscountCoupon页面</div>
        </div>
    );
};

export default mapRedux()(Index);
