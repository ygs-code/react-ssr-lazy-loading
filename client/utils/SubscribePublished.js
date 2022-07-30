
import {CheckDataType} from './CheckDataType';
//按方式 kye 导出

const SubscribePublished = function (type = null, options = {}) {
  return this instanceof SubscribePublished || new SubscribePublished(...arguments).init(...arguments);
};

SubscribePublished.prototype = {
  init(type = null, options = {}) {
    const defaultOptions = {
      queueMaxLength: 1000, //防止内存溢出限制数组长度
    };
    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.type = type;
    this.queue = {}; // 记录回调函数队列
    return this;
  },
  getData(type) {
    type = type || this.type;
    // 获取数据
    return (type in this.queue && this.queue.hasOwnProperty(type) && this.queue[type].data) || null;
  },
  setData(type, data) {
    if (this.getData(type) === null || this.getData(type) !== data) {
      this.queue[type] = {
        ...(this.queue[type] || {}),
        data,
      };
    }
  },
  on(
    type, //类型
    callback, //回调函数
    isSuperposition = true //队列中函数是否叠加
  ) {
    if ((CheckDataType.isFunction(type) && CheckDataType.isBoolean(callback)) || !callback) {
      isSuperposition = callback;
      callback = type;
      type = this.type;
    }

    if (type in this.queue && this.queue.hasOwnProperty(type) && this.queue[type].fn instanceof Array && isSuperposition) {
      // 如果大于设置长度我们将踢掉一些旧的数据
      this.queue[type].fn.length >= this.options.queueMaxLength && this.queue[type].fn.shift();
      this.queue[type].fn.push(callback);
    } else {
      this.queue[type] = {
        ...(this.queue[type] || {}),
        fn: [callback],
      };
    }
    return this;
  },
  emit(type) {
    let args = [...arguments].slice(1);
    if (type !== this.type || args.length === 1) {
      args = [type];
      type = this.type;
    }
    if (
      type in this.queue &&
      this.queue.hasOwnProperty(type) &&
      this.queue[type] &&
      this.queue[type].fn &&
      this.queue[type].fn instanceof Array &&
      (this.getData(type) === null || this.getData(type) !== args)
    ) {
      this.queue[type].fn.forEach((callback) => {
        callback.apply(null, args);
      });
      // delete this.queue[type]
    }
    this.setData(type, args);
    return this;
  },
};

export {SubscribePublished};
