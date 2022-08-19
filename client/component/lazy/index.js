import React, { Component } from "react";

const lazy = (props) => {
  const { loader, loading: Loading } = props;
  lazy.loaderArr = [...lazy.loaderArr, loader];
  class AsynComponent extends Component {
    constructor(props) {
      super(props);
      this.init();
      this.state = {
        isLoading: true,
        Loading,
        Component: null,
        error: null
      };
    }
    init = () => {
      loader()
        .then((res) => {
          this.setState({
            Component: res.default
          });
        })
        .catch((error) => {
          this.setState({
            error: error
          });
        });
    };
    render() {
      const { Component, error, isLoading } = this.state;
      return (
        <>
          {Component ? (
            <Component {...this.props} />
          ) : (
            <Loading {...this.props} isLoading={isLoading} error={error} />
          )}
        </>
      );
    }
  }

  return {
    AsynComponent, // 异步
    SyncComponent: loader // 同步组件
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
      console.log("error:", error);
      onError(error);
    });
};

export { preloadReady };
export default lazy;
