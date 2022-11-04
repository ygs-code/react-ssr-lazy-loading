/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 18:35:56
 * @FilePath: /react-ssr-lazy-loading/client/pages/Home/index.js
 * @Description:
 */
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { mapRedux } from "client/redux";
import Nav from "client/component/Nav";
import Head from "client/component/Head";
import LazyLoadingImg from "client/component/LazyLoadingImg";
import setMetaProps from "client/component/SetMetaProps";
import { getHaoKanVideo } from "client/assets/js/request/requestApi";
import "./index.less";
// 权限跳转登录页面可以在这控制
const Index = (props) => {
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    dispatch: { home: { setImgData = () => {} } = {} } = {},
    state: { home: { imgData: { list = [] } = {} } = {} } = {}
  } = props;

  useEffect(() => {
    if (!list.length) {
      getImages(page - 1);
    }

    // Index.getInitPropsState(props);
  }, []);

  // 获取组件初始化数据
  // const findInitData = useCallback(
  //   (routesConfigs, value, key) =>
  //     (findTreeData(routesConfigs, value, key) || {}).initState,
  //   []
  // );

  const getImages = useCallback(
    async (page) => {
      if (loading) {
        return false;
      }
      setLoading(true);
      /* eslint-disable   */
      page += 1;
      /* eslint-enable   */

      // const initStateFn =findInitData(routesConfigs, "home", "name");
      setPage(page);
      const {
        data: { result: data }
      } = await axios(
        `https://api.apiopen.top/api/getHaoKanVideo?page=${page}&size=10`
      );

      // let $data = await Index.getInitPropsState({
      //   ...props,
      //   match: {
      //     params: { page, size: 10 }
      //   }
      // });

      const { total, list: resList = [] } = data;
      setImgData({
        imgData: {
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
    },
    [page, list, loading]
  );

  return (
    <div className="home">
      <Head />
      <Nav />
      <div className="center-box">
        <LazyLoadingImg
          list={list}
          callback={() => {
            getImages(page);
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
  state: PropTypes.object
};

Index.getInitPropsState = async (props = {}) => {
  const {
    dispatch: { home: { setImgData } = {} } = {},
    state: { home: { imgData: { list = [] } = {} } = {} } = {},
    match: { params: { page = 1, size = 10 } = {} } = {}
  } = props;

  await Head.getInitPropsState(props);
  await Nav.getInitPropsState(props);

  let data = await getHaoKanVideo({
    page,
    size
  })
    .then((res) => {
      const { result: { list = [], total } = {} } = res;
      return {
        list: list.map((item) => ({
          ...item,
          url: item.userPic
        })),
        total
      };
    })
    .catch(() => {
      // console.log("Error: ", err.message);
    });

  const { total, list: resList = [] } = data;
  setImgData({
    imgData: {
      total,
      list: list.concat(
        resList.map((item) => ({
          ...item,
          url: item.userPic
        }))
      )
    }
  });
  return data;
};

export default mapRedux()(
  setMetaProps({
    title: "首页",
    keywords: "首页网站关键词",
    description: "首页网站描述"
  })(Index)
);
