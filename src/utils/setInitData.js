const setInitData = ($window, name) => {
    let initState = {};
    if (
        $window &&
        $window.__INITIAL_STATE__ &&
        $window.__INITIAL_STATE__[name] &&
        $window.__INITIAL_STATE__[name].initState
    ) {
        initState = $window.__INITIAL_STATE__[name].initState;
    }

    return initState;
};

export { setInitData };
