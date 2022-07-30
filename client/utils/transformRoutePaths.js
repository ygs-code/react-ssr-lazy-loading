const removeRepeatLine = (str) => str.replace(/\/\//g, '/');
export const getRoutePaths = (
    route,
    routePaths = {},
    prefix = '',
    filePath = null
) => {
    route.forEach((target) => {
        if (target['path'] && target['name']) {
            if (
                target['name'] in routePaths &&
                routePaths.hasOwnProperty(target['name'])
            ) {
                throw (target['filePath'] || filePath) ===
                    routePaths[target['name']].filePath
                    ? `在${
                          routePaths[target['name']].filePath
                      }路由文件中,路由name为:${
                          target['name']
                      }命名有相同，发生路由name冲突！`
                    : `在${target['filePath'] || filePath}路由文件与${
                          routePaths[target['name']].filePath
                      }路由文件中,路由name为:${
                          target['name']
                      }命名有相同，发生路由name冲突！`;
            }
            routePaths[target['name']] = {
                filePath: target.filePath || filePath,
                path: removeRepeatLine(prefix + '/' + target['path']),
            };
        }
        if (target.children && target.children.length >= 1) {
            routePaths = {
                ...routePaths,
                ...getRoutePaths(
                    target.children,
                    routePaths,
                    prefix + '/' + target['path'],
                    target.filePath || filePath
                ),
            };
        }
    });
    return routePaths;
};

export const transformRoutePaths = (routePaths) => {
    let newRoutePaths = {};
    for (let key in routePaths) {
        if (routePaths.hasOwnProperty(key)) {
            newRoutePaths[key] = routePaths[key].path;
        }
    }
    return newRoutePaths;
};
