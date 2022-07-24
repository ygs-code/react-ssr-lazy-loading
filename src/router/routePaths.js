// import routesConfig from '@/router/routesConfig';
const getRoutePaths = (routesConfig, routePaths = {}, parentPath = '') => {
    return routesConfig.reduce((routePaths, item) => {
        const { children, path, name, entry } = item;
        if (children && children.length) {
            routePaths = {
                ...routePaths,
                ...getRoutePaths(children, routePaths, path),
            };
        }
        if (Object.keys(routePaths).includes(name)) {
            throw `路由name${name}相同，有冲突，请重新命名${name}`;
        }
        return {
            ...routePaths,
            [name]: {
                entry,
                path: parentPath + path,
            },
        };
    }, routePaths);
};

const getRoutePathsArr = (...ags) => {
    let routePaths = {};
    for (let item of ags) {
        routePaths = {
            ...routePaths,
            ...getRoutePaths(item, routePaths),
        };
    }
    return routePaths;
};

// const routePaths = getRoutePathsArr(routesConfig);

// export default routePaths;
export { getRoutePathsArr, getRoutePaths };

// console.log('routePaths=================', routePaths);
