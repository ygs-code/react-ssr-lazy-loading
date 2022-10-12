# React SSR 服务端渲染和同构原理

**CSR**与**SSR**概念与区别。

## CSR：Client Side Rendering

**![img](https://oss-cn-hangzhou.aliyuncs.com/codingsky/cdn/img/2020-06-17/432de45d6b180df5f294d0d0dc99985f)**

浏览器(Client)渲染顾名思义就是所有的页面渲染、逻辑处理、页面路由、接口请求均是在浏览器中发生。其实，现代主流的前端框架均是这种渲染方式，这种渲染方式的好处在于实现了前后端架构分离，利于前后端职责分离，并且能够首次渲染迅速有效减少白屏时间。同时，CSR可以通过在打包编译阶段进行预渲染或者骨架屏生成，可以进一步提升首次渲染的用户体验。

但是由于和服务端会有多次交互（获取静态资源、获取数据），同时依赖浏览器进行渲染，在移动设备尤其是低配设备上，首屏时间和完全可交互时间是比较长的。

目前我们都是用MVVM开发，用的都是CSR，CSR除了渲染慢之外不利于搜索引擎蜘蛛爬取，因为搜索引擎只能爬取到静态文件对于MVVMjs渲染的内容是没办法解析的，所以搜索引擎爬取到的页面基本都是MVVM框架的指令而不是内容。

CSR渲染，如果内容是动态的， 获取内容渲染最少需要请求三次，第一次发送请求是获取到HTML，然后遇到JavaScript 脚本在发送一次请求， JavaScript脚本ajax脚本获取数据需要在再发送一次请求。



## SSR：Server Side Rendering

![img](https://oss-cn-hangzhou.aliyuncs.com/codingsky/cdn/img/2020-06-17/b258b9bf26a7b4fe76794a2b8fae9672)

服务端渲染则是在服务端完成页面的渲染，在服务端完成页面模板、数据填充、页面渲染，然后将完整的HTML内容返回给到浏览器。由于所有的渲染工作都在服务端完成，因此网站的首屏时间和TTI都会表现比较好。

但是，渲染需要在服务端完成，并不能很好进行前后端职责分离，单纯的SSR渲染对于事件交互添加不友好，典型的列子为PHP 模板渲染，或者JSP模板渲染，asp模板渲染，或者node 单纯的模板渲染+JQ，这样的设计，对于代码维护并不是很理想，可能在代码中很多地方需要写两套内容判断客户端还是服务端，比如一些路由跳转，还有数据通信等问题并不是那么好实现。 

单纯SSR渲染，如果内容是动态的，则需要发送两次请求，第一次请求是客户端发送请求获取HTML，然后ssr server服务器再发一次请求到其他服务器获取到动态内容，然后ssr server组转好内容发送给客户端。客户端就可以马上展现内容了。



### 增加服务器成本与运维成本

缺点: SSR对于服务端的负载要求也会比较高。因为需要SSR需要启动一个中间服务器，维护成本也是比CSR要大。



### 优化seo搜索

优点：较少了一次请求页面加载展现会更快，还有一个更重要问题是SEO搜索更友好。由于现在开发网站都是用MVVM框架，搜索引擎不会解析JavaScript脚本，只能爬取到html内容，这样搜索引擎其实爬取到网站都是空白页面+一些MVVM指令，这些指令他们是无法识别的，这样就不能获取到更好的排名，没有排名，就等同于没有流量，没有流量的网站基本是没什么用。所以为什么很多C端网站选择SSR渲染也是这种原因。



## SSR同构思想 SSR + SPA 体验升级

SSR同构思想，就是的SSR和CSR融合。

![img](https://oss-cn-hangzhou.aliyuncs.com/codingsky/cdn/img/2020-06-17/5aa0a733e2e7b4d76a73e16193182191)

实现 SSR 其实没啥意义，技术上没有任何发展和进步，否则 SPA 技术就不会出现

SSR和CSR均有各自的优点和缺点，因此，业界提出前后端渲染同构的方案来整合SSR和CSR。这种方案就是SSR同构。

SSR同构的原理是首页加载的时候初次访问是经过了server路由，并且server通过了ajax访问请求数据，并且拼装好HTML和JavaScript脚本之后一起发送给客户端。

客户端获取到了HTML之后，这样拿到的就不是指令内容，而是html纯文本内容，这样有利于搜索引擎渲染。通过这样的实现，可以达到和SSR相同的首屏时间。

然后客户端获取到了JavaScript脚本之后，会运行JavaScript脚本，再把脚本事件添加到DOM上。比较典型的例子就是现在 node+MVVM框架，MVVM框架（包括vue，react和angular）。





## 实现

### 简单实现ssr

实现 ssr 很简单，先看一个 node ejs的栗子

```
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>react ssr <%= title %></title>
</head>
<body>
   <%=  data %>
</body>
</html>
```

```
//node ssr
 const ejs = require('ejs');
 const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        });
        // 渲染文件 index.ejs
        ejs.renderFile('./views/index.html', {
            title: 'react ssr', 
            data: '首页'}, 
            (err, data) => {
            if (err ) {
                console.log(err);
            } else {
                res.end(data);
            }
        })
    }
}).listen(8080);
```

上面我们结合 ejs模板引擎 ，实现了一个服务端渲染的输出，html 和 数据直接输出到客户端。



## node   Ract jsx 到字符串

参考以上，我们结合 react组件 来实现服务端渲染直出，使用 jsx 来代替 ejs，之前是在 html 里使用 ejs 来绑定数据，现在改写成使用jsx 来绑定数据,使用 react 内置 api 来把组件渲染为 html 字符串，其他没有差别。

为什么react 组件可以被转换为 html字符串呢？简单的说我们写的 jsx  会转换成 ast，ast解析之后会转换成虚拟vnode Dom 然后通过diff算法转换成html内容，如果你看过vue源码或者react源码，对于这个很好理解。

我们来看看react ssr例子

app.js

```
//node ssr
import ejs from "ejs";
import http from "http";
import React from "react";
import { renderToString } from "react-dom/server";

const renderHtml = (domHtml) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="aplus-waiting" content="MAN">
    <meta name="spm-id" content="a2e0b">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="renderer" content="webkit">
    <meta name="keywords" content="<%= keywords %>" />
    <meta name="description" content="<%= description %>" />
    <meta name="referrer" content="no-referrer" />
    <title>
      <%= title %>
    </title>
  </head>
  
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${domHtml}
    </div>
  </body>
  <script src="/static/js/build.js"></script>
  
  </html>>

    `;
};
//模拟数据的获取
const fetch = function () {
  return {
    title: "react ssr",
    data: []
  };
};
//组件
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>{this.props.data.title}</h1>;
  }
}

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      const data = fetch();
      // 渲染文件 index.ejs
      let html = ejs.render(renderHtml(renderToString(<Index data={data} />)), {
        title: "react ssr",
        data: "首页",
        keywords: "网站关键词",
        description: "网站描述"
      });
      res.end(html);
    }
  })
  .listen(8080);


```



以上代码不能直接运行，需要结合babel 使用 @babel/preset-react 进行转换

运行脚本指令

```
npx babel-node -r @babel/register  app.js 
```



## 引出问题

在上面非常简单的就是实现了 react ssr ,把jsx作为模板引擎，  那我们如何构建企业级的ssr构架呢？

所以这里我们就用node Koa框架。上面例子只是一个简单的例子，我们知道一个大型项目有很多页面和组件，我们如果是单纯的用node 路由，然后每次通过客户端访问路由 通过访问地址 而引用不同的组件，这种方式叫做后端静态路由。

比如例子：

```
import Koa  from 'koa' 
import Router  from 'koa-router' 
import ejs from "ejs";
import http from "http";
import React from "react";
import { renderToString } from "react-dom/server";

import Index from "./Index";
import News from "./News";
import User from "./User";

const app = new Koa();
const router = new Router();


const renderHtml = (domHtml) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="aplus-waiting" content="MAN">
    <meta name="spm-id" content="a2e0b">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="renderer" content="webkit">
    <meta name="keywords" content="<%= keywords %>" />
    <meta name="description" content="<%= description %>" />
    <meta name="referrer" content="no-referrer" />
    <title>
      <%= title %>
    </title>
  </head>
  
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${domHtml}
    </div>
  </body>
  <script src="/static/js/build.js"></script>
  
  </html>>

    `;
};

//模拟数据的获取
const fetch = function () {
  return {
    title: "react ssr",
    data: []
  };
};

router.get('/',async (ctx) => {
  ctx.body = ejs.render(renderHtml(renderToString(<Index data={data} />)), {
        title: "首页",
        data: "首页",
        keywords: "网站关键词",
        description: "网站描述"
      });
})

router.get('/news',async (ctx) => {
  ctx.type = 'html';
    ctx.body = ejs.render(renderHtml(renderToString(<News data={data} />)), {
        title: "新闻",
        data: "新闻",
        keywords: "网站关键词",
        description: "网站描述"
      });
})

router.get('/news',async (ctx) => {
  ctx.type = 'html';
    ctx.body = ejs.render(renderHtml(renderToString(<User data={data} />)), {
        title: "react ssr",
        data: "用户",
        keywords: "网站关键词",
        description: "网站描述"
      });
})

// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
app.use(router.routes());
/*
  调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，
  会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
*/ 
app.use(router.allowedMethods({ 
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
}));

app.listen(3000,()=>{ 
  console.log('应用已经启动，http://localhost:3000'); 
});

```

如果这样方式放在以前ssr是没有问题的，但是放在现在你会发现react和一些基础库在每个页面都要重新加载一次，比如一个框架基础代码是2-5m 如果你用antd这种ui框架的话基本可以达到这个大小。每个页面都会加载2-5m的基础代码是不是很浪费资源。有MVVM框架了 有SPA体验，我们是不是可以利用SPA体验去实现只加载一次基础框架呢？这个方式我想了好久，并且参考了网上很多例子，发现是可以做到的。然后我看了底层react路由代码，和node的路由方式，熟悉他们方式之后我自己写了一个ssr  路由 懒加载，实现了路由 同构，并且可以异步代码加载和按需切分代码。具体实现请看我的github仓库 https://github.com/qq281113270/react-lazy-router-dom

###  路由同构

 那么接下来的例子我会拿一个框架去讲请看我的github仓库https://github.com/qq281113270/react-ssr-lazy-loading

 双端使用同一套路由规则，node server 通过req url path 进行组件的查找，得到需要渲染的组件。

首先 在client/router/routesComponent.js我们会配置好路由路劲和组件地址还有一些路由信息

```

let routesComponentConfig = [
  {
    path: "/marketing/discount-coupon",
    exact: false,
    name: "DiscountCoupon",
    entry: "/pages/marketing/pages/DiscountCoupon/index.js",
    Component: lazy(() =>
      import(
        /* webpackChunkName:"DiscountCoupon" */ "client/pages/marketing/pages/DiscountCoupon/index.js"
      )
    ),
    level: 2,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/marketing",
    exact: true,
    name: "marketing",
    entry: "/pages/marketing/index.js",
    Component: lazy(() =>
      import(
        /* webpackChunkName:"marketing" */ "client/pages/marketing/index.js"
      )
    ),
    level: 2,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    Component: lazy(() =>
      import(/* webpackChunkName:"home" */ "client/pages/Home/index.js")
    ),
    level: 1,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/router/routesConfig.js"
  },
  {
    path: "/user",
    exact: false,
    name: "user",
    entry: "/pages/User/index.js",
    Component: lazy(() =>
      import(/* webpackChunkName:"user" */ "client/pages/User/index.js")
    ),
    level: 1,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/router/routesConfig.js"
  }
];
```

<img src="./1.jpg" />



上面方式是这样子，每次切换路由都会走node server路由，而且每次都会重新加载基础代码。



如果我们利用node server 路由+react 路由是可以解决每次都会重新加载基础代码的问题。就是第一次加载时候走node server路由，而第二次加载时候走react  history路由。所以我们的在react代码最外层需要加一个路由组件

```
/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:13:35
 * @FilePath: /react-ssr-lazy-loading/client/router/Routers.js
 * @Description:
 */
import React from "react";
import PropTypes from "prop-types";
import Loading from "client/component/Loading";
import { Router, Switch as Routes, Route } from "react-lazy-router-dom";

const Routers = (props) => {
  const { history, routesComponent = [] } = props;
  return (
    <Router history={history} loading={Loading}>
      <Routes>
        {routesComponent.map((route) => {
          let { path, exact = true, Component } = route;
          return (
            <Route key={path} exact={exact} path={path} component={Component} />
          );
        })}
        <Route
          path="*"
          component={
            <div style={{ padding: "1rem" }}>
              <p>There s nothing here!</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  context: PropTypes.object
};
export default Routers;

```



client/App.js

```
/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:07:47
 * @FilePath: /react-ssr-lazy-loading/client/App/App.js
 * @Description:
 */
import React from "react";
import { Provider } from "react-redux";
import Routers from "client/router";
// import { stringToObject } from "client/utils";
import "./App.less";
import "client/assets/css/base.less";
import "bootstrap/dist/css/bootstrap.css";

// let {
//   NODE_ENV, // 环境参数
//   target, // 环境参数
//   htmlWebpackPluginOptions = ""
// } = process.env; // 环境参数
const App = (props) => {
  const { history, store, routesComponent } = props;
  return (
    <Provider store={store}>
      <Routers history={history} routesComponent={routesComponent} />
    </Provider>
  );
};
// App.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default App;

```





server/middleware/clientRouter/index.js

```
import createApp from "client/App";
  // ...省略代码
    let rootString = renderToString(
      createApp({
        store,
        context,
        history,
        modules,
        location,
        routesComponent: [
          {
            ...isMatchRoute,
            Component: routeComponent
          }
        ]
      })
    );
  // ...省略代码

```

<img src="./2.jpg" />

这样方式就能实现server和client 路由同构问题。

#### 路由按需加载代码切分

我们知道react在client中代码切分用的是React.lazy。官方说React.lazy不支持服务端渲染。所以我们不能用这个。后面我看到有第三方插件React Loadable ，但是我在使用的时候发现这个插件有两个问题，第一个问题就是加载延迟问题，在我每次切换组件的时候都能看到 loading 闪烁效果。第二个问题是在第一次访问页面的时候走的路由也是异步的，这样的方式是不利于seo搜索引擎优化。我是我们想要的是第一次访问请求路由应该是走同步，以为server是不支持异步加载，而代码切分需要异步，如果不是异步webpack打包的时候会把整个项目打包在一起，这样就会让我们的JavaScript脚本变得很大，如果项目很大就会产生 5-10m代码。这样不是我们想要的效果，最终我自己看了react 官方路由和React Loadable 思想写了一个 可以兼容 ssr和client的路由 具体看我的github仓库 https://github.com/qq281113270/react-lazy-router-dom。

这里个库大概功能就是，在第一次访问server的时候 组件是同步的，这样在react-lazy-router-dom就直接渲染出来，如果是异步的将会放在一个状态中，等待异步加载完组件在展现。 大概思想是通过递归和 Promise 方式加载 直至获取到组件。

```
 getSyncComponent = (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) === "object Object"
    ) {
      if (isValidElement(component)) {
        return component;
      } else if (component.__esModule) {
        component = this.getSyncComponent(component.default, callback);
      }
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Function"
    ) {
      component = component(this.props);
      component = this.getSyncComponent(component, callback);
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      this.resolveComponent(component, callback).then((AsynComponent) => {
        callback(AsynComponent);
      });
      return null;
    }
    return component;
  };

  resolveComponent = async (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      /* eslint-disable   */
      // component = await new Promise(async (relove, reject) => {
      //   setTimeout(async () => {
      //     let data = await component;
      //     relove(data);
      //   }, 2000);
      // });
      /* eslint-enable   */
      component = await component;
      component = this.resolveComponent(component, callback);
    } else {
      component = this.getSyncComponent(component, callback);
    }
    return component;
  };

```

## 数据同构（预取同构）

数据预取同构，解决双端如何使用同一套数据请求方法来进行数据请求。

先说下流程，在查找到要渲染的组件后，需要预先得到此组件所需要的数据，然后将数据传递给组件后，再进行组件的渲染。

我们可以通过给组件定义静态方法来处理，组件内定义异步数据请求的方法也合情合理，同时声明为静态（static），在 server 端和组件内都也可以直接通过组件（function） 来进行访问。

比如 Index.getInitPropsState

/client/pages/Home/index.js组件

```
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
// import { routesConfigs } from "client/router/routesComponent";
// import { findTreeData } from "client/utils";
import { getHaoKanVideo } from "client/assets/js/request/requestApi";
import "./index.less";
// 权限跳转登录页面可以在这控制
const Index = (props) => {
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    dispatch: { home: { setInitState = () => {} } = {} } = {},
    state: { home: { initState: { list = [] } = {} } = {} } = {}
  } = props;
  useEffect(() => {
    console.log(
      "window.__INITIAL_STATE__ =",
      window && window.__INITIAL_STATE__
    );
    if (!list.length) {
      getImages(page - 1);
    }
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
      } = await Index.getInitPropsState({
       page,
        size: 10
      });

      // console.log("$data=====", $data);
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

Index.getInitPropsState = async (parameter = {}) => {
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
};

Index.getMetaProps = () => {
  return {
    title: "首页",
    keywords: "网站关键词",
    description: "网站描述"
  };
};

export default mapRedux()(Index);

```

 把数据请求方法挂载在Index.getInitPropsState 静态中这么做主要是为了后端server 可以拿到该方法，可以去调用他。

### 数据注水





