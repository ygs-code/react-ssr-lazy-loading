import { CheckDataType } from "./CheckDataType";
// 递归treeData 会给 treeData 添加index 索引
const recursionTreeData = (parameter, _index = null) => {
  const {
    treeData = [],
    childrenCallback = () => {},
    itemCallback = () => {}
  } = parameter;
  return treeData.map((item, index) => {
    if (item.children && item.children.length >= 1) {
      item = {
        ...item,
        children: recursionTreeData(
          {
            treeData: item.children,
            childrenCallback,
            itemCallback
          },
          _index === null ? `${index}` : `${_index}-${index}`
        ),
        index: _index === null ? `${index}` : `${_index}-${index}`
      };
      childrenCallback(item);
    }
    item = {
      ...item,
      index: _index === null ? `${index}` : `${_index}-${index}`
    };
    itemCallback(item);
    return item;
  });
};

// 过滤数据 可以用于搜索，包括父层的数据树形结构
const filterTreeData = (
  data = [], // 树形数组对象
  filterCallback = () => true, // 条件的回调函数
  nexKey = "children",
  _index = null
) =>
  data.filter((item, index) => {
    if (item[nexKey] && item[nexKey].length >= 1) {
      item[nexKey] = filterTreeData(
        item[nexKey],
        filterCallback,
        nexKey,
        _index === null ? `${index}` : `${_index}-${index}`
      );
      if (
        filterCallback(
          item,
          _index === null ? `${index}` : `${_index}-${index}`
        )
      ) {
        return true;
      }
      return item[nexKey] && item[nexKey].length >= 1;
    }
    return filterCallback(
      item,
      _index === null ? `${index}` : `${_index}-${index}`
    );
  });
// 复杂类型数据，深拷贝
const deepCopy = (
  source, // 来源数据
  target // 新的数据 如果是数组则为 [], 如果是对象传参则为{}
) => {
  target = target || {};
  for (const i in source) {
    if (source[i] && source.hasOwnProperty(i)) {
      if (typeof source[i] === "object") {
        target[i] = source[i] && source[i].constructor === Array ? [] : {};
        deepCopy(source[i], target[i]);
      } else {
        target[i] = source[i];
      }
    }
  }
  return target;
};

// 搜索到树数据的某一条数据单条 不包括父层数据的
const findTreeData = (
  treeData, // 树形数组或者数组数据
  value, // 需要查找的value
  key, // 需要查找数组对象的key
  nextKey = "children"
) => {
  let findValue = null;
  for (const item of treeData) {
    if (item[key] === value) {
      return item;
    }
    if (item && item[nextKey] && item[nextKey].length >= 1) {
      findValue = findTreeData(item[nextKey], value, key, nextKey);
    }
  }
  return findValue;
};

// 深度比较两个数据
const diffData = (oldData, newData) => {
  let flag = true;
  if (oldData !== newData) {
    return false;
  }
  if (
    (CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)) ||
    (CheckDataType.isArray(oldData) && CheckDataType.isArray(newData))
  ) {
    const oldDataKeys =
      CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)
        ? Object.keys(oldData)
        : oldData;
    const newDataKeys =
      CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)
        ? Object.keys(newData)
        : newData;
    if (oldDataKeys.length !== oldDataKeys.length) {
      return false;
    }
    for (const [index, elem] of oldDataKeys.entries()) {
      if (elem !== newDataKeys[index]) {
        return false;
      }
      if (
        (CheckDataType.isObject(elem) &&
          CheckDataType.isObject(newDataKeys[index])) ||
        (CheckDataType.isArray(elem) &&
          CheckDataType.isArray(newDataKeys[index]))
      ) {
        flag = diffData(elem, newDataKeys[index]);
      }
    }
  }
  return flag;
};
export { recursionTreeData, filterTreeData, deepCopy, diffData, findTreeData };
