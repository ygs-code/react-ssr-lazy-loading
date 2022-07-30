import React, {useEffect, useCallback} from 'react';
import routesComponent from '@/router/routesComponent';
import routesConfig from '@/router/routesConfig';
import {matchPath} from 'react-router-dom';
import {mapRedux} from '@/redux';
import {findTreeData} from '@/utils';
// import './index.less';

// 注入initState
const InitState = (props) => {
    const {
        children = () => {},
        history: {location: {pathname} = {}} = {},
        state = {},
        dispatch,
    } = props;
    const {baseInitState = {}} = state;

    const getMatch = useCallback((routesArray, url) => {
        for (let router of routesArray) {
            let $router = matchPath(url, {
                path: router.path,
                exact: router.exact,
            });

            if ($router) {
                return {
                    ...router,
                    ...$router,
                };
            }
        }
    }, []);

    // 获取组件初始化数据
    const findInitData = useCallback((routesConfig, value, key) => {
        return (findTreeData(routesConfig, value, key) || {}).initState;
    }, []);

    // 这种方式需要前后命名一致才行能做到这样效果
    const getBaseInitState = useCallback(async () => {
        let dispatchBaseInitState = dispatch.baseInitState;
        // 函数命名必须是这样
        var reg = /(?<=^get)(.+?)(?=Async$)/g;
        // let reg1 = /Async$/g;
        for (let key in dispatchBaseInitState) {
            let dataKey = key.match(reg);
            if (dataKey) {
                dataKey =
                    dataKey[0].substr(0, 1).toLocaleLowerCase() +
                    dataKey[0].substr(1);
                if (baseInitState[dataKey]) {
                    return false;
                }
                dispatchBaseInitState.getMenuAsync();
            }
        }
    }, []);

    const getInitState = useCallback(async () => {
        let {name} = getMatch(routesComponent, pathname);
        if (
            state[name]?.initState &&
            state[name]?.initState instanceof Object &&
            Object.keys(state[name]?.initState).length
        ) {
            return false;
        }
        let initStateFn = findInitData(routesConfig, name, 'name');
        if (initStateFn && initStateFn instanceof Function) {
            let data = await initStateFn();
            dispatch[name].setInitState({
                initState: data,
            });
        }
    }, []);

    useEffect(() => {
        getBaseInitState();
        getInitState();
    }, []);
    return <> {children(props)}</>;
};

export default mapRedux()(InitState);
