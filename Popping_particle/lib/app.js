"use strict";var canvas=document.querySelector("#canvas"),ctx=canvas.getContext("2d");// inner -> outer - > outerWidth(true)
canvas.width=window.innerWidth,canvas.height=window.innerHeight;var drawBg,config={particleNumber:800,maxParticleSize:10,maxSpeed:30,colorVariation:100},colorPalette={bg:{r:12,g:9,b:29},matter:[{r:36,g:18,b:42},// darkPRPL
{r:112,g:11,b:127},// rockDust
{r:252,g:132,b:93},// solorFlare
{r:232,g:61,b:85// totesASun
}]},particles=[],centerX=canvas.width/2,centerY=canvas.height/2,drawBg=function(a,b){a.fillStyle="rgb("+b.r+","+b.g+","+b.b+")",a.fillRect(0,0,canvas.width,canvas.height)},Particle=function(a,b){var c=Math.ceil,d=Math.round;// X 좌표
// Y 좌표
// 입자 반경
// 입자 랜덤 색상
// 입자 속도
// 입자 방향
this.x=a||d(Math.random()*canvas.width),this.y=b||d(Math.random()*canvas.height),this.r=c(Math.random()*config.maxParticleSize),this.c=colorVariation(colorPalette.matter[Math.floor(Math.random()*colorPalette.matter.length)],!0),this.s=Math.pow(c(Math.random()*config.maxSpeed),.7),this.d=d(360*Math.random())},colorVariation=function(c,d){var f,h,i,j,e=Math.round;return f=e(Math.random()*config.colorVariation-config.colorVariation/2+c.r),h=e(Math.random()*config.colorVariation-config.colorVariation/2+c.g),i=e(Math.random()*config.colorVariation-config.colorVariation/2+c.b),j=Math.random()+.5,d?"rgba("+f+","+h+","+i+","+j+")":{r:f,g:h,b:i,a:j}},updateParticleModel=function(b){var c=Math.sin,d=180-(b.d+90);return 0<b.d&&180>b.d?b.x+=b.s*c(b.d)/c(b.s):b.x-=b.s*c(b.d)/c(b.s),90<b.d&&270>b.d?b.y+=b.s*c(d)/c(b.s):b.y-=b.s*c(d)/c(b.s),b},drawParticle=function(a,b,d,e){ctx.beginPath(),ctx.fillStyle=e,ctx.arc(a,b,d,0,2*Math.PI,!1),ctx.fill(),ctx.closePath()},cleanUpArray=function(){particles=particles.filter(function(a){return-100<a.x&&-100<a.y})},initParticles=function(a,b,c){for(var d=0;d<a;d++)particles.push(new Particle(b,c));particles.forEach(function(a){drawParticle(a.x,a.y,a.r,a.c)})};// 다양한 색상 적용
// 속도로 다음 지점 찾기
// 물리적인 기능
// 벗어난 입자 제거
window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}();// 프레임
var frame=function(){// 배경
// 입자의 새로운 위치
drawBg(ctx,colorPalette.bg),particles.map(function(a){return updateParticleModel(a)}),particles.forEach(function(a){drawParticle(a.x,a.y,a.r,a.c)}),window.requestAnimationFrame(frame)};// 클릭 이벤트 생성
document.body.addEventListener("click",function(a){var b=a.clientX,c=a.clientY;cleanUpArray(),initParticles(config.particleNumber,b,c)}),frame(),initParticles(config.particleNumber);