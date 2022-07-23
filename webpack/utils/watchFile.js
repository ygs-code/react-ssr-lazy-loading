/*
 * @Date: 2022-05-24 15:49:12
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-24 16:05:44
 * @FilePath: /webpack-cli/watchFile.js
 * @Description:
 */
const chokidar = require('chokidar');
const path = require('path');
class watchFile {
    constructor(filepath, callback) {
        this.filepath = filepath;
        this.callback = callback;
        this.init();
    }
    init() {
        if (!this.watcher) {
            this.watcher = chokidar.watch(this.filepath);
        }
        this.watcher
            .on('add', (path_) => {
                this.addFileListener(path_);
            })
            .on('addDir', (path_) => {
                this.addDirecotryListener(path_);
            })
            .on('change', (path_) => {
                this.fileChangeListener(path_);
            })
            .on('unlink', (path_) => {
                this.fileRemovedListener(path_);
            })
            .on('unlinkDir', (path_) => {
                this.directoryRemovedListener(path_);
            })
            .on('error', (error) => {
                console.info('发生了错误：', error);
            })
            .on('ready', () => {
                // console.info('准备监听');
                this.ready = true;
            });
    }
    // 文件新增时
    addFileListener(path_) {
        if (this.ready) {
            this.callback(path_, `文件${path_}有新增`);
        }
    }
    addDirecotryListener(path_) {
        if (this.ready) {
            this.callback(path_, `目录${path_}有新增`);
        }
    }

    // 文件内容改变时
    fileChangeListener(path_) {
        if (this.ready) {
            this.callback(path_, `文件${path_}有修改`);
        }
    }

    // 删除文件
    fileRemovedListener(path_) {
        if (this.ready) {
            this.callback(path_, `文件${path_}被删除了`);
        }
    }

    // 删除目录时
    directoryRemovedListener(path_) {
        if (this.ready) {
            this.callback(path_, `目录${path_}被删除了`);
        }
    }
}

// new watchFile(
//     'C:/Users/86185/Desktop/React-universal-ssr-master/server',
//     (path) => {
//         console.log('path===', path);
//     }
// );
module.exports = watchFile;
// watch(path.join(process.cwd(), '/src'));
