import { init } from '@rematch/core';
import * as models from './models';
import { connect } from 'react-redux';

import { CheckDataType } from '@/utils';

//文档： https://www.icode9.com/content-4-1343821.html
const store = init({
    models,
});

const mapRedux = (modelsName) => {
    return (Component) => {
        const mapStateToProps = (state) => {
            let newState = {};
            if (CheckDataType.isUndefined(modelsName)) {
                newState = state;
            } else if (CheckDataType.isArray(modelsName)) {
                for (let key of modelsName) {
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
                state: newState,
            };
        };

        const mapDispatchToProps = (dispatch) => {
            let newDispatch = {};
            if (CheckDataType.isUndefined(modelsName)) {
                newDispatch = dispatch;
            } else if (CheckDataType.isArray(modelsName)) {
                for (let key of modelsName) {
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
                dispatch: newDispatch,
            };
        };
        return connect(mapStateToProps, mapDispatchToProps)(Component);
    };
};

export { mapRedux };
export default store;
