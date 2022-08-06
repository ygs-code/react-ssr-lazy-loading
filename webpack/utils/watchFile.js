/*
 * @Date: 2022-05-24 15:49:12
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-06 16:31:33
 * @FilePath: /react-loading-ssr/webpack/utils/watchFile.js
 * @Description:
 */
const chokidar = require('chokidar');
const path = require('path');

class watchFile {
    constructor(filepath, callback) {
        this.filepath = filepath;
        this.callback = callback;
        try {
            this.init();
        } catch (error) {}
    }
    init() {
        if (!this.watcher) {
            this.watcher = chokidar.watch(this.filepath);
        }
        this.watcher
            .on('add', (path) => this.addFileListener(path))
            .on('addDir', (path) => this.addDirecotryListener(path))
            .on('change', (path) => this.fileChangeListener(path))
            .on('unlink', (path) => this.fileRemovedListener(path))
            .on('unlinkDir', (path) => this.directoryRemovedListener(path))
            .on('error', (error) => {
                // console.info('watchFile error：', error);
            })
            .on('ready', () => {
                // console.info('准备监听');
                this.ready = true;
            });
    }
    // 转换路径
    transformPath(path) {
        let reg = /(\\\\)|(\\)/g;
        return path.replace(reg, '/');
    }
    // 文件新增时
    addFileListener(path) {
        path = this.transformPath(path);
        if (this.ready) {
            this.callback({
                path,
                message: `文件${path}有新增`,
                type: 'file',
                action: 'add',
            });
        }
    }

    // 文件内容改变时
    fileChangeListener(path) {
        path = this.transformPath(path);
        if (this.ready) {
            this.callback({
                path,
                message: `文件${path}有修改`,
                type: 'file',
                action: 'change',
            });
        }
    }

    // 删除文件
    fileRemovedListener(path) {
        path = this.transformPath(path);
        if (this.ready) {
            this.callback({
                path,
                message: `文件${path}被删除了`,
                type: 'file',
                action: 'delete',
            });
        }
    }

    // 添加目录
    addDirecotryListener(path) {
        path = this.transformPath(path);
        if (this.ready) {
            this.callback({
                path,
                message: `目录${path}有新增`,
                type: 'directory',
                action: 'add',
            });
        }
    }
    // 删除目录时
    directoryRemovedListener(path) {
        path = this.transformPath(path);
        if (this.ready) {
            this.callback({
                path,
                message: `目录${path}被删除了`,
                type: 'directory',
                action: 'delete',
            });
        }
    }
}

// new watchFile(
//     'C:/Users/86185/Desktop/React-universal-ssr-master/server',
//     (value) => {
//         // console.log('path===', path);
//         console.log('value===', value);
//     }
// );
module.exports = watchFile;
// watch(path.join(process.cwd(), '/src'));
