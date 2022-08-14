import { init } from "@rematch/core";
import { connect } from "react-redux";
import * as models from "./models";
import { CheckDataType } from "client/utils";

const mapRedux = (modelsName) => (Component) => {
  const mapStateToProps = (state) => {
    let newState = {};
    if (CheckDataType.isUndefined(modelsName)) {
      newState = state;
    } else if (CheckDataType.isArray(modelsName)) {
      for (const key of modelsName) {
        if (state[key]) {
          newState[key] = state[key];
        }
      }
    } else if (CheckDataType.isString(modelsName)) {
      if (state[modelsName]) {
        newState[modelsName] = state[modelsName];
      }
    }

    return {
      state: newState
    };
  };

  const mapDispatchToProps = (dispatch) => {
    let newDispatch = {};
    if (CheckDataType.isUndefined(modelsName)) {
      newDispatch = dispatch;
    } else if (CheckDataType.isArray(modelsName)) {
      for (const key of modelsName) {
        if (dispatch[key]) {
          newDispatch[key] = dispatch[key];
        }
      }
    } else if (CheckDataType.isString(modelsName)) {
      if (dispatch[modelsName]) {
        newDispatch[modelsName] = dispatch[modelsName];
      }
    }

    return {
      dispatch: newDispatch
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Component);
};
export { mapRedux };

export const createStore = (global) => {
  const newModels = {};
  /* eslint-disable   */
  for (const key in models) {
    // if (models.hasOwnProperty(key)) {
    newModels[key] = models[key](global);
    // }
  }
  /* eslint-enable   */
  // 文档： https://www.icode9.com/content-4-1343821.html
  return init({
    models: newModels
  });
};

let $global = {};
try {
  if (window) {
    $global = window;
  }
} catch (error) {
  // 不要挂载在global中不然会很慢
  $global = {};
}

export default createStore($global); // (global || {})
