/*
 * @Date: 2022-08-10 18:46:38
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 14:11:02
 * @FilePath: /react-loading-ssr/.prettierrc.js
 * @Description:
 */
module.exports = {
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  quoteProps: "as-needed", //仅在必需时为对象的key添加引号
  singleQuote: false, // 使用单引号代替双引号
  semi: true, // 句尾添加分号
  trailingComma: "none", // 结尾处不加逗号
  // trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  printWidth: 80, //   指定每行代码的最佳长度， 如果超出长度则换行。
  tabWidth: 2, //缩进长度
  useTabs: false, // 缩进不使用tab，使用空格
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 { foo: bar }
  // 如果为 true，则将多行jsx元素的 `>` 放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: true,
  // arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  // 指定 prettier 的换行符
  endOfLine: "auto", // 结尾是 \n \r \n\r auto
  stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
  eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
  // proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  // htmlWhitespaceSensitivity: 'ignore',
  // ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  // parser: 'babylon', // 格式化的解析器，默认是babylon
  // requireConfig: false, // Require a 'prettierconfig' to format prettier
  // 当箭头函数仅有一个参数时加上括号
  arrowParens: "always",
  // Path to the prettier configuration file
  configPath: "",
  // This feature is no longer supported. Instead, configure VS Code [default formatters](https://github.com/prettier/prettier-vscode#default-formatter) or use .prettierignore.
  // 用于禁用此扩展的语言ID列表
  disableLanguages: [],
  // A list of [glob patterns](https://code.visualstudio.com/api/references/vscode-api#GlobPattern) to register Prettier formatter
  documentSelectors: [],
  // Control whether Prettier formats quoted code embedded in the file.
  embeddedLanguageFormatting: "auto",
  // Controls whether prettier is enabled or not.
  enable: true,
  // Enable debug logs for troubleshooting.
  enableDebugLogs: false,
  // 指定HTML文件的全局空白区域敏感度。
  // 有效选项：
  //  'css' - 尊重CSS显示属性的默认值。
  //  'strict' - 空格被认为是敏感的。
  //  'ignore' - 空格被认为是不敏感的。
  htmlWhitespaceSensitivity: "css",
  //   // .prettierignore或类似文件的路径
  //  ignorePath: .prettierignore,
  // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier. This works well when used in tandem with the `--require-pragma` option. If there is already a docblock at the top of the file then this option will add a newline to it with the @format marker.
  insertPragma: false,
  // Package manager is now automatically detected by VS Code. This setting is no longer used.
  // The package manager you use to install node modules.
  packageManager: "npm",
  // Path to the prettier module
  prettierPath: "",
  // （Markdown）将散文包含在多行中
  proseWrap: "preserve",
  // 需要 prettier configuration 来格式化
  requireConfig: true,
  // Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file. This is very useful when gradually transitioning large, unformatted codebases to prettier.
  requirePragma: false,
  // When enabled, this extension will attempt to use global npm or yarn modules if local modules cannot be resolved.
  // > _This setting can have a negative performance impact, particularly on Windows when you have attached network drives. Only enable this if you must use global modules._
  resolveGlobalModules: false,
  // Whether or not to take `.editorconfig` into account when parsing configuration. See the [prettier.resolveConfig](https://prettier.io/docs/en/api.html) docs for details.
  useEditorConfig: true,
  // Whether or not to indent the code inside `<script>` and `<style>` tags in Vue files. Some people (like the creator of Vue) don’t indent to save an indentation level, but this might break code folding in your editor.
  vueIndentScriptAndStyle: false,
  // If true, this extension will process files in node_modules
  withNodeModules: false
};
