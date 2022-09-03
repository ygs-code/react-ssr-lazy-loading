// 获取url地址
const getNewUrlArr = (parameter) => {
  const newUrlArr = [];
  const { url, index, params, pathnameArr } = parameter;
  let key = null;
  let optional = -1;
  if (url.indexOf(":") >= 0) {
    optional = url.indexOf("?");
    key = url.substr(1);
    key = optional >= 0 ? key.slice(0, -1) : key;
    if (params && key in params && params.hasOwnProperty(key)) {
      // 如果参数等于undefined 则会丢弃
      params[key] !== undefined && newUrlArr.push(`/${params[key]}`);
    } else {
      (optional === -1 || pathnameArr[index]) &&
        newUrlArr.push(`/${pathnameArr[index]}`);
    }
  } else {
    newUrlArr.push(`/${url}`);
  }
  return newUrlArr;
};

// 把url 字符串转换成对象
const querystringParse = (search) => {
  search = search.substr(1);
  const searchArr = search.split("&");
  const objParameter = {};
  searchArr.forEach((target) => {
    const parameter = target.split("=");
    objParameter[parameter[0]] = parameter[1];
  });
  return objParameter;
};

// 把对象转成url参数
const queryStringify = (data) => {
  const keys = Object.keys(data);
  let formStr = "";
  if (keys.length === 0) {
    return formStr;
  }
  keys.forEach((key) => {
    if (data[key] === undefined || data[key] === null) {
      return;
    }
    formStr += `&${key}=${data[key]}`;
  });
  return formStr.substr(1);
};

// 序列化query参数
const serialize = (data) => {
  const { location } = window;
  const { search } = location;
  let formStr = "";
  if (search.length === 0) {
    formStr = queryStringify(data);
    formStr = `${formStr ? `?${formStr}` : ""}`;
  } else {
    formStr = queryStringify({
      ...querystringParse(search),
      ...data
    });
    formStr = `${formStr ? `?${formStr}` : ""}`;
  }
  // return  encodeURIComponent(formStr)
  return formStr;
};

export const historyPush = (parameter) => {
  const {
    history = null, // 组件的props
    params = {}, // 地址传参
    query = {}, // get 传参
    isOpenWin = false, // 是否重新打开新的窗口
    url = "/",
    replace,
    baseUrl = ""
  } = parameter;

  const { location } = window;
  const { pathname } = location;
  const pathnameArr = pathname.split("/");
  let urlArr = url.split("/");
  urlArr = urlArr.filter((item) => item !== "");
  let newUrlArr = [];
  for (const [index, elem] of urlArr.entries()) {
    if (
      pathnameArr[index] &&
      pathnameArr[index].trim() !== "" &&
      urlArr[index] &&
      urlArr[index].trim() !== ""
    ) {
      newUrlArr = [
        ...newUrlArr,
        ...getNewUrlArr({
          url: urlArr[index],
          index,
          params,
          pathnameArr
        })
      ];
    } else if (elem && elem.trim() !== "") {
      newUrlArr = [
        ...newUrlArr,
        ...getNewUrlArr({
          url: elem,
          index,
          params,
          pathnameArr
        })
      ];
    }
  }
  if (isOpenWin) {
    window.open(`${baseUrl}${newUrlArr.join("")}${serialize(query)}`);
  } else {
    history[replace ? "replace" : "push"](
      urlArr.length ? `${newUrlArr.join("")}${serialize(query)}` : "/"
    );
  }
};

export const navigateTo = (url, data, options = {}) => {
  const { method = "params" } = options;
  delete options.method;
  data = {
    [method]: data
  };
  historyPush({
    url,
    ...data
  });
};

export const redirectTo = (url, data, options = {}) => {
  const { method = "params", replace = true } = options;
  delete options.method;
  data = {
    [method]: data
  };
  historyPush({
    url,
    ...data,
    replace
  });
};

export const openWindow = (url, data, options = {}) => {
  const { method = "params", isOpenWin = true } = options;
  delete options.method;
  data = {
    [method]: data
  };
  historyPush({
    url,
    ...data,
    isOpenWin
  });
};
