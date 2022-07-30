##  webpack react react loadable redux ssr

 Descriptions：

1. The page is loaded on access and on demand. 

2. Spa isomorphism is realized. 

3. Implement compiled memory access using Webpack-dev-middleware and Webpack-hot-Server-middleware (in progress)



说明：

1. 页面按访问加载和按需加载。

2. 实现了spa同构。
3.  利用 webpack-dev-middleware 和  webpack-hot-server-middleware  实现 编译内存访问 （实现中）



Install the required dependencies （安装所需的依赖）

```
npm install
```

If you don't need SSR rendering, you can choose（如果不需要ssr渲染，可以选择） web:dev:server

Start development commands that do not require SSR server selection (启动 不需要 ssr 服务器选择的开发命令)

```
npm  run  web:dev:server
```

Packaging does not require an online packaging name for the SSR server's render (打包 不需要 ssr 服务器的渲染的 线上打包命名 )

```
npm  run web:prod:build
```



SSR server render command (ssr 服务器渲染命令)

SSR server render development package command SSR (ssr服务器渲染开发打包命令 ) :dev:build 

```
npm  run  ssr:dev:build
```

SSR server render line pack command  (ssr服务器渲染线上打包命令 ) ssr:dev:build

```
npm  run  ssr:prod:build
```

This command is used to start the SSR server (启动 ssr 服务器命令)  start:server

```
npm  run  sart:server 
```

