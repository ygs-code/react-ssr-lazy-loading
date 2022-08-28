import XMLHttpRequest from "./XMLHttpRequest";
import baseUrl from "./baseUrl";
import { codeMap } from "./redirect";
import token from "./token";
import filterGraphqlData from "./filterGraphqlData";
import {
  error as errorMessage
  // warning as warningMessage,
  // success as successMessage
} from "./requestMessage";

// 导出普通请求
export default class Request {
  static platform = "web"; // smallProgram 小程序 , web 网页

  static baseUrl = "";

  // 请求队列
  static requestQueue = [];

  // 默认请求头设置
  static defaultHeaders = {};

  // 错误拦截
  static error() {}

  // 请求拦截器
  static interceptors = {
    request: (config) => config,
    response: (response) => response
  }; //

  // 去除 // 地址
  static transformUrl(baseUrl, url) {
    /* eslint-disable   */
    const urlHpptReg = /^(http\:\/\/)|^(https\:\/\/)/gi;
    /* eslint-enable   */
    const urlReg = /(\/\/)+/gi;
    return {
      urlSuffix: url,
      url:
        (baseUrl + url).match(urlHpptReg)[0] +
        (baseUrl + url).replace(urlHpptReg, "").replace(urlReg, "/")
    };
  }

  static guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static setLoad(options) {
    const { isLoad = true } = options;
    if (isLoad) {
      this.requestQueue.push(options);
      // 开始加载数据
      // Taro.showLoading({
      //     title: '加载中',
      // });
    }
  }

  static post(url, parameter, options = {}) {
    options = {
      method: "POST",
      ...options
    };
    return this.request(url, parameter, options);
  }

  static get(url, parameter, options = {}) {
    options = {
      method: "GET",
      ...options
    };
    return this.request(url, parameter, options);
  }

  static put(url, parameter, options = {}) {
    options = {
      method: "PUT",
      ...options
    };

    return this.request(url, parameter, options);
  }

  static delete(url, parameter, options = {}) {
    options = {
      method: "DELETE",
      ...options
    };

    return this.request(url, parameter, options);
  }

  static trace(url, parameter, options = {}) {
    options = {
      method: "TRACE",
      ...options
    };

    return this.request(url, parameter, options);
  }

  static connect(url, parameter, options = {}) {
    options = {
      method: "CONNECT",
      ...options
    };
    return this.request(url, parameter, options);
  }

  static options(url, parameter, options = {}) {
    options = {
      method: "OPTIONS",
      ...options
    };

    return this.request(url, parameter, options);
  }

  static head(url, parameter, options = {}) {
    options = {
      method: "HEAD",
      ...options
    };

    return this.request(url, parameter, options);
  }

  static request(url, parameter, options) {
    const {
      method,
      headers = {},
      requestId = this.guid(),
      success = () => {},
      isPromise = true,
      baseUrl
    } = options;

    const error = options.error || Request.error || (() => {});

    const urls = this.transformUrl(baseUrl || this.baseUrl, url);
    const requestInterceptors =
      options?.interceptors?.request ||
      Request?.interceptors?.request ||
      ((config) => config);

    const responseInterceptors =
      options?.interceptors?.response ||
      Request?.interceptors?.response ||
      ((response) => response);

    // this.setLoad({
    //   url,
    //   parameter,
    //   ...options,
    // });

    return isPromise
      ? new Promise((resolve, reject) => {
          new XMLHttpRequest().xhRequest(
            requestInterceptors({
              ...options,
              ...urls,
              method,
              parameter,
              headers: {
                ...this.defaultHeaders,
                ...headers,
                ["request-id"]: requestId
              },
              success: async (...ags) => {
                ags = await responseInterceptors(ags);
                // const data = ags.length ? ags[0] : null;
                // if (data) {
                // const { code, message = "" } = data;
                // if (code == 200) {
                success(ags);
                resolve(ags);
                //   return;
                // }
                // errorMessage(message);
                // }
                // error(ags);
                // reject(ags);
              },
              error: (...ags) => {
                // ags = responseInterceptors(ags);
                error(ags);
                reject(ags);
              }
            })
          );
        })
      : new XMLHttpRequest().xhRequest(
          requestInterceptors({
            ...options,
            ...urls,
            method,
            parameter,
            headers: {
              ...this.defaultHeaders,
              ...headers,
              ["request-id"]: requestId
            },
            success: async (...ags) => {
              ags = await responseInterceptors(ags);
              success(ags);
            },
            error: (...ags) => {
              // ags = responseInterceptors(ags);
              error(ags);
            }
          })
        );
  }

  static uploadFile(url, parameter, options) {
    const { baseUrl } = options;
    const urls = this.transformUrl(baseUrl || this.baseUrl, url);
    // const data = {
    //   ...urls,
    //   parameter,
    //   method: "POST"
    //   // ...options,
    // };

    const {
      headers = {},
      requestId = this.guid(),
      isPromise = true,
      success = () => {},
      // error = () => {},
      method
      // url,
    } = options;
    const error = Request.error || options.error || (() => {});

    const requestInterceptors = options?.interceptors?.request;

    Request?.interceptors?.request || ((config) => config);
    const responseInterceptors = options?.interceptors?.response;
    Request?.interceptors?.response || ((response) => response);

    const keys = Object.keys(parameter);
    const formData = new FormData();
    keys.forEach((key) => {
      formData.append(key, parameter[key]);
    });
    // this.setLoad({
    //   ...data,
    //   ...options,
    // });
    return isPromise
      ? new Promise((resolve, reject) => {
          new XMLHttpRequest().xhRequest(
            requestInterceptors({
              ...options,
              ...urls,
              method,
              parameter: formData,
              headers: {
                ...headers,
                ["request-id"]: requestId
              },
              success: async (...ags) => {
                ags = await responseInterceptors(ags);
                success(...ags);
                resolve(...ags);
              },
              error: async (...ags) => {
                // ags = responseInterceptors(ags);
                error(...ags);
                reject(ags);
              }
            })
          );
        })
      : new XMLHttpRequest().xhRequest(
          requestInterceptors({
            ...options,
            ...urls,
            method,
            parameter: formData,
            headers: {
              ...headers,
              ["request-id"]: requestId
            },
            success: (...ags) => {
              success(...ags);
            },
            error: (...ags) => {
              error(...ags);
            }
          })
        );
  }
}

// 配置项
// 配置默认前缀
Request.baseUrl = baseUrl;
// 设置默认请求头
Request.defaultHeaders = {
  // token: localStorage.getItem("token"),
  // "content-type": "application/x-www-form-urlencoded",  //文件上传
  "Content-Type": "application/json;charset=utf-8"
  // accept: "application/json, text/plain, */*",
  // "accept-language": "zh-CN,zh;q=0.9",
  // "cache-control": "no-cache",
  // pragma: "no-cache"
};
// 错误拦截提示
Request.error = (errorInfo) => {
  const { code, message } = errorInfo[0] || {};
  if (!code) {
    errorMessage("系统错误");
  } else {
    errorMessage(message);
    codeMap[code] && codeMap[code](errorInfo);
  }
};

// 拦截器
Request.interceptors = {
  // 请求拦截
  request: async (config) => {
    const { urlSuffix } = config;
    config = {
      ...config,
      headers: {
        ...config.headers,
        // 登录拦截
        token: await token.get(urlSuffix)
      }
    };
    // return Promise.reject({
    //   error: Request.error
    // });
    return config;
  },
  // 响应拦截
  response: (response) => {
    // const { code } = response[0] || {};
    // if (code != 200) {
    //   Request.error(response)
    //   return Promise.reject(response)
    // }
    return response[0];
  }
}; //

// 导出Graphql请求
export class Graphql {
  constructor(options) {
    this.options = options;
    const { url } = options;
    this.url = url;
  }

  // 查询
  query(parameter, options = {}) {
    this.options = {
      ...this.options,
      ...options
    };
    // const { error = () => {} } = this.options;
    // return Request.get(this.url, parameter, this.options);
    return Request.post(this.url, parameter, this.options);
  }

  // 突变
  mutate(parameter, options) {
    this.options = {
      ...this.options,
      ...options
    };
    // const { error = () => {} } = this.options;
    return Request.post(this.url, parameter, this.options);
  }

  static gql(/* arguments */) {
    const args = Array.prototype.slice.call(arguments);
    const literals = args[0];
    let result = typeof literals === "string" ? literals : literals[0];

    for (let i = 1; i < args.length; i++) {
      if (args[i] && args[i].kind && args[i].kind === "Document") {
        result += args[i].loc.source.body;
      } else {
        result += args[i];
      }

      result += literals[i];
    }
    return result;
  }

  // static gql(chunks) {
  //   var variables = [];
  //   for (var _i = 1; _i < arguments.length; _i++) {
  //       variables[_i - 1] = arguments[_i];
  //   }
  //   return chunks.reduce(  (accumulator, chunk, index)=> { return "" + accumulator + chunk + (index in variables ? variables[index] : ''); }, '');
  // }
  // Graphql 错误请求
  static error(errorInfo) {
    return errorInfo;
  }

  static interceptors = {
    // 请求拦截
    request: (config) => config,
    // 响应拦截
    response: (response) => response
  };
}

export const { gql } = Graphql;

// Graphql 配置项 start
// Graphql 错误请求
Graphql.error = (errorInfo) => {
  const { code, message } = errorInfo[0] || {};
  if (!code) {
    errorMessage("系统错误");
  } else {
    errorMessage(message);
    codeMap[code] && codeMap[code](errorInfo);
  }
};
// //请求拦截
// Graphql.interceptors.request = (config) => {
//   return config;
// };
// 响应拦截
Graphql.interceptors.response = (response) => {
  const data = response[0] || {};
  const options = response[2] || {};
  const { code } = data;
  if (code && code !== 200) {
    Graphql.error(response);
    return Promise.reject(response);
  }
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const { code } = data[key];
      if (code !== 200) {
        Graphql.error([data[key]]);
        return Promise.reject(response);
      }
    }
  }
  const { filterData } = options;
  return filterData ? filterGraphqlData(data) : response;
};
// Graphql 配置项 end

// 实例化Graphql 请求
export const GraphqlClient = new Graphql({
  url: "/data", // 请求地址
  // headers: {
  //   token: localStorage.getItem("token"),
  // },
  interceptors: {
    // // 请求拦截
    // request: (config) => {
    //   return Graphql.interceptors.request(config);
    // },
    // 响应拦截
    response: (response) => Graphql.interceptors.response(response)
  },
  // 错误请求
  error: (errorInfo) => {
    Graphql.error(errorInfo);
  }
});
