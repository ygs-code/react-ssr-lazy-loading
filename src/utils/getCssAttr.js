const getStyle = (ele,attr) => {
  var style = null;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(ele, null);
  } else {
    style = ele.currentStyle;
  }
  return attr? style[attr]:style;
};

export{
    getStyle
};
