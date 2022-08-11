/*
 * @Date: 2022-08-01 17:29:00
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 15:55:18
 * @FilePath: /react-loading-ssr/client/router/routesConfig.js
 * @Description:
 */
import { getHaoKanVideo } from "../assets/js/request/requestApi";
// 路由配置
export default [
  {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    initState: async (parameter = {}) => {
      const { page = 1, size = 10 } = parameter;
      return await getHaoKanVideo({
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
    },
    level: 1
  },
  {
    path: "/user",
    name: "user",
    entry: "/pages/User/index.js",
    level: 1
  }
];
