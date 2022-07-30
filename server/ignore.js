let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
    COMPILER_ENV,
} = process.env; // 环境参数

const isCompiler = COMPILER_ENV == 'middleware';

//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

const ignore = () => {
    // console.log('isCompiler========', isCompiler);
    // console.log('COMPILER_ENV========', COMPILER_ENV);

    var extensions = isCompiler
        ? []
        : ['.css', '.scss', '.less', '.png', '.jpg', '.gif', '.svg']; //服务端渲染不加载的文件类型
    for (let i = 0, len = extensions.length; i < len; i++) {
        require.extensions[extensions[i]] = function () {
            return false;
        };
    }
};
module.exports = ignore;
