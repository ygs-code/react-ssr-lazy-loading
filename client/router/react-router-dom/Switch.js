// import React from "react";
import { Switch as RawSwitch } from "react-router-dom";

class Switch extends RawSwitch {
  constructor(props) {
    super(props);
    this.$componentWillMount = super.componentWillMount;
    super.componentWillMount = undefined;
  }

  componentDidMount = () => {
    this.$componentWillMount();
  };
}

export { Switch };
