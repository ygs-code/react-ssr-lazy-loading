var fs = require("fs");
var path = require("path");
var glob = require("glob");

class WriteFile {
  constructor() {}
  writeFile(path, content) {
    path = this.transformPath(path);
    // 写入文件
    fs.writeFileSync(path, content);
  }
  statSync(path) {
    path = this.transformPath(path);
    let stats = {};
    try {
      stats = fs.statSync(path);
    } catch (error) {
      stats = null;
    }
    // stats.isFile()
    // stats.isDirectory()
    return stats;
  }
  readFile(path) {
    // 读取文件
    path = this.transformPath(path);
    return fs.readFileSync(path, "UTF-8");
  }

  // 转换路径
  transformPath(path) {
    let reg = /(\\\\)|(\\)/g;
    return path.replace(reg, "/");
  }
  //判断文件夹是否存在
  existsSync(path) {
    path = this.transformPath(path);

    return fs.existsSync(path);
  }
  // 创建目录
  mkdir(path) {
    path = this.transformPath(path);
    return fs.mkdirSync(path);
  }

  // 检测目录如果不存在则创建
  checkDirectory(path, callback = () => {}) {
    path = this.transformPath(path);
    if (!this.existsSync(path)) {
      //不存在则写入创建努力
      this.mkdir(path);
      callback();
    } else {
      callback();
    }
  }

  init(path, content) {
    path = path.split("/");
    let paths = path.filter((item) => item !== "");
    let $path = "";
    for (let [index, path] of paths.entries()) {
      $path += index == 0 && this.statSync(path) ? path : "/" + path;
      let stat = this.statSync($path);
      // 最后一个
      if (index == paths.length - 1) {
        this.writeFile($path, content);
      } else if (!stat || (stat && !stat.isDirectory())) {
        this.checkDirectory($path);
      }
    }
  }
}

module.exports = (path, content) => {
  return new WriteFile().init(path, content);
};
