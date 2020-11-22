var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d');


    // inner -> outer - > outerWidth(true)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

var config = {
    particleNumber : 600,
    maxParticleSize : 20,
    maxSpeed : 30,
    colorVariation : 100
};


var colorPalette = {
  bg : { r : 12, g : 9, b : 29},
  matter : [ 
    { r: 36, g: 18, b: 42 }, // darkPRPL
    { r: 112, g: 11, b: 127 }, // rockDust
    { r: 252, g: 132, b: 93 }, // solorFlare
    { r: 232, g: 61, b: 85 } // totesASun
    ] };

var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    drawBg,
    
  
    drawBg = function (ctx, color) {
      ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

var Particle = function (x, y){
  // X 좌표
  this.x = x || Math.round(Math.random() * canvas.width);
  // Y 좌표
  this.y = y || Math.round(Math.random() * canvas.height);
  // 입자 반경
  this.r = Math.ceil(Math.random() * config.maxParticleSize);
  // 입자 랜덤 색상
  this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
  // 입자 속도
  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
  // 입자 방향
  this.d = Math.round(Math.random() * 360);

};

// 다양한 색상 적용
var colorVariation = function (color, returnString){
  var r, g, b, a, variation;
  r = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.r);
  g = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.g);
  b = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.b);
  a = Math.random() + .5;
  
  if(returnString) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";

  } else {
    return { r, g, b, a};
  }
};

// 속도로 다음 지점 찾기
var updateParticleModel = function(p) {
  var a = 180 - (p.d + 90);   
  p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
  p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
  return p;
}

// 물리적인 기능
var drawParticle = function(x, y, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
};
 
// 벗어난 입자 제거

var cleanUpArray = function() {
  particles = particles.filter(p => {
    return p.x > -100 && p.y > -100;
  });
};

var initParticles = function(numParticles, x, y) {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
  }

  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
};

window.requestAnimationFrame = function (){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

// 프레임
var frame = function () {
  // 배경
  drawBg(ctx, colorPalette.bg);

  // 입자의 새로운 위치
  particles.map(p => {
    return updateParticleModel(p);
  });

  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });

  window.requestAnimationFrame(frame);
};

// 클릭 이벤트 생성
document.body.addEventListener("click", function(event){
  var x = event.clientX,
  y = event.clientY;

  cleanUpArray();
  initParticles(config.particleNumber, x, y);
});

frame();

initParticles(config.particleNumber);


