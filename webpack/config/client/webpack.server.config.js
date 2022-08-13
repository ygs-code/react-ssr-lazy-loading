const CopyWebpackPlugin = require('copy-webpack-plugin');
const ResolveAlias = require('../../definePlugin/webpack-plugin-resolve-alias');

const path = require('path');

let $ResolveAlias = new ResolveAlias({
    resolve: {
        // 路径配置
        alias: {
            "@": path.join(process.cwd()),
            client: path.join(process.cwd(), "/client"),
            server: path.join(process.cwd(), "/server")
          },
      
    },
});

let {
    NODE_ENV, // 环境参数
    target, // 环境参数
} = process.env; // 环境参数


module.exports = {
    // mode: NODE_ENV,
    ...(NODE_ENV = 'development'
        ? {
              watch: true,
              watchOptions: {
                  //延迟监听时间
                  aggregateTimeout: 500,
                  //忽略监听文件夹
                  ignored: '/node_modules/',
              },
          }
        : {}),
    devtool: 'source-map',
    // context: path.join(process.cwd(), '/client'),
    entry: {
        test: path.join(process.cwd(), '/server/test.js'),
    },
    output: {
        path: path.join(process.cwd(), '/dist/server'),
        filename: '[name].js',
        chunkFilename: '[name][contenthash].js',

        // filename: 'static/[name].[hash:8].js',
        // path: path.resolve(process.cwd(), './dist/client'),
        // publicPath: '/',
        // chunkFilename: 'static/[name]-[hash:8].js',
        // libraryTarget: isServer?'commonjs2':'umd',
    },
    // resolve: {
    //     // 路径配置
    //     alias: {
    //         '@': path.join(process.cwd(), '/client'),
    //     },
    //     extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.png', '.jpg'],
    //     modules: [path.resolve(process.cwd(), 'client'), 'node_modules'],
    // },
    module: {
        rules: [],
    },
    plugins: [
        // 复制
        new CopyWebpackPlugin([
            {
                from: path
                    .join(process.cwd(), '/server/**/*')
                    .replace(/\\/gi, '/'),
                to: path
                    .join(process.cwd(), '/dist/server')
                    .replace(/\\/gi, '/'),
                transform(content, absoluteFrom) {
                    let reg = /.jsx|.js$/g;
                    if (reg.test(absoluteFrom)) {
                        return $ResolveAlias.alias(content.toString(), '');
                    }

                    return content;
                },
            },
        ]),
        new CopyWebpackPlugin([
            {
                from: path
                    .join(process.cwd(), '/client/**/*')
                    .replace(/\\/gi, '/'),
                to: path
                    .join(process.cwd(), '/dist/server')
                    .replace(/\\/gi, '/'),
                transform(content, absoluteFrom) {
                    let reg = /.jsx|.js$/g;
                    if (reg.test(absoluteFrom)) {
                        return $ResolveAlias.alias(content.toString(), '');
                    }

                    return content;
                },
            },
        ]),
    ],
};
