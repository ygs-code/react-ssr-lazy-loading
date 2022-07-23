/*
 * @Date: 2022-05-24 15:49:12
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-24 16:05:44
 * @FilePath: /webpack-cli/watchFile.js
 * @Description:
 */
const chokidar = require('chokidar')
const path = require('path')

let watcher = null
let ready = false
const key = 'modifyFiles'
let watch = function (filepath) {
  // 文件新增时
  function addFileListener(path_) {
    if (ready) {
      console.log('文件', path_, 'has been added')
    }
  }
  function addDirecotryListener(path_) {
    if (ready) {
      console.log('目录', path_, 'has been added')
    }
  }

  // 文件内容改变时
  function fileChangeListener(path_) {
    console.log('文件', path_, '已经修改')
  }

  // 删除文件
  function fileRemovedListener(path_) {
    console.log('文件', path_, '被删除了')
  }

  // 删除目录时
  function directoryRemovedListener(path_) {
    console.info('目录', path_, '被删除了')
  }

  if (!watcher) {
    watcher = chokidar.watch(filepath)
  }
  watcher
    .on('add', addFileListener)
    .on('addDir', addDirecotryListener)
    .on('change', fileChangeListener)
    .on('unlink', fileRemovedListener)
    .on('unlinkDir', directoryRemovedListener)
    .on('error', function (error) {
      console.info('发生了错误：', error)
    })
    .on('ready', function () {
      console.info('准备监听')
      ready = true
    })
}

module.exports = watch;
watch(path.join(process.cwd(), '/src'))
 
