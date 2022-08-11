/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 13:40:23
 * @FilePath: /react-loading-ssr/client/pages/Home/index.js
 * @Description:
 */
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { mapRedux } from "@/redux";
import Nav from "@/component/Nav";
import Head from "@/component/Head";
import LazyLoadingImg from "@/component/LazyLoadingImg";
import { routesConfigs } from "@/router/routesComponent";
import { findTreeData } from "@/utils";
import "./index.less";
// 权限跳转登录页面可以在这控制
function Index(props) {
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    dispatch: { home: { setInitState = () => {} } = {} } = {},
    state: { home: { count, initState: { list = [] } = {} } = {} } = {}
  } = props;

  useEffect(() => {
    console.log(
      "window.__INITIAL_STATE__=",
      window && window.__INITIAL_STATE__
    );
  }, []);

  // 获取组件初始化数据
  const findInitData = useCallback(
    (routesConfigs, value, key) =>
      (findTreeData(routesConfigs, value, key) || {}).initState,
    []
  );

  const getImages = useCallback(async () => {
    if (loading) {
      return false;
    }
    setLoading(true);
    page += 1;
    const initStateFn = findInitData(routesConfigs, "home", "name");
    setPage(page);
    const {
      data: { result: data }
    } = await axios(
      `https://api.apiopen.top/api/getHaoKanVideo?page=${page}&size=10`
    );
    console.log("data=====", data);
    // let data = await initStateFn({
    //     page,
    //     size: 10,
    // });
    const { total, list: resList = [] } = data;
    setInitState({
      initState: {
        total,
        list: list.concat(
          resList.map((item) => ({
            ...item,
            url: item.userPic
          }))
        )
      }
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
}

Index.propTypes = {
  location: PropTypes.object,
  store: PropTypes.object,
  context: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  state: PropTypes.object
};

export default mapRedux()(Index);
