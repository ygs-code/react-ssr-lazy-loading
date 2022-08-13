var fs = require("fs");
var path = require("path");
var glob = require("glob");

class CopyFile {
  constructor() {}
  writeFile(path, content) {
    path = this.transformPath(path);
    // 写入文件
    fs.writeFileSync(path, content);
  }
  statSync(path) {
    path = this.transformPath(path);
    let stats = fs.statSync(path);
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

  // 获取匹配到的文件 比如 /**/*.js 返回一个数组文件
  getFiles(path) {
    path = this.transformPath(path);
    return glob.sync(path);
  }
  // 复制 /**/ /* /**/*/  文件
  globPathCopyFile(from, to, transform = (data) => data) {
    let cacheDirectory = new Map();
    to = this.transformPath(to);
    from = this.transformPath(from);
    let files = this.getFiles(from);
    let reg1 = /\*\*/;
    let reg2 = /\*/;
    let prefixFrom = "";
    if (reg1.test(from)) {
      prefixFrom = from.match(/[\w\W]+(?=\/\*\*)/g)[0];
    } else if (reg2.test(from)) {
      prefixFrom = from.match(/[\w\W]+(?=\/\*)/g)[0];
    }
    prefixFrom = prefixFrom.split("/");
    prefixFrom = prefixFrom.slice(0, -1);
    prefixFrom = prefixFrom.join("/");
    for (let item of files) {
      let stat = this.statSync(item);
      let $path = "";
      if (stat.isFile()) {
        let $filePath = to + item.replace(prefixFrom, "");
        let filePaths = $filePath.split("/");
        let content = this.readFile(item);
        for (let [index, path] of filePaths.entries()) {
          $path += index == 0 ? path : "/" + path;
          if (cacheDirectory.has($path)) {
            continue;
          }
          cacheDirectory.set($path, true);
          if (index == filePaths.length - 1) {
            this.writeFile($filePath, transform(content, $filePath));
          } else {
            this.checkDirectory($path);
          }
        }
      } else if (stat.isDirectory()) {
        let directoryPath = to + item.replace(prefixFrom, "");
        directoryPath = directoryPath.split("/");
        for (let [index, path] of directoryPath.entries()) {
          $path += index == 0 ? path : "/" + path;
          if (cacheDirectory.has($path)) {
            continue;
          }
          cacheDirectory.set($path, true);
          this.checkDirectory($path);
        }
      }
    }
  }
  copyFile(from, to, transform = (data) => data) {
    let reg = /\*/g;
    if (reg.test(from)) {
      this.globPathCopyFile(from, to, transform);
      return false;
    }

    from = this.transformPath(from);
    to = this.transformPath(to);

    this.checkDirectory(to, () => {
      let paths = fs.readdirSync(from); //同步读取当前目录
      paths.forEach((path) => {
        var _from = from + "/" + path;
        _from = this.transformPath(_from);
        var _to = to + "/" + path;
        _to = this.transformPath(_to);
        fs.stat(_from, async (err, stats) => {
          //stats 该对象 包含文件属性
          if (err) {
            throw err;
          }
          if (stats.isFile()) {
            //如果是个文件则拷贝
            let content = this.readFile(_from);
            this.writeFile(_to, transform(content, _to));
            //  let readable = fs.createreadstream(_from); //创建读取流
            // let writable = fs.createwritestream(_to); //创建写入流
            // readable.pipe(writable);
          } else if (stats.isDirectory()) {
            //是目录则 递归
            this.copyFile(_from, _to, transform);
          }
        });
      });
    });
  }
}

// new CopyFile().copyFile(
//     path.join(process.cwd(), 'webpack/definePlugin/**/*'),
//     path.join(process.cwd(), '/webpack/newDefinePlugin'),
//     (value) => {
//         return value;
//     }
// );

module.exports = (from, to, transform = (data) => data) => {
  return new CopyFile().copyFile(from, to, transform);
};
