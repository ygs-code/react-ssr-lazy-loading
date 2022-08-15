const setInitData = (global, name) => {
  let initState = {};
  if (
    global &&
    global.__INITIAL_STATE__ &&
    global.__INITIAL_STATE__[name] &&
    global.__INITIAL_STATE__[name].initState
  ) {
    initState = global.__INITIAL_STATE__[name].initState;
  }

  return initState;
};

export { setInitData };
