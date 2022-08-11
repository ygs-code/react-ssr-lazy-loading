const getStyle = (ele, attr) => {
  let style = null;
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

export { getStyle };
