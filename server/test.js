const {
    MemoryRouter,
    Navigate,
    Outlet,
    Route,
    Router,
    Routes,
    createRoutesFromChildren,
    generatePath,
    matchRoutes,
    matchPath,
    createPath,
    parsePath,
    renderMatches,
    resolvePath,
    useHref,
    useInRouterContext,
    useLocation,
    useMatch,
    useNavigate,
    useNavigationType,
    useOutlet,
    useParams,
    useResolvedPath,
    useRoutes,
    useOutletContext,
} = require('react-router-dom');

let routesConfig=[
    {  
     path: '/marketing/DiscountCoupon',
     exact: false,
     name:'DiscountCoupon',
    
   },
    {  
     path: '/marketing',
     exact: true,
     name:'marketing',
    
   },
    {  
     path: '/',
     exact: true,
     name:'hemo',
     
   },
    {  
     path: '/user/:id',
     exact: false,
     name:'userDetails',
   
   },
    {  
     path: '/user',
     exact: false,
     name:'user',
     
   },
]


const getMatch = (routesConfig, url) => {
    // console.log('routesArray=',routesArray)
    return routesConfig.some((router) => {
        console.log('router.path==', router.path, 'url==', url);
        let $router = matchPath(router.path, url);
        console.log('$router=', $router);
        return $router;
    });
};


getMatch(routesConfig,'/user/123')

console.log(matchPath('/user/:id', '/user/123'));
