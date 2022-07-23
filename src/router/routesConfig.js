import { dispatch, getState } from '@rematch/core';
import axios from 'axios';

// 路由配置
export default [
    {
        path: '/',
        exact: true,
        name: 'home',
        //   Component: <HomeRouterAddApi />,
        entry: `/pages/Home/index.js`,
        initState: async () => {
            return await axios
                .get('https://api.apiopen.top/api/getImages?page=0&size=10')
                .then((res) => {
                    const { code, data: { result = {} } = {} } = res;
                    return  result
                })
                .catch((err) => {
                    console.log('Error: ', err.message);
                });
        },
    },
    {
        path: '/user',
        name: 'user',
        entry: `/pages/User/index.js`,
        // children: [
        //     // {
        //     //     path: '/:id',
        //     //     name: 'userDetails',
        //     //     // Component: <UserRouterAddApi />,
        //     //     entry: `/pages/User/index.js`,
        //     //     children: [],
        //     // },
        // ],
        // thunk: ()=>{},
    },
];
