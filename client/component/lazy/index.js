import React, { Component } from "react";

const NullComponent = (props) => {
  return <div></div>;
};

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
        Component: NullComponent,
        error: null
      };
      this.timer = null;
    }
    init = () => {
      loader()
        .then((res) => {
          // setTimeout(() => {
          this.setState({
            Component: res.default,
            isLoading: false
          });
          // }, 5000);
        })
        .catch((error) => {
          this.setState({
            error: error,
            isLoading: true
          });
        });
    };
    render() {
      const { Component, error, isLoading } = this.state;
      const { NextComponent } = this.props;
      return (
        <>
          {isLoading ? (
            // {
            //    NextComponent ? (
            //   <div>
            //     <NextComponent
            //       {...this.props}
            //       isLoading={isLoading}
            //       error={error}
            //     />
            //   </div>
            // ) :
            <NullComponent
              {...this.props}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <Component {...this.props} />
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
