/*
 * @Date: 2022-04-28 10:55:26
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-07-04 13:36:09
 * @FilePath: /webpack-cli/user-webpack-config/definePlugin/MyExampleWebpackPlugin.js
 * @Description:
 */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const {readFile} = require('../../utils');
const dataDiff = require('./diff');

class WebpackPluginRouter {
    constructor(options) {
        this.options = options;
        this.routesConfigs = [];
        this.startTime = null;
        this.compilerFile();
    }

    // 节流函数
    throttle(time, callback = () => {}) {
        let nowTime = new Date().getTime();
        if (!this.startTime || nowTime - this.startTime > time) {
            this.startTime = nowTime;
            if (callback && callback instanceof Function) {
                callback();
            }
        }
    }

    firstToUpper(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    writeImportRoutesConfig(routesConfig) {
        return routesConfig.reduce((acc, item, index) => {
            let { path, name, entry, exact, children = [] } = item;
            path = path.split(/\/src\//g)[1];
            let fileName = path.split(/\//g);
            fileName = fileName
                .map((item, index) => {
                    return index == 0 ? item : this.firstToUpper(item);
                })
                .join('');
            fileName = fileName.replace(/\.js$/g, '');
            acc += `import ${fileName} from '@/${path}';\n`;
            return acc;
        }, '');
    }
    writeLoadableComponent(routesConfig) {
        return routesConfig.reduce((acc, item, index) => {
            const { path, name, entry, exact, children = [] } = item;
            if (children && children.length) {
                acc += this.writeLoadableComponent(children);
            }
            acc += `
// 路由组件引入
const Loadable${this.firstToUpper(name)} = loadable({
  loader: () => import('@${entry}'),
  loading: Loading,
});
  `;
            return acc;
        }, '');
    }

    writeRoutesComponentConfig(routesConfig, parentPath) {
        return routesConfig.reduce((acc, item, index) => {
            const { path, name, entry, exact, children = [] } = item;
            if (children && children.length) {
                acc += this.writeRoutesComponentConfig(
                    children,
                    parentPath ? parentPath + path : path
                );
            }
            acc += `
                {  
                 path: '${parentPath ? parentPath + path : path}',
                 exact: ${exact ? true : false},
                 name:'${name}',
                 entry:'${entry}',
                 Component:  Loadable${this.firstToUpper(name)}
               },`;
            return acc;
        }, '');
    }

    writeFile(routesConfigs) {
        let file = `
// 按需加载插件
import loadable from 'react-loadable';
import Loading from '@/component/Loading';
import RouterAddApi from '@/router/RouterAddApi';
import React, { useEffect } from 'react';
`;

        file += this.writeImportRoutesConfig(routesConfigs);

        for (let item of routesConfigs) {
            const { config = [] } = item;
            file += this.writeLoadableComponent(config);
        }

        file += `let routesComponentConfig=[`;

        for (let item of routesConfigs) {
            const { config = [] } = item;
            file += this.writeRoutesComponentConfig(config);
        }

        file += `
    ]`;

        file += `

export default routesComponentConfig;
        `;

        fs.writeFileSync(
            path.join(process.cwd(), '/src/router/routesComponent.js'),
            file
        );
    }

    compilerFile() {
        this.throttle(2000, () => {
            let routesConfigs = [];
            readFile(path.join(process.cwd(), '/src'), (value) => {
                const { path, filename } = value;
                if (filename === 'routesConfig.js') {
                    const content = require(path).default;
                    routesConfigs.push({
                        path,
                        config: content,
                    });
                    delete require.cache[require.resolve(path)];
                }
            });
            
            if (!dataDiff(routesConfigs, this.routesConfigs)) {
                this.routesConfigs = _.cloneDeep(routesConfigs);
                this.writeFile(routesConfigs);
            }
        });
    }
    //   做兼容
    hook(compiler, hookName, pluginName, fn) {
        if (arguments.length === 3) {
            fn = pluginName;
            pluginName = hookName;
        }
        if (compiler.hooks) {
            compiler.hooks[hookName].tap(pluginName, fn);
        } else {
            compiler.plugin(pluginName, fn);
        }
    }

    apply(compiler) {
        // this.hook(compiler, "someHook", () => {
        //   console.log("someHook======== 开始");
        // });
        // webpack  处理webpack选项的条目配置后调用。 只编译一次
        this.hook(compiler, 'entryOption', () => {
            this.compilerFile();
            // console.log('entryOption========');
        });
        this.hook(compiler, 'watchRun', () => {
            this.compilerFile();
            // console.log('entryOption========');
        });

        // compiler.hooks.emit.tapAsync('entryOption', (compilation, callback) => {
        //     // console.log('watchRun==========');
        //     this.compilerFile();
        //     callback();
        // });

        // compiler.hooks.emit.tapAsync('watchRun', (compilation, callback) => {
        //     // console.log('watchRun==========');
        //     this.compilerFile();
        //     callback();
        // });


        // // 创建编译参数后执行插件。执行多次
        // this.hook(compiler, 'beforeCompile', () => {
        //     //编译中
        //     console.log('beforeCompile======');
        // });

        // this.hook(compiler, 'shouldEmit', () => {
        //     console.log('shouldEmit==========');
        // });

        // // this.hook(compiler, 'assetEmitted', () => {
        // //     // console.log('assetEmitted==========');
        // // });
        // //  编译完成 回调一次
        // this.hook(compiler, 'done', () => {
        //     console.log('done:编译完成');
        // });

        // //  在设置初始的内部插件集之后调用。 只会调用一次
        // this.hook(compiler, 'afterPlugins', () => {
        //     console.log('afterPlugins======== 开始');
        // });

        // // 在解析器安装完成后触发。只会调用一次
        // this.hook(compiler, 'afterResolvers', () => {
        //     console.log('afterResolvers======== 开始');
        // });
        // 编译
        // this.hook(compiler, 'compile', () => {
        //     //编译中
        //     console.log('compile======');
        // });

        // 监听编译 每次文件改动只编译一次
        // this.hook(compiler, 'watchRun', () => {
        //     console.log('watchRun==========');
        // });

        // compiler.hooks.emit.tapPromise('watchRun', (compiler) => {
        //     return new Promise((resolve) => setTimeout(resolve, 10000)).then(
        //         () => {
        //             console.log('以具有延迟的异步方式触及 run 钩子');
        //         }
        //     );
        // });

      
        //    当监视编译无效时执行。此钩子不会复制到子编译器。
        // this.hook(compiler, 'invalid', () => {
        //     console.log('invalid==========');
        // });

        //   compiler.hooks.compile.tap("MyPlugin", (params) => {
        //     console.log("以同步方式触及 compile 钩子。");
        //   });

        //   compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
        //   console.log("以异步方式触及 run 钩子。");
        //    在生成文件中，创建一个头部字符串：
        //   var filelist = "In this build:\n\n";
        //   for (var filename in compilation.assets) {
        //     filelist += "- " + filename + "\n";
        //   }
        //   // 将这个作为一个新的文件资源，插入到 webpack 构建中：
        //   // 写入一个新文件
        //   compilation.assets["filelist.md"] = {
        //     source: function () {
        //       return filelist;
        //     },
        //     size: function () {
        //       return filelist.length;
        //     },
        //   };
        //   callback();
        // });

        // compiler.hooks.emit.tapPromise("MyPlugin", (compiler) => {
        //   return new Promise((resolve) => setTimeout(resolve, 10000)).then(() => {
        //     console.log("以具有延迟的异步方式触及 run 钩子");
        //   });
        // });
    }
}

module.exports = WebpackPluginRouter;
