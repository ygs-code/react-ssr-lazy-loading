/*
 * @Date: 2022-08-09 09:35:04
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-09 13:52:05
 * @FilePath: /react-loading-ssr/bin/index.js
 * @Description:
 */
import cluster from 'cluster';
import path from 'path';
import os from 'os';
import { Worker } from 'worker_threads';
import { copyFile, watchFile, readWriteFiles } from '../webpack/utils';
import { spawn, SpawnOptions } from 'child_process';
import kill from 'kill-port'; // 杀死端口包
import { execute, iSportTake } from './cmd'; // 杀死端口包
import { stabilization } from '../client/utils';
import ResolveAlias from '../webpack/definePlugin/webpack-plugin-resolve-alias';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// 如果是开发环境 先拷贝 服务器文件到 dist
let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
    port,
} = process.env; // 环境参数

const isSsr = target === 'ssr';
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

console.log('NODE_ENV======', NODE_ENV);

let counter = 0;
let child = null;
if (isEnvDevelopment && isSsr) {
    let $ResolveAlias = new ResolveAlias({
        resolve: {
            // 路径配置
            alias: {
                '@/': path.join(process.cwd(), '/client'),
            },
        },
    });

    readWriteFiles({
        from: path.join(process.cwd(), '/server/**/*').replace(/\\/gi, '/'),
        to: path.join(process.cwd(), '/dist/server').replace(/\\/gi, '/'),
        transform(content, absoluteFrom) {
            let reg = /.jsx|.js$/g;
            if (reg.test(absoluteFrom)) {
                return $ResolveAlias.alias(content.toString(), '');
            }
            return content;
        },
        async callback() {
            if (child) {
                // spawn 杀死正在执行的子进程
                spawn('kill', [child.pid]);
            }

            if (iSportTake(port)) {
                await kill(port, 'tcp');
            }
            stabilization(500, async () => {
                counter += 1;
                if (counter === 1) {
                    child = execute(
                        "cross-env target='ssr'  npx babel-node  -r  @babel/register    ./server/index.js   -r    dotenv/config   dotenv_config_path=.env.development"
                    );
                } else {
                    child = execute('npm run bin');
                    counter = 0;
                }
            });
        },
    });
}

// if (isEnvDevelopment && !isSsr) {
//     execute(process.platform === 'win32' ? 'npm.cmd' : 'npm', [
//         'run',
//         'ssr:dev',
//     ]);
// }
