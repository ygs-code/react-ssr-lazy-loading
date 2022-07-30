const path = require('path');
const COMMENTED_PATTERN =
  /(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))/;
const IMPORT_PATTERNS = [
  /from (["'])(.*?)\1/g,
  /import\((["'])(.*?)\1\)/g,
  /require\((["'])(.*?)\1\)/g,
  /import\s+(["'])(.*?)\1/g
];

function parseImports(file, dir) {
  return file.flatMap((line, index) =>
    findImports(line).map((i) => ({ path: dir, index, import: i }))
  );
}

// 获取路径
function findImports(line) {
  line = line.replace(COMMENTED_PATTERN, '');
  return IMPORT_PATTERNS.flatMap((pattern) =>
    [...line.matchAll(pattern)].map((match) => match[2])
  );
}
function resolveImports(file, imports, options) {
  const { baseUrl, alias, cwd } = options;
  const aliases = {};
  for (const key in alias) {
    /* istanbul ignore else  */
    if (alias.hasOwnProperty(key)) {
      let resolved = key;
      if (key.endsWith('/*')) {
        resolved = key.replace('/*', '/');
      }
      aliases[resolved] = alias[key];
    }
  }
  const lines = [...file];
  for (const imported of imports) {
    const line = file[imported.index];
    let resolved = '';
    for (const alias in aliases) {
      /* istanbul ignore else  */
      if (aliases.hasOwnProperty(alias) && imported.import.startsWith(alias)) {
        const choices = aliases[alias];
        if (choices !== undefined) {
          resolved = choices;
          if (resolved.endsWith('/*')) {
            resolved = resolved.replace('/*', '/');
          }
          resolved = imported.import.replace(alias, resolved);
          break;
        }
      }
    }

    if (resolved.length < 1) {
      continue;
    }
    // const base = path.join(cwd, path.relative(cwd, baseUrl || './'));
    // const current = path.relative(base, path.dirname(imported.path));
    // const target = path.relative(base, resolved);
    // const relative = path.relative(current, target).replace(/\\/g, '/');
    // lines[imported.index] = line.replace(imported.import, relative);
    resolved = resolved.replace(/\\/g, '/');
    lines[imported.index] = line.replace(imported.import, resolved);
  }
  return lines;
}

const alias = ({ config, filePath, content }) => {
  let cwd = process.cwd();
  // 配置
  const compilerOptions = config.resolve;
  if (!compilerOptions.alias) {
    throw new Error(
      "Unable to find the 'alias' property in the supplied configuration!"
    );
  }
  if (
    compilerOptions.baseUrl === undefined ||
    compilerOptions.baseUrl === '.'
  ) {
    compilerOptions.baseUrl = './';
  }
  compilerOptions.cwd = cwd;
  // 文件内容
  const lines = content.toString().split('\n');
  const imports = parseImports(lines, filePath);
  if (imports.length === 0) {
    return content;
  }
  // 替换路径
  const resolved = resolveImports(lines, imports, compilerOptions);
  return Buffer.from(resolved.join('\n'));
};

// alias({
//   config: {
//     路径配置
//     resolve: {
//       alias: {
//         '@': path.join(process.cwd(), '/client')
//       }
//     }
//   },
//   filePath: 'K:/Blogs/client/a.js',
//   content: `import b from '@/b'
//     export default b`
// });

class webpackPluginResolveAlias {
  constructor(options) {
    this.options = options;
  }
  alias(content, filePath='') {
    const { resolve = {} } = this.options;
    return alias({
      config: {
        resolve
      },
      filePath,
      content
    });
  }
  // // 做兼容
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
    // 编译
    this.hook(compiler, 'emit', 'webpack-hot-plugin', (compilation) => {
      for (const name in compilation.assets) {
        if (compilation.assets.hasOwnProperty(name) && name.endsWith('.js')) {
          const contents = compilation.assets[name].source();
          const withoutComments = this.alias(contents, name);
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          };
        }
      }
    });
    // // 发送消息
    // this.hook(compiler, 'done', 'webpack-hot-plugin', (statsResult) => {
    //   this.publishStats(statsResult);
    // });
    // console.log('apply1==============')
    // this.write.call(this, data);

    // this.hook(compiler, "entryOption", () => {
    //   console.log("entryOption======== 开始");
    //   // this.write(data);
    // });

    // this.hook(compiler, "beforeCompile", () => {
    //   //编译中
    //   console.log("beforeCompile======");
    // });

    // this.hook(compiler, "shouldEmit", () => {
    //   console.log("shouldEmit==========");
    // });

    // this.hook(compiler, "assetEmitted", () => {
    //   console.log("assetEmitted==========");
    // });
    // // // // 编译完成
    // this.hook(compiler, "done", () => {
    //   console.log("done:编译完成");
    // });

    // // // 开始编译 只会调用一次
    // this.hook(compiler, "afterPlugins", () => {
    //   console.log("afterPlugins======== 开始");
    //   // this.write(data);
    // });
    // // // 开始编译
    // this.hook(compiler, "compile", () => {
    //   //编译中
    //    console.log("compile======");
    // });
    // // // 编译完成
    // this.hook(compiler, "watchRun", () => {
    //    console.log("watchRun==========");
    // });
    // // // 编译中期
    // this.hook(compiler, "invalid", () => {
    //    console.log("invalid==========");
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

module.exports = webpackPluginResolveAlias;
