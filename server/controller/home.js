import service from '../service/home';

class Controller {
    static hello(ctx, next) {
        var page = ctx.params.page; // 获取请求参数
        //添加service
        const data = service.list(page);

        ctx.response.body = `<dl>
            <dt>title:${data.title}</dt>
            <dd>time:${data.time}</dd>
            <dd>id:${data.id}</dd>
            <dd>url:${data.url}</dd>
            </dl>`;
    }
}

export default Controller;
