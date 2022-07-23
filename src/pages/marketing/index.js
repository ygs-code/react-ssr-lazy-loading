import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    useEffect,
    memo
  } from 'react';
  
  
  import {
    useSearchParams,
    useParams,
    useNavigate,
    useLocation
  } from 'react-router-dom';
  
  
  // 2234;
  // 权限跳转登录页面可以在这控制
  const Index = (props) => {
    let params2 = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    let [params] = useSearchParams();
    let navigate = useNavigate();
    let location = useLocation();
   
    
    console.log('params2=',params2)
    console.log('params=',params)
    console.log('location=',location)
    console.log('props=',props)
  
  
    // 阿斯顿发
    return <div className="user">营销菜单页面</div>;
  };
  
  export default Index;
  