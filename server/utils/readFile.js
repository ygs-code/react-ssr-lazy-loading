/*
 * @Date: 2022-05-11 11:23:58
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-11 11:44:42
 * @FilePath: /webpack-cli/delete_node_modules.js
 * @Description:
 */
var fs = require("fs");
var path = require("path");
const { readdirSync, stat, statSync } = fs;
const readFile = (path, callback = () => {}) => {
  var files = readdirSync(path);
  files.forEach((item, index) => {
    var reg = /(\\\\)|(\\)/g;
    var src = path + "/" + item;
    src = src.replace(reg, "/");
    var stat = statSync(src);
    if (stat.isDirectory()) {
      //递归读取文件
      readFile(src, callback);
    } else if (stat.isFile()) {
      callback({
        path: src,
        filename: item
      });
    }
  });
};
module.exports = readFile;

// readFile(path.join(process.cwd(), '../../../node_modules'),(value)=>{
//    console.log('value=',value)
// });
