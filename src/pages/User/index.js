import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    useEffect,
    memo,
} from 'react';

import {
    useSearchParams,
    useParams,
    useNavigate,
    useLocation,
    Link,
} from 'react-router-dom';

// 2234;
// 权限跳转登录页面可以在这控制
const Index = (props) => {
    
    console.log('props=', props);

    return (
        <div>
            <div>当前页面是user页面</div>
            <div className="home">
                <Link to={`/`}>跳转到首页</Link>
            </div>

            <div
                onClick={() => {
                   
                }}
            >
                跳转到DiscountCoupon页面
            </div>
        </div>
    );
};

export default Index;
