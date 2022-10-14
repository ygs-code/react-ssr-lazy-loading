import React, { Component } from "react";
import hoistStatics from "hoist-non-react-statics";
export default (options = {}) => {
  return (Traget) => {
    const displayName =
      "SetMetaProps(" + (Traget.displayName || Traget.name) + ")";
    class SetMetaProps extends Component {
      componentDidMount() {
        const {
          title = "",
          keywords = "",
          description = ""
        } = Traget.getMetaProps ? Traget.getMetaProps() : options || {};
        this.setAttribute(
          window.document.querySelector('meta[name="keywords"]'),
          "content",
          keywords
        );
        this.setAttribute(
          window.document.querySelector('meta[name="description"]'),
          "content",
          description
        );
        window.document.title = title;
      }
      setAttribute = (el, key, value) => {
        el.setAttribute(key, value);
      };
      render() {
        return <Traget {...this.props} />;
      }
    }
    SetMetaProps.displayName = displayName;
    SetMetaProps.WrappedComponent = Traget;
    Traget.getMetaProps = Traget.getMetaProps
      ? Traget.getMetaProps
      : () => options;
    return hoistStatics(SetMetaProps, Traget);
  };
};
