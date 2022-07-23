import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    memo,
    useEffect,
} from 'react';

import {
    useParams,
    useNavigate,
    useLocation,
    Link,
    Route,
    Routes,
} from 'react-router-dom';
// import { getHistory, history, listen } from '@/router/history';
import './index.css';

// 权限跳转登录页面可以在这控制
const Index = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        //
        console.log('发送请求ajax');
        setTimeout(() => {
            setData([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            console.log('请求成功');
        }, 10000);
    }, []);

    return (
        <div>
            <ul>
                {data.map((item, index) => {
                    return <li key={index}>{item}</li>;
                })}
            </ul>
            <div>当前页面是Home页面 123213</div>
            <div className="home">
                <Link to={`/user/123`}>跳转到用户页面</Link>
            </div>

            <div onClick={() => {}}>跳转到DiscountCoupon页面</div>
        </div>
    );
};

export default Index;
//  mapRedux()

// (Index);
