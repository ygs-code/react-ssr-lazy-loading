import React, {useEffect} from 'react';
import Nav from '@/component/Nav';
import {mapRedux} from '@/redux';
const Index = (props) => {
    useEffect(() => {
        console.log('props==llyygkjhg  hkjkk = hkhkjh====', props);
    }, []);

    return (
        <div>
            <Nav {...props} />
            <div>当前页面是user页面</div>
        </div>
    );
};

export default mapRedux()(Index);
