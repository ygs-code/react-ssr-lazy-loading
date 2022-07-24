import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    memo,
    useEffect,
} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {mapRedux} from '@/redux';

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

// 权限跳转登录页面可以在这控制
const Index = (props) => {
    const [data, setData] = useState([]);

    const {
        dispatch: {home: {setCount = () => {}} = {}} = {},
        state: {home: {count, initState: {list = []} = {}} = {}} = {},
    } = props;

    useEffect(() => {
        console.log(
            'window.__INITIAL_STATE__=',
            window && window.__INITIAL_STATE__
        );

        console.log('store======', window.store);
        console.log('props   fhjgf==', props);
        console.log('list======', list);

        // setTimeout(() => {
        //     setData([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        //     console.log('请求成功');
        // }, 10000);
    }, []);

    return (
        <div className="home">
            <Nav {...props} />
            {/*
            <div className="home">
                <Link to={`/user/123`}>跳转到用户页面</Link>
            </div>
            <div>
                <Button
                    onClick={() => {
                        setCount(count + 1);
                    }}
                >
                    点击count++
                </Button>
                count : {count}
            </div>
        */}
            <CardGroup className="card-group-box">
                {list.map((item, index) => {
                    const {id, title, type, url, scenery} = item;
                    return (
                        <Card key={id} className="card-box">
                            <CardImg alt={title} src={url} top width="100%" />
                            <CardBody>
                                <CardTitle tag="h5">{scenery}</CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                ></CardSubtitle>
                                <CardText>{title}</CardText>
                            </CardBody>
                        </Card>
                    );
                })}
            </CardGroup>
            {/*
        <div onClick={() => {}}>跳转到DiscountCoupon页面</div>
        */}
        </div>
    );
};

Index.propTypes = {
    location: PropTypes.object,
    store: PropTypes.object,
    context: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.object,
    state: PropTypes.object,
};

export default mapRedux()(Index);
