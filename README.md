#  webpack react loadable redux ssr

 Descriptions：

1. The page is loaded on access and on demand. 

2. Spa isomorphism is realized. 

3. Implement compiled memory access using Webpack-dev-middleware and Webpack-hot-Server-middleware (in progress)



说明：

1. 页面按访问加载和按需加载。

2. 实现了spa同构。
3. 利用 webpack-dev-middleware 和  webpack-hot-server-middleware  实现 编译内存访问 



Install the required dependencies （安装所需的依赖）

```
npm install
```

If you don't need SSR rendering, you can choose（如果不需要ssr渲染，可以选择） start:client:dev

Start development commands that do not require SSR server selection (启动 不需要 ssr 服务器选择的开发命令)

```
npm  run   start:client:dev
```

Packaging does not require an online packaging name for the SSR server's render (打包 不需要 ssr 服务器的渲染的 线上打包命名 )

```
npm  run  build:client:prod
```



SSR server render command (ssr 服务器渲染命令)

SSR server render development package command SSR (ssr服务器渲染开发打包命令 ) : start:ssr:dev

```
npm  run   start:ssr:dev
```

SSR server render line pack command  (ssr服务器渲染线上打包命令 ) build:ssr:prod

```
npm  run  build:ssr:prod
```

This command is used to start the SSR server (启动 ssr 服务器命令)  start:server

```
npm  run  start:server
```







# 入门

欢迎来到 react-ssr-lazy-loading 文档！ 

说明：

1. 0成本学习，api几乎和react api 一致
2. 页面按访问加载和按需加载，与代码切割
3. 实现了spa同构。
4. 利用 webpack-dev-middleware 和  webpack-hot-server-middleware  实现 编译内存访问 
5. 拓展性好，react-ssr-lazy-loading  是 react + webpack 构建的项目。所需的 plugins 和 loader可以根据自己需求搭配

带有测验的交互式课程将指导您了解使用 react-ssr-lazy-loading  所需的一切。

## [系统要求](https://nextjs.org/docs/getting-started#system-requirements)

- [Node.js 12.22.0](https://nodejs.org/)或更高版本
- 支持 MacOS、Windows（包括 WSL）和 Linux

  我们建议使用 创建一个新的   应用程序，它会自动为您设置所有内容。要创建项目，请运行：

```
git clone https://github.com/qq281113270/react-ssr-lazy-loading.git
```

```
cd react-ssr-lazy-loading
npm i
# or
yarn
```

安装完成后 ，

If you don't need SSR rendering, you can choose（如果不需要ssr渲染，可以选择） start:client:dev

Start development commands that do not require SSR server selection (启动 不需要 ssr 服务器选择的开发命令)

```
npm  run   start:client:dev
```

Packaging does not require an online packaging name for the SSR server's render (打包 不需要 ssr 服务器的渲染的 线上打包命名 )

```
npm  run  build:client:prod
```



SSR server render command (ssr 服务器渲染命令)

SSR server render development package command SSR (ssr服务器渲染开发打包命令 ) : start:ssr:dev

```
npm  run   start:ssr:dev
```

SSR server render line pack command  (ssr服务器渲染线上打包命令 ) build:ssr:prod

```
npm  run  build:ssr:prod
```

This command is used to start the SSR server (启动 ssr 服务器命令)  start:server

```
npm  run  start:server
```



## 项目目录结构：

```

├── README.md     # 文档说明
├── bin           # 脚本执行
│   ├── cmd.js    # 脚本执行
│   └── index.js
├── client      #  客户端目录，react code
│   ├── App      
│   │   ├── App.js
│   │   ├── App.less
│   │   ├── CreateApp.js
│   │   └── index.js
│   ├── assets       #静态资源目录
│   │   ├── css
│   │   ├── img
│   │   └── js
│   ├── component   # 公共组件目录
│   │   ├── Head
│   │   ├── InitState
│   │   ├── LazyLoadingImg
│   │   ├── Loadable
│   │   ├── Loading
│   │   ├── Nav
│   │   └── Table
│   ├── index.js      # 客户端入口js
│   ├── pages        # 路由页面 page 目录
│   │   ├── Home
│   │   ├── User
│   │   └── marketing
│   ├── public         # webpack 引入 html 模板目录
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   └── logo512.png
│   ├── redux        # react-redux 目录
│   │   ├── index.js
│   │   ├── initComponentState.js
│   │   └── models
│   ├── router     #  react 路由 目录
│   │   ├── Routers.js
│   │   ├── addRouterApi.js
│   │   ├── history.js
│   │   ├── historyPush.js
│   │   ├── index.js
│   │   ├── react-router-dom
│   │   ├── routePaths.js
│   │   ├── routesComponent.js
│   │   └── routesConfig.js
│   ├── static    # webpack 不打包静态资源目录
│   └── utils        # 一些工具和方法
│       ├── CheckDataType.js
│       ├── FloatingBall.js
│       ├── SubscribePublished.js
│       ├── createStore.js
│       ├── ergodic.js
│       ├── getBaseInitState.js
│       ├── getCssAttr.js
│       ├── index.js
│       ├── regular.js
│       ├── resolvePath.js
│       ├── setInitData.js
│       ├── stringToObject.js
│       ├── throttlingStabilization.js
│       └── transformRoutePaths.js
├── dist   # build code 打包目录
│   ├── client  # 客户端code打包目录
│   └── server  # 服务端code 打包目录
├── node_modules  #node_modules
├── nodemon.json  # nodemon.json  重启node配置
├── package.json    # npm 依赖包
├── server       # 服务端 code 目录
│   ├── app.js   #  服务器 koa  app
│   ├── controller  # 控制器
│   ├── index.js   #   server 入口执行文件
│   ├── middleware  # 中间件添加 目录
│   │   ├── clientRouter
│   │   ├── index.js
│   │   └── webpackHot
│   ├── router   # server 路由目录
│   │   ├── api.js  
│   │   └── index.js
│   ├── service    # service目录
│   │   └── user.js
│   └── utils  # 服务端 一些工具方法
│       ├── copyFile.js
│       ├── index.js
│       ├── readFile.js
│       └── watchFile.js
├── webpack  # webpack 配置目录
│   ├── config
│   │   ├── client # client webpack 配置
│   │   └── server  # server webpack 配置
│   ├── defineLoader # 自定义Loader
│   │   └── MyExampleWebpackLoader.js
│   ├── definePlugin # 自定义Plugin
│   │   ├── HelloWorldCheckerPlugin
│   │   ├── MyExampleWebpackPlugin.js
│   │   ├── react-loadable
│   │   ├── react-loadable-ssr-addon
│   │   ├── webpack-plugin-copy-file
│   │   ├── webpack-plugin-no-require-css
│   │   ├── webpack-plugin-resolve-alias
│   │   └── webpack-plugin-router
│   ├── index.js   # webpack 导出文件
│   └── utils  # webpack 工具方法
│       ├── alias.js
│       ├── copyFile.js
│       ├── index.js
│       ├── readFile.js
│       ├── readWriteFiles.js
│       ├── stringToObject.js
│       └── watchFile.js
```



## 页面配置与路由

###  页面 

```
├── client      #  客户端目录，react code
│   ├── pages  
         ├──Home     #   Home 页面       
         ├── marketing  #  marketing  目录 二级路由    
                ├── pages
                      ├── DiscountCoupon   # DiscountCoupon页面
                ├── router      
                       ├── routesConfig.js # 二级路由配置
│   ├── router      # 路由配置
        ├── routesConfig.js   # 一级路由配置
```

 如果是设置一级路由那么 配置文件在 client    --> router --> routesConfig.js 中

如果是二级路由那么是在   client    --> pages --> marketing --> router --> routesConfig.js 中

 routesConfig.js  内容

```
import { getHaoKanVideo } from "../assets/js/request/requestApi";
// 路由配置
export default [
  {
    path: "/",   #  路由路径
    exact: true, # react 路由参数exact
    name: "home",  # react 路由 name
    entry: "/pages/Home/index.js", #  路由路径
    initState: async (parameter = {}) => {  # 每个页面初始化数据用于 node 后台静态请求数据，或者是 客户端 刚初始化完成 dom 请求数据
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
    level: 1 #  路由级别 1级路由，因为我们在渲染的时候会把路由点平 ，所以级别是靠这个数字识别
  },
  {
    path: "/user",
    name: "user",
    entry: "/pages/User/index.js",
    level: 1
  }
];

```

如果我们需要新加页面，只需要在 client pages中添加页面组件之后，配置 增加 routesConfig.js  参数即可。

webpack 打包编译的时候会自动生成routesComponent.js文件。

react会去取路由routesComponent.js文件。形成路由地址。支持ssr和单纯client开发模式。



### 路由

在react prop中我注入了两个 路由属性 一个是pushRoute 路由跳转函数。一个是routePaths 路由组件地址参数信息。

当路由跳转的时候我们不需要使用 react 中的 this.props.history.push()

我们可以这样 name 是路由的name ，比如当路由跳转的时候我们不需要使用 react 中的 this.props.history.push()

我们可以这样 name 是路由的name ，比如 home页面 的 name 是 home

```
   { 
    path: "/",   #  路由路径
    exact: true, # react 路由参数exact
    name: "home",  # react 路由 name
    entry: "/pages/Home/index.js", #  路由路径
    }
    
```

使用路由跳转可以这样做

```
this.pushRoute('home')
```

如果需要传参 get 传参

```
this.pushRoute({
  name:'home',
  query:{
    age:18,
    name:'yao guan shou'
  }
})
```

跳转则为  <http://localhost:3002?age=18&name=yaoGuanShou>

我们也可以通过地址传参

路由path配置

```
  path: "/:id/:name",    
```

```
this.pushRoute({
  name:'home',
  params:{
    age:18,
    name:'yao guan shou'
  }
})
```

跳转则为  <http://localhost:3002/18/yaoGuanShou>



## 数据获取

数据获取可以在node请求获取数据之后然后渲染成html直接发送给客户端，可以在客户端做请求。

如果希望在node服务端做请求那么这样配置。 在 routesConfig.js 中配置import { getHaoKanVideo } from "../assets/js/request/requestApi";// 路由配置export default [  {    path: "/",   #  路由路径    exact: true, # react 路由参数exact    name: "home",  # react 路由 name    entry: "/pages/Home/index.js", #  路由路径    initState: async (parameter = {}) => {  # 每个页面初始化数据用于 node 后台静态请求数据，或者是 客户端 刚初始化完成 dom 请求数据      const { page = 1, size = 10 } = parameter;      return await getHaoKanVideo({        page,        size      })        .then((res) => {          const { result: { list = [], total } = {} } = res;          return {            list: list.map((item) => ({              ...item,              url: item.userPic            })),            total          };        })        .catch(() => {          // console.log("Error: ", err.message);        });    },    level: 1 #  路由级别 1级路由，因为我们在渲染的时候会把路由点平 ，所以级别是靠这个数字识别  },  {    path: "/user",    name: "user",    entry: "/pages/User/index.js",    level: 1  }];

如果我们需要新加页面，只需要在 client pages中添加页面组件之后，配置 增加 routesConfig.js  参数即可。

webpack 打包编译的时候会自动生成routesComponent.js文件。

react会去取路由routesComponent.js文件。形成路由地址。支持ssr和单纯client开发模式。

### 路由

在react prop中我注入了两个 路由属性 一个是pushRoute 路由跳转函数。一个是routePaths 路由组件地址参数信息。

当路由跳转的时候我们不需要使用 react 中的 this.props.history.push()

我们可以这样 name 是路由的name ，比如当路由跳转的时候我们不需要使用 react 中的 this.props.history.push()

我们可以这样 name 是路由的name ，比如 home页面 的 name 是 home

```
   { 
    path: "/",   #  路由路径
    exact: true, # react 路由参数exact
    name: "home",  # react 路由 name
    entry: "/pages/Home/index.js", #  路由路径
    }
    
```

使用路由跳转可以这样做

```
this.pushRoute('home')
```

如果需要传参 get 传参

```
this.pushRoute({
  name:'home',
  query:{
    age:18,
    name:'yao guan shou'
  }
})
```

跳转则为  <http://localhost:3002?age=18&name=yaoGuanShou>

我们也可以通过地址传参

路由path配置

```
  path: "/:id/:name",    
```

```
this.pushRoute({
  name:'home',
  params:{
    age:18,
    name:'yao guan shou'
  }
})
```

跳转则为  <http://localhost:3002/18/yaoGuanShou>

### 数据获取与redux

####  每个页面数据

数据获取可以在node请求获取数据之后然后渲染成html直接发送给客户端，可以在客户端做请求。

如果希望在node服务端做请求那么这样配置。 在 routesConfig.js 中配置

```
 {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    initState: async (parameter = {}) => {  # ajax 请求
      const { page = 1, size = 10 } = parameter;
      # 发送 ajax 请求 
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
```

在redux --> models --> home.js 新建一个home.js 用于存储ajax请求数据。



```

import { setInitData } from "client/utils";
export default (global) => ({
  state: {
    initState: setInitData(global, "home"),
    count: 0
  },
  reducers: {
    setCount(state, newState) {
      return {
        ...state,
        count: newState
      };
    },

    setInitState(state, newState) {
      return {
        ...state,
        ...newState
      };
    }
  },
  effects: {

  }
});

```







在用户请求页面的时候 node 服务器会 匹配到 home路由    会调用routesConfig.js 请求 initState 方法 发送ajax 请求，然后会把数据存放于 redux initState中。

读取 initState 数据.   引入 import { mapRedux } from "client/redux";  mapRedux 装饰器，把 redux 注入 组件中。

```
import { mapRedux } from "client/redux";

const Index = (props) => {
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    dispatch: { home: { setInitState = () => {} } = {} } = {},
    state: { home: { initState: { list = [] } = {} } = {} } = {}
  } = props;
  console.log("props=======", props);
  return (
    <div className="home"> home </div>
  );
};


```

打印 props 可以看到props.state.home.initState 数据。

客户端 更新 initState 。在 props.dispatch.home 有setCount和setInitState。这两个方法就是刚才在redux --> models --> home.js定义的方法。

更新initState

```
 props.dispatch.home.setInitState(newData) 
```



#### 公共数据



 

  

​	

  

​	





 

  

​	



  

​	