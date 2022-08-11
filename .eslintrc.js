/*
 * @Date: 2022-05-09 11:13:39
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 20:01:55
 * @FilePath: /react-loading-ssr/.eslintrc.js
 * @Description:
 */
// 配置： https://eslint.bootcss.com/
module.exports = {
  root: true, // 当前项目使用这个配置文件, 不会往父级目录找.eslintrc.js文件

  env: {
    // 指定eslint启动环境(node支持), browser: true也可以在浏览器设置
    node: true,
    commonjs: true,
    amd: true,
    es6: true,
    mocha: true,
    browser: true,
    es2021: true
  },
  plugins: ["react", "jsx-a11y", "import", "@babel", "react-hooks", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    // parser: "@babel/eslint-parser",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    // 'prettier',
    "plugin:prettier/recommended"
    // "airbnb"
    // "airbnb/hooks"
  ],

  settings: { react: { pragma: "React", version: "15.6.1" } },

  // 这里可以进行自定义规则配置
  // key：规则代号
  // value：具体的限定方式
  //   "off" or 0 - 关闭规则
  //   "warn" or 1 - 将规则视为一个警告（不会影响退出码）,只警告，不会退出程序
  //   "error" or 2 - 将规则视为一个错误 (退出码为1)，报错并退出程序
  rules: {
    "no-constant-condition": 2, //禁止在条件中使用常量表达式 if(true) if(1)
    "no-lonely-if": 1, //禁止else语句内只有if语句
    curly: [2, "all"], //必须使用 if(){} 中的{}
    "guard-for-in": 1, //for in循环要用if语句过滤
    "no-else-return": 2, // 禁止 if 语句中 return 语句之后有 else 块。如果 if 块中包含了一个 return 语句，else 块就成了多余的了。可以将其内容移至块外。例：// incorrect function foo() {     if (x) {         return y;     } else {         return z;     } } // correct function foo() {     if (x) {         return y;     }     return z; } 复制代码
    // "wrap-iife": 1, // 要求 IIFE 使用括号括起来。你可以立即调用函数表达式，而不是函数声明。创建一个立即执行函数 (IIFE) 的一个通用技术是用括号包裹一个函数声明。括号内的函数被解析为一个表达式，而不是一个声明。
    "@babel/object-curly-spacing": "off",
    "prettier/prettier": 2,
    "no-debugger": 0,
    "react/prop-types": 0,
    "no-prototype-builtins": 0,
    // "react/jsx-uses-vars": 2,
    // "react/jsx-uses-react": 2, // 屏蔽"React" is defined but never used错误
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    // "react/display-name": 1,
    "react/display-name": 0,
    "no-unused-vars": "warn",
    "no-console": 0,
    "no-unexpected-multiline": "warn",
    // // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
    // 'no-multiple-empty-lines': 'off', // 不允许有连续多行空行(关闭规则)
    "no-undef": 1, // 不能有未定义的变量
    eqeqeq: ["warn", "always"], //  == 判断
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'no-void': 2, //禁用void操作符
    "@babel/new-cap": "warn",
    "@babel/no-invalid-this": "warn",
    "@babel/no-unused-expressions": 0,
    "@babel/semi": "warn",
    // 禁止不必要的转义字符
    "no-useless-escape": 1,
    // "comma-dangle": ["off"], // 不允许最后多余的逗号
    "react-hooks/rules-of-hooks": "warn", // 检查Hook的规则
    "max-params": ["warn", 8], // 方法最多8个参数
    "react-hooks/exhaustive-deps": 0, // 检查effect的依赖
    "max-nested-callbacks": ["warn", 4], // 循环最多4层，超过4层警告
    "brace-style": ["off", "1tbs"],
    "react/no-string-refs": "warn", // string类型的refs报warn
    "no-unreachable-loop": "off",
    "eol-last": ["error", "always"], // 文件末尾需要多空一行
    "react/no-children-prop": 1,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [1, "never"],
    // 控制逗号前后的空格
    "comma-spacing": [1, { before: false, after: true }],
    // 控制逗号在行尾出现还是在行首出现
    // http://eslint.org/docs/rules/comma-style
    "comma-style": [1, "last"],
    "no-trailing-spaces": 1, // 一行结束后面不要有空格
    "no-unreachable": 2, // 不能有无法执行的代码
    "no-native-reassign": 2, // 不能重写native对象
    "no-const-assign": 2, // 禁止修改const声明的变量
    "no-dupe-keys": 2 // 在创建对象字面量时不允许键重复 {a:1,a:1}
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
  }
};
