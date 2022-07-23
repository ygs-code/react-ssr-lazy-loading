// 生成标签坐标类
function Tag(x, y, z, color) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.color = color;
}
Tag.prototype = {
  move: function (fallLength, RADIUS, CX, CY) {
    var scale = fallLength / (fallLength - this.z);
    var alpha = (this.z + RADIUS) / (2 * RADIUS);
    this.style = {
      color: this.color,
      left: this.x + CX - 40 * scale + 'px',
      top: this.y + CY - 20 * scale + 'px',
      zIndex: parseInt(scale * 100),
      filter: 'alpha(opacity = ' + (alpha + 0.5) * 100 + ')',
      opacity: alpha + 0.5,
      fontSize: 15 * scale + 'px'
      // color: "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")"
    };
  }
};

//浮动球 类
function FloatingBall(options) {
  const {
    fallLength, // 字体缩放，越小就会越放大
    RADIUS, // 生成标签圆半径
    tagLength, // 生成几个标签坐标
    ele, // 圆的dom
    ms = 60, // 动画帧频
    callback, // 更新坐标后的回调函数
    isAnimate = true, // 是否添加动画
    isAddEvent = true // 是否添加鼠标事件
  } = options;
  this.lastX = 0;
  this.lastY = 0;
  this.angleX = Math.PI / 500;
  this.angleY = Math.PI / 500;
  this.tagLength = tagLength;
  this.fallLength = fallLength;
  this.RADIUS = RADIUS;
  this.tags = [];
  this.timer = null;
  this.ele = ele;
  this.CX = ele.offsetWidth / 2; // 宽中心店
  this.CY = ele.offsetHeight / 2; // 高度中心点
  // this.EX = ele.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft
  // this.EY = ele.offsetTop + document.body.scrollTop + document.documentElement.scrollTop
  this.callback = callback;
  this.ms = ms / 1000;
  this.isAnimate = isAnimate;
  this.init(); // 初始化标签
  //   isAnimate && this.animate() // 添加动画
  if (isAddEvent) {
    this.addDragEvent(); // 添加动画鼠标事件
  }
}

FloatingBall.prototype = {
  init() {
    for (var i = 0; i < this.tagLength; i++) {
      var a, b;
      var k = (2 * (i + 1) - 1) / this.tagLength - 1;
      a = Math.acos(k);
      b = a * Math.sqrt(this.tagLength * Math.PI);
      // var a = Math.random()*2*Math.PI;
      // var b = Math.random()*2*Math.PI;
      var x = this.RADIUS * Math.sin(a) * Math.cos(b);
      var y = this.RADIUS * Math.sin(a) * Math.sin(b);
      var z = this.RADIUS * Math.cos(a);
      var t = new Tag(
        x,
        y,
        z,
        'rgb(' +
          parseInt(Math.random() * 255) +
          ',' +
          parseInt(Math.random() * 255) +
          ',' +
          parseInt(Math.random() * 255) +
          ')'
      );
      t.move(this.fallLength, this.RADIUS, this.CX, this.CY);
      this.tags.push(t);
      requestAnimationFrame(() => {
        this.callback(this.tags.map((item) => item.style));
      });
      // this.callback(this.tags.map((item) => item.style))
    }
    return this;
  },
  animate() {
    clearInterval(this.timer);
    this.timer = null;
    this.timer = setInterval(() => {
      this.rotateX();
      this.rotateY();
      for (const [index, item] of this.tags.entries()) {
        item.move(this.fallLength, this.RADIUS, this.CX, this.CY);
      }
      requestAnimationFrame(() => {
        this.callback(this.tags.map((item) => item.style));
      });
      if (
        Math.abs(this.angleX * 100000) < 1 ||
        Math.abs(this.angleY * 100000) < 1
      ) {
        clearInterval(this.timer);
        this.timer = null;
      }
      // this.callback(this.tags.map((item) => item.style))
    }, this.ms);
    return this;
  },
  rotateX() {
    this.angleX *= 0.995;
    //   this.angleX = Math.PI/500,
    //   this.angleY = Math.PI/500,
    var cos = Math.cos(this.angleX);
    var sin = Math.sin(this.angleX);
    this.tags.forEach(function (target, index) {
      var y1 = target.x * cos - target.z * sin;
      var z1 = target.z * cos + target.x * sin;
      target.x = y1;
      target.z = z1;
    });
    return this;
  },
  rotateY() {
    this.angleY *= 0.995;
    var cos = Math.cos(this.angleY);
    var sin = Math.sin(this.angleY);
    this.tags.forEach(function (target, index) {
      var x1 = target.y * cos - target.z * sin;
      var z1 = target.z * cos + target.y * sin;
      target.y = x1;
      target.z = z1;
    });
    return this;
  },
  getScope(min, max, now) {
    if (now < min) {
      now = min;
    } else if (now > max) {
      now = max;
    }
    return now;
  },
  onChangeAngle(event) {
    var distanceX = event.clientX - this.lastX;
    var distanceY = event.clientY - this.lastY;
    if (Math.abs(distanceY) > 3) {
      //防抖
      if (distanceY > 0) {
        // 下面
        this.angleY = -this.getScope(8, 50, Math.abs(distanceY)) * 0.0005;
      } else {
        // 上面
        this.angleY = this.getScope(8, 50, Math.abs(distanceY)) * 0.0005;
      }
    }
    if (Math.abs(distanceX) > 3) {
      //防抖
      if (distanceX > 0) {
        //右边
        this.angleX = -this.getScope(8, 50, Math.abs(distanceX)) * 0.0005;
      } else {
        // 左边
        this.angleX = this.getScope(8, 50, Math.abs(distanceX)) * 0.0005;
      }
    }

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  },
  addMoveEvent() {
    if ('addEventListener' in window) {
      this.ele.addEventListener('mousemove', (event) => {
        this.onChangeAngle(event);
        if (this.isAnimate) {
          this.animate(); // 添加动画
        }
      });
      this.ele.addEventListener('mouseout', (event) => {
        // this.onChangeAngle(event)
        if (this.isAnimate) {
          this.animate(); // 添加动画
        }
      });
    } else {
      this.ele.attachEvent('onmousemove', (event) => {
        this.onChangeAngle(event);
        if (this.isAnimate) {
          this.animate(); // 添加动画
        }
      });
      this.ele.attachEvent('onmouseout', (event) => {
        // this.onChangeAngle(event)
        if (this.isAnimate) {
          this.animate(); // 添加动画
        }
      });
    }

    return this;
  },
  addDragEvent() {
    let startX = 0;
    let startY = 0;
    let isDrag = false;

    if ('addEventListener' in window) {
      // 按下
      this.ele.addEventListener('mousedown', (event) => {
        //   this.onChangeAngle(event)
        //   this.isAnimate && this.animate() // 添加动画
        startX = event.clientX;
        startY = event.clientY;
        isDrag = true;
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      });
      // 抬起
      document.addEventListener('mouseup', (event) => {
        // this.onChangeAngle(event)
        //   this.isAnimate && this.animate() // 添加动画
        isDrag = false;

        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      });

      // 移动
      this.ele.addEventListener('mousemove', (event) => {
        if (!isDrag) {
          return false;
        }
        // this.onChangeAngle(event)
        // this.isAnimate && this.animate() // 添加动画
        var distanceX = event.clientX - startX;
        var distanceY = event.clientY - startY;
        if (Math.abs(distanceY) > 3) {
          //防抖
          if (distanceY > 0) {
            // 下面
            this.angleY = -Math.abs(distanceY) * 0.0005;

            // this.angleY = -this.getScope(8, 50, Math.abs(distanceY)) * 1
          } else {
            // 上面
            // this.angleY = this.getScope(8, 50, Math.abs(distanceY)) *1
            this.angleY = Math.abs(distanceY) * 0.0005;
          }
        }
        if (Math.abs(distanceX) > 3) {
          //防抖
          if (distanceX > 0) {
            //右边
            this.angleX = -Math.abs(distanceX) * 0.0005;

            // this.angleX = -this.getScope(8, 50, Math.abs(distanceX)) * 1
          } else {
            // 左边
            this.angleX = Math.abs(distanceX) * 0.0005;
            // this.angleX = this.getScope(8, 50, Math.abs(distanceX)) * 1
          }
        }

        this.rotateX();
        this.rotateY();
        for (const [index, item] of this.tags.entries()) {
          item.move(this.fallLength, this.RADIUS, this.CX, this.CY);
        }
        requestAnimationFrame(() => {
          this.callback(this.tags.map((item) => item.style));
        });
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      });
      // 离开
      this.ele.addEventListener('mouseout', (event) => {
        // isDrag=false;
        // this.onChangeAngle(event)
        // this.isAnimate && this.animate() // 添加动画
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      });
    } else {
      this.ele.attachEvent('onmousemove', (event) => {
        //   this.onChangeAngle(event)
        //   this.isAnimate && this.animate() // 添加动画
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      });
      this.ele.attachEvent('onmouseout', (event) => {
        // this.onChangeAngle(event)
        //   this.isAnimate && this.animate() // 添加动画
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        return false;
      });
    }
  }
};

export {FloatingBall};
