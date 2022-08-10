import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    memo,
    useEffect,
    useRef,
    useLayoutEffect,
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
import _ from 'lodash';
import {getStyle} from '@/utils';
import './index.less';

// 权限跳转登录页面可以在这控制
const Index = (props) => {
    const [lazyLoadingList, setLazyLoadingList] = useState([]);
    let [data, setData] = useState([[], [], []]);
    const refs = [useRef(null), useRef(null), useRef(null)];

    const {list = [], callback = () => {}} = props;

    const addData = useCallback(
        (item) => {
            const {id} = item;
            let flag = data
                .map((item) => {
                    return item.some(($item) => {
                        return $item.id === id;
                    });
                })
                .some((item) => item);
            if (flag) {
                return;
            }
            const minLiIndex = getMinLiIndex();
            data[minLiIndex].push(item);
            setData([...data]);
        },
        [data]
    );

    useEffect(() => {
        if (lazyLoadingList.length) {
            let item = lazyLoadingList[0];
            const {url} = item;
            const Img = new Image();
            Img.src = url;
            Img.onerror = (error) => {
                addData(item);
                lazyLoadingList.shift();
                setLazyLoadingList([...lazyLoadingList]);
            };
            Img.onload = () => {
                addData(item);
                lazyLoadingList.shift();
                setLazyLoadingList([...lazyLoadingList]);
            };
        }
    }, [lazyLoadingList.length, list.length]);

    useEffect(() => {
        setLazyLoadingList(_.cloneDeep(list));
    }, [list.length]);

    const getMinLiIndex = useCallback(() => {
        let heights = refs.map((item) => {
            return parseInt(getStyle(item.current, 'height'));
        });

        const minHeight = Math.min(...heights);
        return heights.indexOf(minHeight);
    }, [refs]);

    const getImages = useCallback(() => {
        scrollBottom(30, (data) => {
            if (lazyLoadingList.length) {
                return false;
            }
            callback(data);
        });
    });

    const scrollBottom = useCallback((distance = 30, callback = () => {}) => {
        var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight + distance >= scrollHeight) {
            callback({
                scrollTop,
                windowHeight,
                scrollHeight,
            });
        }
    });

    useEffect(() => {
        window.addEventListener('scroll', getImages);
        return () => {
            window.removeEventListener('scroll', getImages);
        };
    });

    return (
        <div className="lazy-loading-img">
            <ul className="card-group-box">
                {data.map((item, index) => {
                    return (
                        <li ref={refs[index]} key={index}>
                            {item.map(($item, $index) => {
                                const {id, title, type, url, scenery} = $item;
                                return (
                                    <Card key={id} className="card-box">
                                        <CardImg
                                            alt={title}
                                            src={url}
                                            top
                                            width="100%"
                                        />
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                {scenery}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            ></CardSubtitle>
                                            <CardText>{title}</CardText>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </li>
                    );
                })}
            </ul>
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
