import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    memo,
    useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapRedux } from '@/redux';
import {
    Button,
    CardGroup,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
} from 'reactstrap';
import './index.less';
import Nav from '@/component/Nav';
import Head from '@/component/Head';
import LazyLoadingImg from '@/component/LazyLoadingImg';
import routesComponent, { routesConfigs } from '@/router/routesComponent';
import { findTreeData } from '@/utils';
// 权限跳转登录页面可以在这控制
const Index = (props) => {
    let [page, setPage] = useState(1);
    let [loading, setLoading] = useState(false);

    const {
        dispatch: { home: { setInitState = () => {} } = {} } = {},
        state: { home: { count, initState: { list = [] } = {} } = {} } = {},
    } = props;

    useEffect(() => {
        console.log(
            'window.__INITIAL_STATE__=',
            window && window.__INITIAL_STATE__
        );
    }, []);

    // 获取组件初始化数据
    const findInitData = useCallback((routesConfigs, value, key) => {
        return (findTreeData(routesConfigs, value, key) || {}).initState;
    }, []);

    const getImages = useCallback(async () => {
        if (loading) {
            return false;
        }
        setLoading(true);
        page += 1;
        let initStateFn = findInitData(routesConfigs, 'home', 'name');
        setPage(page);
        let data = await initStateFn({
            page,
            size: 10,
        });
        const { total, list: resList = [] } = data;
        setInitState({
            initState: {
                total,
                list: list.concat(resList),
            },
        });
        setLoading(false);
    }, [page, list, loading]);

    return (
        <div className="home">
            <Head />
            <Nav />
            <div className="center-box">
                <LazyLoadingImg
                    list={list}
                    callback={(data) => {
                        getImages();
                    }}
                />
            </div>
        </div>
    );
};

Index.propTypes = {
    location: PropTypes.object,
    store: PropTypes.object,
    context: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func,
    state: PropTypes.object,
};

export default mapRedux()(Index);
