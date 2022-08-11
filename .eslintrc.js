/*
 * @Date: 2022-05-09 11:13:39
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 10:54:21
 * @FilePath: /react-loading-ssr/.eslintrc.js
 * @Description:
 */
//配置： https://eslint.bootcss.com/
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
  ],

  settings: { react: { pragma: "React", version: "15.6.1" } },

  // 这里可以进行自定义规则配置
  // key：规则代号
  // value：具体的限定方式
  //   "off" or 0 - 关闭规则
  //   "warn" or 1 - 将规则视为一个警告（不会影响退出码）,只警告，不会退出程序
  //   "error" or 2 - 将规则视为一个错误 (退出码为1)，报错并退出程序
  rules: {
    "@babel/object-curly-spacing": "off",
    "prettier/prettier": 2,
    "no-debugger": 0,
    "react/prop-types": 0,
    "no-prototype-builtins": 0,
    "react/jsx-uses-vars": 1,
    "react/display-name": 1,
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-unexpected-multiline": "warn",
    // // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
    // 'no-multiple-empty-lines': 'off', // 不允许有连续多行空行(关闭规则)
    "no-undef": 1, //不能有未定义的变量
    eqeqeq: ["error", "always"],
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'no-void': 2, //禁用void操作符
    "@babel/new-cap": "warn",
    "@babel/no-invalid-this": "warn",
    "@babel/no-unused-expressions": "warn",
    "@babel/semi": "warn",
    // 禁止不必要的转义字符
    "no-useless-escape": 1,
    "react/jsx-uses-react": 2, // 屏蔽"React" is defined but never used错误
    "comma-dangle": ["off"], // 不允许最后多余的逗号
    "react-hooks/rules-of-hooks": "warn", // 检查Hook的规则
    "max-params": ["warn", 8], // 方法最多8个参数
    "react-hooks/exhaustive-deps": "warn", // 检查effect的依赖
    "max-nested-callbacks": ["warn", 4], // 循环最多4层，超过4层警告
    "brace-style": ["off", "1tbs"],
    "react/no-string-refs": "warn", // string类型的refs报warn
    "no-unreachable-loop": "off",
    "eol-last": ["error", "always"], // 文件末尾需要多空一行
    // 先off掉
    "react-hooks/exhaustive-deps": "warn", // 检查effect的依赖
    "react/no-children-prop": 1,
    eqeqeq: 1,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [1, "never"],
    // 控制逗号前后的空格
    "comma-spacing": [1, { before: false, after: true }],
    // 控制逗号在行尾出现还是在行首出现
    // http://eslint.org/docs/rules/comma-style
    "comma-style": [1, "last"]
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
  }
};
