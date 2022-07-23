class diffData {
    diff(newData, oldData) {
        let flag = true;
        if (newData instanceof Object) {
            if (!this.isObject(newData, oldData)) {
                flag = false;
                return false;
            }
            for (let key in newData) {
                if (
                    newData[key] instanceof Object ||
                    newData[key] instanceof Array ||
                    newData[key] instanceof Function
                ) {
                    flag = this.diff(newData[key], oldData[key]);
                    if (!flag) {
                        return flag;
                    }
                } else if (newData[key] !== oldData[key]) {
                    flag = false;
                    return flag;
                }
            }
        }

        if (newData instanceof Array) {
            if (!this.isArray(newData, oldData)) {
                return false;
            }
            for (let [index, item] in newData.entries()) {
                if (
                    newData[index] instanceof Object ||
                    newData[index] instanceof Array ||
                    newData[index] instanceof Function
                ) {
                    flag = this.diff(newData[index], oldData[index]);
                    if (!flag) {
                        return flag;
                    }
                } else if (newData[index] !== oldData[index]) {
                    flag = false;
                    return flag;
                }
            }
        }

        if (newData instanceof Function) {
            if (!this.isFunction(newData, oldData)) {
                flag = false;
                return flag;
            }
        }

        return flag;
    }
    isFunction(newData, oldData) {
        if (
            newData instanceof Function &&
            oldData instanceof Function &&
            newData.toString() === oldData.toString()
        ) {
            return true;
        }
        return false;
    }
    isObject(newData, oldData) {
        if (
            newData instanceof Object &&
            oldData instanceof Object &&
            Object.keys(newData).length === Object.keys(oldData).length
        ) {
            return true;
        }
        return false;
    }
    isArray(newData, oldData) {
        if (
            newData instanceof Array &&
            oldData instanceof Array &&
            newData.length === oldData.length
        ) {
            return true;
        }
        return false;
    }
}

module.exports = (newData, oldData) => {
    return new diffData().diff(newData, oldData);
};
