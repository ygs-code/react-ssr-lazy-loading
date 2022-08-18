import React, { Component } from "react";

export default (props) => {
  const { loader, loading: Loading } = props;

  class AsynComponent extends Component {
    constructor(props) {
      super(props);
      this.init();
      this.state = {
        Loading,
        Component: null
      };
    }
    init = () => {
      loader().then((res) => {
        this.setState({
          Component: res.default
        });
      });
    };
    render() {
      const { Component } = this.state;
      return (
        <>
          {Component ? (
            <Component {...this.props} />
          ) : (
            <Loading {...this.props} />
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
