import React from "react";
import { Router as RawRouter } from "react-router-dom";

class Router extends RawRouter {
  constructor(props) {
    super(props);
    this.$componentWillMount = super.componentWillMount;
    super.componentWillMount = undefined;
    this.$componentWillMount();
  }
}

export { Router };
