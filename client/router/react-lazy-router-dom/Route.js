import React, { Children } from "react";
import PropTypes from "prop-types";
const Route = (props) => {
  const { children } = props;
  return children
    ? Children.map(children, (child) => {
        return <>{child} </>;
      })
    : null;
};

Route.propTypes = {
  //   key: PropTypes.string.isRequired,
  //   exact: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export { Route };
