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
        ejs.renderFile('./views/index.ejs', {
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

```
const  React  = require('react');

import { renderToString } from "react-dom/server";

const http = require('http');

//组件
class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <h1>{this.props.data.title}</h1>
    }
}

//模拟数据的获取
const fetch = function () {
    return {
        title:'react ssr',
        data:[]
    }
}

//服务
http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const data = fetch();

        const html = renderToString(<Index data={data}/>);
        res.end(html);
    }
}).listen(8080);

```



以上代码不能直接运行，需要结合babel 使用 @babel/preset-react 进行转换

运行脚本指令

```
npx babel script.js --out-file script-compiled.js --presets=@babel/preset-react
```





 











