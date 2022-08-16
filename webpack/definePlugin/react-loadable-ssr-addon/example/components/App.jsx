/*
 * @Date: 2022-08-15 19:23:52
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 18:53:32
 * @FilePath: /react-ssr-lazy-loading/webpack/definePlugin/react-loadable-ssr-addon/example/components/App.jsx
 * @Description: 
 */
import React from "react";
import Loadable from  "react-loadable"//"client/component/Loadable";
import Loading from "./Loading";

const HeaderExample = Loadable({
  loader: () => import(/* webpackChunkName: "header" */ "./Header"),
  loading: Loading
});

const ContentExample = Loadable({
  loader: () => import(/* webpackChunkName: "content" */ "./Content"),
  loading: Loading
});

const MultilevelExample = Loadable({
  loader: () =>
    import(/* webpackChunkName: "multilevel" */ "./multilevel/Multilevel"),
  loading: Loading
});

export default function App() {
  return (
    <React.Fragment>
      <HeaderExample />
      <ContentExample />
      <MultilevelExample />
    </React.Fragment>
  );
}
