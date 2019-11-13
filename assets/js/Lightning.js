/**
 * @property {String} canvas - Canvas id|class
 */
export default class Lightning {
  constructor(canvas) {
    if(!canvas) return;

    this.c = document.querySelector(canvas);
    //variables
    this.cw = this.c.width = window.innerWidth;
    this.ch = this.c.height = window.innerHeight;
    this.ctx = this.c.getContext('2d');
    this.lightning = [];
    this.lightTimeCurrent = 0;
    this.lightTimeTotal = 100;

    window.addEventListener('resize', () => this.onResize());
  }

  // Check Canvas Support
  get isCanvasSupported() {
    let elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }

  init() {
    this.loop();
  }
  // Animation Loop
  loop() {
    const loopIt = () => {
      requestAnimationFrame(loopIt, this.c);
      this.clearCanvas();
      this.update();
      this.timer();
      this.render();
    }
    loopIt();
  }
  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {*} canSpawn
   */
  create(x, y, canSpawn) {
    this.lightning.push({
      x: x,
      y: y,
      xRange: this.rand(5, 100),
      yRange: this.rand(5,50),
      path: [{
        x: x,
        y: y
      }],
      pathLimit: this.rand(10, 35),
      canSpawn: canSpawn,
      hasFired: false
    })
  }
  // Update Lightning
  update() {
    this.lightning.forEach((light, index) => {
      light.path.push({
        x: light.path[light.path.length-1].x + (this.rand(0, light.xRange)-(light.xRange/2)),
        y: light.path[light.path.length-1].y + (this.rand(0, light.yRange))
      });
      if(light.path.length > light.pathLimit){
        this.lightning.splice(index, 1)
      }
      light.hasFired = true;
    })
  }
  // Render Lightning
  render() {
    this.lightning.forEach(light => {
      this.ctx.strokeStyle = 'hsla(0, 100%, 100%, '+this.rand(10, 100)/100+')';
      this.ctx.lineWidth = this.max(1);
      if(this.rand(0, 30) == 0){
        this.ctx.lineWidth = 2;
      }
      if(this.rand(0, 60) == 0){
        this.ctx.lineWidth = 3;
      }
      if(this.rand(0, 90) == 0){
        this.ctx.lineWidth = 4;
      }
      if(this.rand(0, 120) == 0){
        this.ctx.lineWidth = 5;
      }
      if(this.rand(0, 150) == 0){
        this.ctx.lineWidth = 6;
      }
      if(this.rand(0, 300) == 0){
        this.ctx.lineWidth = 8;
      }
      if(this.rand(0, 100) == 0){
        this.ctx.lineWidth = 0;
      }

      this.ctx.beginPath();

      const pathCount = light.path.length;
      this.ctx.moveTo(light.x, light.y);
      for(var pc = 0; pc < pathCount; pc++) {
        this.ctx.lineTo(light.path[pc].x, light.path[pc].y);
        if(light.canSpawn) {
          // if(this.rand(0, 10) == 0) {
            light.canSpawn = false;
            this.create(light.path[pc].x, light.path[pc].y, false);
          // }
        }
      }
      if(!light.hasFired){
        this.ctx.fillStyle = 'rgba(255, 255, 255, '+this.rand(4, 30)/100+')';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
      }

      if(this.rand(0, 30) == 0){
        this.ctx.fillStyle = 'rgba(255, 255, 255, '+this.rand(1, 5)/100+')';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
      }

      this.ctx.stroke();
    })
  }
  // Lightning Timer
  timer() {
    this.lightTimeCurrent++;
    if(this.lightTimeCurrent >= this.lightTimeTotal){
      const newX = this.rand(100, this.cw - 100);
      const newY = this.rand(0, this.ch / 2);
      let createCount = this.rand(1, 4);
      while(createCount--) {
        this.create(newX, newY, true);
      }
      this.lightTimeCurrent = 0;
      this.lightTimeTotal = this.rand(30, 150);
    }
  }
  // Clear Canvas
  clearCanvas() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,'+this.rand(1, 30)/100+')';
    this.ctx.fillRect(0,0,this.cw,this.ch);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  // Setup requestAnimationFrame
  setupRAF() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    };

    if(!window.requestAnimationFrame){
      window.requestAnimationFrame = function(callback, element){
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    };

    if (!window.cancelAnimationFrame){
      window.cancelAnimationFrame = function(id){
        clearTimeout(id);
      };
    };
  };
  // Resize on Canvas on Window Resize
  onResize() {
    this.cw = this.c.width = window.innerWidth;
    this.ch = this.c.height = window.innerHeight;
  }
  // Utility Functions
  rand(min, max) {
    return ~~(Math.random()*(max-min+1))+min;
  }
  max(num) {
    return Math.random() * num;
  }
  hitTest(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
  }
}
