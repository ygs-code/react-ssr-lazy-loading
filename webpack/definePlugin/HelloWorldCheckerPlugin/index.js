const fs = require('fs');
const path = require('path');

class HelloWorldCheckerPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.plugin('make', (compilation, cb) =>
            this._make(compilation, cb)
        );
    }

    _make(compilation, cb) {
        // compilation.errors.push('路由重名错误');
        cb()
        // try {
        //     const file = fs.readFileSync(path.resolve('/', this.options.path), 'utf8');
        //     if (file.includes('Hello World!')) {
        //         console.log(`The file ${this.options.path} contains 'Hello World!' string`);
        //     } else {
        //         console.log(`The file ${this.options.path} doesn't contain 'Hello World!' string`)
        //     }
        //     cb();
        // } catch (e) {
        //     compilation.errors.push('路由重名错误');
        //     cb();
        // }
    }
}

module.exports = HelloWorldCheckerPlugin;
