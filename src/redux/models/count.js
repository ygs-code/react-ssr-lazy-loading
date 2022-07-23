const count = {
    state: {
        num: 1,
    },
    reducers: {
        increment(state, num1, num2) {
            /*
                  从第二个变量开始为调用increment时传递进来的参数，后面依次类推，
                  例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20. 
              */
            return {
                ...state,
                num: num1,
            };
        },
    },
    effects: {
        //   async incrementAsync(num1, rootState, num2) {
        //     /*
        //                 第二个变量rootState， 为当前model的state的值
        //                 第一个变量num1， 第三个变量num2分别， 调用incrementAsync时传递进来的第一个参数， 第二个参数，后面依次类推。
        //                 例如：dispatch.count.incrementAsync(10, 20)时，num1 = 10, num2 = 20
        //             */
        //     // await new Promise((resolve) => setTimeout(resolve, 2000));
        //     // this.increment(num1);
        //   },
        // },
        //   effects: (dispatch) => ({
        //     async incrementAsync(num1, rootState, num2) {
        //       await new Promise((resolve) => setTimeout(resolve, 2000))
        //       // 方式一
        //       // this.increment(num1);
        //       // 方式二
        //       dispatch.count.increment(num1)
        //     },
        //   }),
    },
};

export { count };
