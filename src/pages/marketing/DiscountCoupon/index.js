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
    useLocation,
    Link,
    useNavigate,
} from 'react-router-dom';


 

// 2234;
// 权限跳转登录页面可以在这控制
const Index = (props) => {
   

    return (
        <div>
            <div>当前页面是DiscountCoupon页面</div>
            <div className="home">
                <Link to={`/user/123`}>跳转到用户页面</Link>
            </div>

            <div
                onClick={() => {
                   
                }}
            >
                跳转到Home页面
            </div>
        </div>
    );
};

export default Index;
