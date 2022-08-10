/*
 * @Date: 2022-08-10 18:46:38
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-10 19:45:14
 * @FilePath: /react-loading-ssr/.prettierrc.js
 * @Description:
 */
module.exports = {
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      parser: 'flow',
    },
  ],
  singleQuote: false, // 使用单引号
  jsxSingleQuote: false, // jsx中使用单引号
  //   semi: false, // 不加分号
  //   trailingComma: 'none', // 结尾处不加逗号
  //   htmlWhitespaceSensitivity: 'ignore', // 忽略'>'下落问题
  //   printWidth: 1800, //单行长度
  //   tabWidth: 1000, //缩进长度
  //   useTabs: false, //使用空格代替tab缩进
  //   semi: true, //句末使用分号
  //   singleQuote: true, //使用单引号
  //   quoteProps: 'as-needed', //仅在必需时为对象的key添加引号

  //   trailingComma: 'all', //多行时尽可能打印尾随逗号
  //   bracketSpacing: true, //在对象前后添加空格
  //   jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  //   arrowParens: 'always', //单参数箭头函数参数周围使用圆括号
  //   requirePragma: false, //无需顶部注释即可格式化
  //   insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  //   htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  //   vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  //   endOfLine: 'lf', //结束行形式
  //   embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
  //   'prettier.proseWrap': 'preserve', // 是否要换行
  //   'vetur.format.defaultFormatter.js': 'prettier', // vetur 使用 prettier格式化代码
  //   'prettier.printWidth': 30, // 超过最大值换行

  //   'prettier.tabWidth': 2, // 缩进字节数

  //   'prettier.useTabs': false, // 缩进不使用tab，使用空格

  //   'prettier.semi': false, // 句尾添加分号

  //   'prettier.singleQuote': false, // 使用单引号代替双引号

  //   'prettier.proseWrap': 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行

  //   'prettier.arrowParens': 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号

  //   'prettier.bracketSpacing': true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"

  //   'prettier.endOfLine': 'auto', // 结尾是 \n \r \n\r auto

  //   'prettier.eslintIntegration': false, //不让prettier使用eslint的代码格式进行校验

  //   'prettier.htmlWhitespaceSensitivity': 'ignore',

  //   'prettier.ignorePath': '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中

  //   'prettier.jsxBracketSameLine': false, // 在jsx中把'>' 单独放一行

  //   'prettier.jsxSingleQuote': false, // 在jsx中使用单引号代替双引号

  //   'prettier.parser': 'babylon', // 格式化的解析器，默认是babylon

  //   'prettier.requireConfig': false, // Require a 'prettierconfig' to format prettier

  //   'prettier.stylelintIntegration': false, //不让prettier使用stylelint的代码格式进行校验

  //   'prettier.trailingComma': 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）

  //   'prettier.tslintIntegration': false, // 不让prettier使用tslint的代码格式进行校验
}
