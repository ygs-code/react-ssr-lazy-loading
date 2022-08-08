const getEv = () => {
    let $GLOBAL_VARIABLE = {};

    /* eslint-disable*/
    try {
        if (GLOBAL_VARIABLE) {
            $GLOBAL_VARIABLE = GLOBAL_VARIABLE;
        }
    } catch (error) {
        try {
            if (process) {
                const {
                    // ...process.env,
                    NODE_ENV, // 环境参数
                    WEB_ENV, // 环境参数
                    target, // 环境参数
       
                    htmlWebpackPluginOptions,
                } = process.env;

                $GLOBAL_VARIABLE = {
                    NODE_ENV, // 环境参数
                    WEB_ENV, // 环境参数
                    target, // 环境参数
               
                    htmlWebpackPluginOptions,
                };
            }
        } catch (error) {}
    }

    return $GLOBAL_VARIABLE;
};

export { getEv };
