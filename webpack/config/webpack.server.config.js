const CopyPlugin = require('copy-webpack-plugin');
const ResolveAlias = require('../definePlugin/webpack-plugin-resolve-alias');

const path = require('path');

let $ResolveAlias = new ResolveAlias({
    resolve: {
        // 路径配置
        alias: {
            '@/': path.join(process.cwd(), '/dist/server/src/'),
        },
    },
});

let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
} = process.env; // 环境参数

htmlWebpackPluginOptions = (() => {
    const regex = /(?<=\{)(.+?)(?=\})/g; // {} 花括号，大括号
    htmlWebpackPluginOptions = htmlWebpackPluginOptions.match(regex);
    if (htmlWebpackPluginOptions) {
        htmlWebpackPluginOptions = htmlWebpackPluginOptions[0];
        let htmlWebpackPluginOptionsArr = htmlWebpackPluginOptions.split(',');
        htmlWebpackPluginOptions = {};
        for (let item of htmlWebpackPluginOptionsArr) {
            let [key, value] = item.split(':');
            htmlWebpackPluginOptions[`${key}`] = value;
        }
    } else {
        htmlWebpackPluginOptions = {};
    }
    return htmlWebpackPluginOptions;
})();

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
    // context: path.join(process.cwd(), '/src'),
    entry: {
        test: path.join(process.cwd(), '/server/test.js'),
    },
    output: {
        path: path.join(process.cwd(), '/dist/server'),
        filename: '[name].js',
        chunkFilename: '[name][contenthash].js',

        // filename: 'static/[name].[hash:8].js',
        // path: path.resolve(process.cwd(), './dist/web'),
        // publicPath: '/',
        // chunkFilename: 'static/[name]-[hash:8].js',
        // libraryTarget: isServer?'commonjs2':'umd',
    },
    // resolve: {
    //     // 路径配置
    //     alias: {
    //         '@': path.join(process.cwd(), '/src'),
    //     },
    //     extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.png', '.jpg'],
    //     modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
    // },
    module: {
        rules: [],
    },
    plugins: [
        // 复制
        new CopyPlugin([
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
        new CopyPlugin([
            {
                from: path
                    .join(process.cwd(), '/src/**/*')
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
