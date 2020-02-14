// Initializes the canvas
function initCanvas () {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#808080"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


var x=100;
var y=200;
var speedx=5;
var speedy=5;
var color = getRandomColor();

// Sets the context 
function init()
{
  setInterval(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    ctx.clearRect(0,0, canvas.width, canvas.height)
    draw()
  },10);
}
// generates a random color for the ball
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Draws the circle and sets the different directions everytime it bounces

function draw(){
    var canvas = document.getElementById('canvas');
    var circle = canvas.getContext("2d");
    circle.beginPath();
    circle.arc(x, y, 10, 0, 2 * Math.PI,true);
    // circle.strokeStyle = "red";
    circle.closePath();
    circle.fillStyle = color;
    circle.fill();
    if( x<0 || x>canvas.width) {
        speedx=-speedx; 
        color = getRandomColor();
    }
    if( y<0 || y>canvas.height) {
        speedy=-speedy; 
        color = getRandomColor();
    } 
    x+=speedx;
    y+=speedy;
  }
document.addEventListener("DOMContentLoaded", () => {
  initCanvas()
  init()
  draw()
}); 

// Allows the up and down arrows to change the speed of the ball

document.addEventListener("keydown",(event)=>{
    console.log(event.keyCode)
    if (speedy === 0) {
        document.getElementById('stop').innerText = 'Too slow, you lose'
        document.getElementById('velocity').innerText = 'Velocity = 0'

        return
    }
    if (event.keyCode === 38 ){
        (speedx > 0) ? speedx += 1 : speedx -= 1;
        (speedy > 0) ? speedy += 1 : speedy -= 1;
        document.getElementById('velocity').innerText = Math.abs(speedx)
    }
    if (event.keyCode === 40 ){
        (speedx > 0) ? speedx -= 1 : speedx += 1;
        (speedy > 0) ? speedy -= 1 : speedy += 1;
        document.getElementById('velocity').innerText = Math.abs(speedx - 1)
    }
})