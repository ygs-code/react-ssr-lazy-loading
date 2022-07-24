/*
 * @Date: 2022-05-09 11:13:39
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-07-04 12:57:04
 * @FilePath: /webpack-cli/.eslintrc.js
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
    es2021: true,
  },
  plugins: ['react', 'jsx-a11y', 'import', '@babel'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    // parser: "@babel/eslint-parser",
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],

  settings: { react: { pragma: 'React', version: '15.6.1' } },

  // 这里可以进行自定义规则配置
  // key：规则代号
  // value：具体的限定方式
  //   "off" or 0 - 关闭规则
  //   "warn" or 1 - 将规则视为一个警告（不会影响退出码）,只警告，不会退出程序
  //   "error" or 2 - 将规则视为一个错误 (退出码为1)，报错并退出程序
  rules: {
    'no-prototype-builtins': 0,
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'react/display-name': 1,
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-unexpected-multiline': 'warn',
    // // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
    // 'no-multiple-empty-lines': 'off', // 不允许有连续多行空行(关闭规则)
    // 'no-undef': 1, //不能有未定义的变量
    eqeqeq: ['error', 'always'],
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-undef': 'error',
    // 'no-void': 2, //禁用void操作符
    '@babel/new-cap': 'error',
    '@babel/no-invalid-this': 'error',
    '@babel/no-unused-expressions': 'error',
    '@babel/object-curly-spacing': 'error',
    '@babel/semi': 'error',
  },
}
