import { dispatch, getState } from '@rematch/core';

// 路由配置
export default [
    {
        path: '/',
        exact: true,
        name: 'hemo',
        // Component: <HomeRouterAddApi />,
        entry: `/pages/Home/index.js`,
        initState:()=>{
            
        }
         // thunk:homeThu1     nk,
    },
    {
        path: '/user',
        name: 'user',
        entry: `/pages/User/index.js`,
        children: [
            {
                path: '/:id',
                name: 'userDetails',
                // Component: <UserRouterAddApi />,
                entry: `/pages/User/index.js`, 
                children: [],
            },
        ],
        // thunk: ()=>{},
    },
];