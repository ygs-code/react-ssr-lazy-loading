const getStyle = (ele, attr) => {
  var style = null;
  try {
    if (window.getComputedStyle) {
      style = window.getComputedStyle(ele, null);
    } else {
      style = ele.currentStyle;
    }
    return attr ? style[attr] : style;
  } catch (error) {
    return {};
  }
};

export {getStyle};
