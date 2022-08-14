import koaRouter from "koa-router";
// import { menu } from '../baseInitState';
export default class Api {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init() {
    this.addRouter();
  }

  // 添加菜单路由
  addMenuRouter() {
    // 修改为其他请求类型，只需要将get改成需要的类型即可
    this.router.get("/menu", async (ctx, next) => {
      ctx.body = JSON.stringify({
        code: 200,
        message: "请求成功"
        // data: menu(),
      });
      await next();
    });
  }
  addRouter() {
    this.router = koaRouter({
      prefix: "/api" // 路由前缀
    });

    this.addMenuRouter();
    // 加载路由中间件
    this.app.use(this.router.routes());
  }
}
