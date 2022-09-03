const lazy = (loader) => {
  lazy.loaderArr = [...lazy.loaderArr, loader];
  return () => {
    return loader()
      .then((res) => {
        return res.default;
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};
lazy.loaderArr = [];

const preloadReady = (onSuccess = () => {}, onError = () => {}) => {
  const promiseArr = [];
  for (let item of lazy.loaderArr) {
    promiseArr.push(item());
  }

  return Promise.all(promiseArr)
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      // console.log("error:", error);
      onError(error);
      throw new Error(error);
    });
};

export { preloadReady };
export { lazy };
export default lazy;
