/**
 * 删除 css 的引入
 * 可能社区已经有现成的插件但是不想费劲儿找了，还是自己写一个吧。 
 */
 module.exports = function ({ types: babelTypes }) {
    return {
        name: "no-require-css",
        visitor: {
            ImportDeclaration(path, state) {
                let importFile = path.node.source.value;
                if(importFile.indexOf('.scss')>-1){
                    // 干掉css 导入
                    path.remove();
                }
            }
        }
    };
};
