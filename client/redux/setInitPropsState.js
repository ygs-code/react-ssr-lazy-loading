const setInitPropsState = (global, modelKey, dataKey = "initState") => {
  let initState = {};
  if (
    global &&
    global.__INITIAL_STATE__ &&
    global.__INITIAL_STATE__[modelKey] &&
    global.__INITIAL_STATE__[modelKey][dataKey]
  ) {
    initState = global.__INITIAL_STATE__[modelKey][dataKey];
  }

  return initState;
};

export { setInitPropsState };
