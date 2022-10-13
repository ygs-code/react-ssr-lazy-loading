#  webpack react loadable redux ssr

# English document

## An introduction to

Welcome to React-SSR-lazy-Loading documentation!

### description：

1. 0 cost learning, the API is almost identical to the REACT API
2. Pages load on access and load on demand, cut from code
3. Spa isomorphism is realized.
4. The development environment utilizes Webpack-dev-middleware and Webpack-hot-server-middleware for hot-compiled memory access 
5. React-ssr-lazy-loading is a project constructed by REACT + Webpack. The required plugins and loaders can be matched according to your needs
6. An interactive course with quizzes will guide you through everything you need to use React-SSR-lazy-Loading.

## [System requirements](https://nextjs.org/docs/getting-started#system-requirements)

- [Node.js 12.22.0Or higher](https://nodejs.org/)
- Supports MacOS, Windows (including WSL), and Linux

  We recommend creating a new application that will set everything up for you automatically. To create a project, run：

```
git clone https://github.com/qq281113270/react-ssr-lazy-loading.git
```

```
cd react-ssr-lazy-loading
npm i
# or
yarn
```

After the installation is complete ，

#### Install the required dependencies 

```
npm install
```

### Client Commands

#### If you don't need SSR rendering, you can choose start:client:dev

Start development commands that do not require SSR server selection

```
npm  run   start:client:dev
```

#### Packaging does not require the SSR server's render online packaging command

```
npm  run  build:client:prod
```



### SSR server render command 

####  SSR server render development package command  : start:ssr:dev

```
npm  run   start:ssr:dev
```

#### SSR server render line pack command build:ssr:prod

```
npm  run  build:ssr:prod
```

#### This command is used to start the SSR server start:ssr:prod

```
npm  run  start:ssr:prod
```





## Project directory Structure：

```

├── README.md     # documentation
├── bin           # Script execution
│   ├── cmd.js    # Script execution
│   └── index.js
├── client      #  Client Directory react code
│   ├── App      
│   │   ├── App.js
│   │   ├── App.less
│   │   ├── CreateApp.js
│   │   └── index.js
│   ├── assets       # Static resource directory
│   │   ├── css
│   │   ├── img
│   │   └── js
│   ├── component   #  Common Component Directory
│   │   ├── Head
│   │   ├── InitState
│   │   ├── LazyLoadingImg
│   │   ├── Loadable
│   │   ├── Loading
│   │   ├── Nav
│   │   └── Table
│   ├── index.js      # Client entry JS
│   ├── pages        #  Route page Page directory
│   │   ├── Home
│   │   ├── User
│   │   └── marketing
│   ├── public         # Webpack introduces an HTML template directory
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   └── logo512.png
│   ├── redux        # react-redux directory
│   │   ├── index.js
│   │   ├── initComponentState.js
│   │   └── models
│   ├── router     #  react   directory
│   │   ├── Routers.js
│   │   ├── addRouterApi.js
│   │   ├── history.js
│   │   ├── historyPush.js
│   │   ├── index.js
│   │   ├── react-lazy-router-dom
│   │   ├── routePaths.js
│   │   ├── routesComponent.js
│   │   └── routesConfig.js
│   ├── static    # webpack Do not package static resource directories
│   └── utils        # Some tools and methods
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
├── dist   # Build Code Package directory
│   ├── client  # Client code Build directory
│   └── server  # Server code Build directory
├── node_modules  #node_modules
├── nodemon.json  # nodemon.json   Restarting the Node Configuration
├── package.json    # npm Depend on the package
├── server       # Code directory of the server
│   ├── app.js   #  Server KOA App
│   ├── controller  # The controller
│   ├── index.js   #   Server entry execution file
│   ├── middleware  # Middleware Addition Directory
│   │   ├── clientRouter
│   │   ├── index.js
│   │   └── webpackHot
│   ├── router   # server Routing directory
│   │   ├── api.js  
│   │   └── index.js
│   ├── service    # service directory
│   │   └── user.js
│   └── utils  # Some tool methods on the server side
│       ├── copyFile.js
│       ├── index.js
│       ├── readFile.js
│       └── watchFile.js
├── webpack  # webpack  The configuration directory
│   ├── config
│   │   ├── client # client webpack configuration
│   │   └── server  # server webpack configuration
│   ├── defineLoader # define Loader
│   │   └── MyExampleWebpackLoader.js
│   ├── definePlugin # define Plugin
│   │   ├── HelloWorldCheckerPlugin
│   │   ├── MyExampleWebpackPlugin.js
│   │   ├── react-loadable
│   │   ├── react-loadable-ssr-addon
│   │   ├── webpack-plugin-copy-file
│   │   ├── webpack-plugin-no-require-css
│   │   ├── webpack-plugin-resolve-alias
│   │   └── webpack-plugin-router
│   ├── index.js   # Webpack Export file
│   └── utils  # Webpack tool method
│       ├── alias.js
│       ├── copyFile.js
│       ├── index.js
│       ├── readFile.js
│       ├── readWriteFiles.js
│       ├── stringToObject.js
│       └── watchFile.js
```



## Page configuration and routing

###  page 

```
├── client      #  Client Directory code
│   ├── pages  
         ├──Home     #   Home page       
         ├── marketing  #  marketing  Directory Secondary Route
                ├── pages
                      ├── DiscountCoupon   # DiscountCoupon page       
                ├── router      
                       ├── routesConfig.js # Configuring Secondary Routes
│   ├── router      # The routing configuration
        ├── routesConfig.js   # Level-1 Route Configuration
```

If it is to set the level 1 route, then the configuration file is in client    --> router --> routesConfig.js 

If it's a secondary route then it's in   client    --> pages --> marketing --> router --> routesConfig.js 

routesConfig.js  content 

```
import { getHaoKanVideo } from "../assets/js/request/requestApi";
// The routing configuration
export default [
  {
    path: "/",   #  Routing path
    exact: true, # react   Routing parameters exact
    name: "home",  # react routing name
    entry: "/pages/Home/index.js", #   Routing path
    initState: async (parameter = {}) => {  #  Each page initialization data is used for Node background static request data, or the client has just completed the DOM initialization request data
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
    level: 1 #  Routing Level 1 ROUTING, BECAUSE we render the routing points flat, so the level is identified by this number
  },
  {
    path: "/user",
    name: "user",
    entry: "/pages/User/index.js",
    level: 1
  }
];

```
If we need to add new pages, we can simply add the routesconfig.js parameter to Client Pages after adding the page component.

Webpack automatically generates the RoutesComponent.js file when it is packaged and compiled.

React will fetch the routesComponent.js file. Forming a routing address. Support SSR and pure client development mode.


### router

In React Prop, I inject two routing properties. One is pushRoute. One is routePaths routing component address parameter information.

We don't need to use this.props. History.push () in React when routing to a jump

Instead, let's say the name of the home page is home

```
   { 
    path: "/",   #  路由路径
    exact: true, # react 路由参数exact
    name: "home",  # react 路由 name
    entry: "/pages/Home/index.js", #  路由路径
    }
    
```

You can do this using route forwarding

```
this.pushRoute('home')
```

If you need to pass parameters get pass parameters

```
this.pushRoute({
  name:'home',
  query:{
    age:18,
    name:'yao guan shou'
  }
})
```

Jump for the  <http://localhost:3002?age=18&name=yaoGuanShou>

We can also pass parameters by address

Route Path Configuration

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

Jump for the  <http://localhost:3002/18/yaoGuanShou>



## Get Data

### Get data  and redux

####  node ssr get per-page data

Data acquisition can be rendered into HTML after Node requests data acquisition and sent directly to the client, where the request can be made.

Configure this if you want to make requests on the Node server. Configured in routesconfig.js

```
 {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    initState: async (parameter = {}) => {  # ajax request
      const { page = 1, size = 10 } = parameter;
      # send ajax request 
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

Create a new home.js in redux --> models --> home.js to store the Ajax request data.



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



When the user requests the page, the node server matches the home route, invokes RoutesConfig.js to request initState to send the Ajax request, and stores the data in redux initState.

Read the initState data. Import import {mapRedux} from "client/redux"; The mapRedux decorator, which injects Redux into the component.

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

Print the props can see props. State. Home. InitState data.

The client updates initState. You have setCount and setInitState at props. Dispatch. home. These are the methods defined in redux --> models --> home.js.

Update initState

```
 props.dispatch.home.setInitState(newData) 
```



#### Node SSR Obtains public data

For example, the client header has a data that every page needs, which we can do in the redux -> models -> baseinitstate.js method defined

```

import { getWeather } from "../../assets/js/request/requestApi";
const setInitData = (global, name) => {
  let initState = {};
  if (global && global.__INITIAL_STATE__ && global.__INITIAL_STATE__[name]) {
    initState = global.__INITIAL_STATE__[name];
  }

  return initState;
};
export default (global) => ({
  state: {
    ...setInitData(global, "baseInitState"),
    menuActive: "/"
  },
  reducers: {
    setInitState(state, newState) {
      return {
        ...state,
        ...newState
      };
    },
    setMenuActive(state, newState) {
      return {
        ...state,
        ...newState
      };
    }
  },
  effects: (dispatch) => ({
    async getWeatherAsync() {
      return await getWeather({
        key: "2d935fc56c5f9ab2ef2165822cedff56",
        city: "440300",
        extensions: "all"
      })
        .then((data) => {
          dispatch.baseInitState.setInitState({
            weather: data.forecasts[0]
          });
          return data;
        })
        .catch((err) => {
          console.log("Error: ", err.message);
        });
    }
  })
});

```

Effects defines an Ajax request for getWeatherAsync to get the weather data. GetNameAsync must be defined here

It starts with get+name+Async and ends with an Async function because in the framework you're going to match regular functions like this, and then you're going to call that method and send the request, and then you're going to store it in redux.



#### client get data

To obtain client data, use the useEffect callback just like the React API

```
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```



## The CSS support

This framework has been configured with CSS and LESS. If you need SASS, you can add SASS Loader in the configuration file of Webpack --> config.



## The environment variable

 .env file public environment variable configuration

.env.development file development environment variable configuration

.env.production file configuration of production environment variables

If you need other environments, you can add the.env.xxxx file and then run the shell script dotenv_config_path=.env.xxxx. Such as:

```
"cross-env  target='ssr'  npx babel-node  -r  @babel/register    ./dist/server/index.js   -r  dotenv/config  dotenv_config_path=.env.xxxx ",
```



### If you feel good move your finger and click starred for me。 thank you



## thanks

under the  [MIT License](http://mit-license.org/.)
Authored and maintained by yao guan shou.



  





# 中文文档

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

####  安装所需的依赖

```
npm install
```

### 客户端命令

#### 如果不需要ssr渲染，可以选择 start:client:dev

启动 不需要 ssr 服务器选择的开发命令

```
npm  run   start:client:dev
```

#### 打包 不需要 ssr 服务器的渲染的 线上打包命令 

```
npm  run  build:client:prod
```



### ssr 服务器渲染命令 

#### ssr服务器渲染开发打包命令  : start:ssr:dev

```
npm  run   start:ssr:dev
```

#### ssr服务器渲染线上打包命令 build:ssr:prod

```
npm  run  build:ssr:prod
```

#### 启动 ssr 服务器命令start:ssr:prod

```
npm  run  start:ssr:prod
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
│   │   ├── react-lazy-router-dom
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

### 页面

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

### 数据获取与redux

####  node ssr获取每个页面数据

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



#### node ssr 获取公共数据

比如客户端头部有个数据每个页面都需要的，这个我们可以这样做在 redux --> models --> baseInitState.js定义的方法。

```
import { getWeather } from "../../assets/js/request/requestApi";
const setInitData = (global, name) => {
  let initState = {};
  if (global && global.__INITIAL_STATE__ && global.__INITIAL_STATE__[name]) {
    initState = global.__INITIAL_STATE__[name];
  }

  return initState;
};
export default (global) => ({
  state: {
    ...setInitData(global, "baseInitState"),
    menuActive: "/"
  },
  reducers: {
    setInitState(state, newState) {
      return {
        ...state,
        ...newState
      };
    },
    setMenuActive(state, newState) {
      return {
        ...state,
        ...newState
      };
    }
  },
  effects: (dispatch) => ({
    async getWeatherAsync() {
      return await getWeather({
        key: "2d935fc56c5f9ab2ef2165822cedff56",
        city: "440300",
        extensions: "all"
      })
        .then((data) => {
          dispatch.baseInitState.setInitState({
            weather: data.forecasts[0]
          });
          return data;
        })
        .catch((err) => {
          console.log("Error: ", err.message);
        });
    }
  })
});

```

在  effects  中定义 getWeatherAsync 获取 天气数据的ajax请求，这里定义一定要 getNameAsync

开头是get+name+Async 结尾是Async函数因为在框架中会匹配这样规则的函数，然后调用该方法发送请求，然后存到redux中。



#### client 获取数据

获取客户端数据，和react api一样使用 在useEffect回调即可

```
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```



## css支持

本框架已经配置了 css 与 less，如果需要sass可以在webpack --> config 的配置文件中添加 sass loader即可。



## 环境变量

 .env 文件 公共环境变量配置

.env.development 文件 开发环境变量配置

.env.production 文件 生产环境变量配置

如果需要其他环境 可自行添加 .env.xxxx 文件 然后在运行shell脚本的时候 dotenv_config_path=.env.xxxx 即可。比如：

```
"cross-env  target='ssr'  npx babel-node  -r  @babel/register    ./dist/server/index.js   -r  dotenv/config  dotenv_config_path=.env.xxxx ",
```



如果你对你有用，请移动你的手指，为我点击starred。谢谢你！  



根据[MIT许可证](http://mit-license.org/。) 

作者 姚观寿 维护



​	



​	





