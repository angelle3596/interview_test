const ctx = canvas.getContext("2d");
let x=100;
let y=200;
var ballRadius = 10;

let speedx=5;
let speedy=5;
let color = getRandomColor();
const paddleHeight = 10;
const paddleWidth= 75;
let paddleX= (canvas.width-paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;

const velocityDisplay = document.getElementById('velocity')

// Initializes the canvas
function initCanvas () {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#808080"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// Sets the context 
function init()
{
  setInterval(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    ctx.clearRect(0,0, canvas.width, canvas.height)
    draw()
},10);
// const interval = setInterval(draw, 10);

}
// generates a random color for the ball
function getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Draws the circle 
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI,true);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
//Draws the paddle
function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//Sets the different directions when the ball hits the wall
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBall();
    if( x<0 || x>canvas.width) {
        speedx=-speedx; 
        color = getRandomColor();
    }

    if(y + speedy < ballRadius) {
        speedy = -speedy;
    } else if(y + speedy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            speedy = -speedy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    x+=speedx;
    y+=speedy;
    //Moves the paddle and stops it when it hits the edge of the canvas
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    drawPaddle();
  }
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
let interval= setInterval(draw,10);
// Allows the up and down arrows to change the speed of the ball

document.addEventListener("keydown",(event)=>{
    console.log(event.keyCode)
    if (speedy === 0) {
        // document.getElementById('stop').innerText = 'Too slow, you lose'
    return
    }
    if (event.keyCode === 38 ){
        (speedx > 0) ? speedx += 1 : speedx -= 1;
        (speedy > 0) ? speedy += 1 : speedy -= 1;
        velocityDisplay.innerText = Math.abs(speedx)
    }
    if (event.keyCode === 40 ){
        (speedx > 0) ? speedx -= 1 : speedx += 1;
        (speedy > 0) ? speedy -= 1 : speedy += 1;
        velocityDisplay.innerText = Math.abs(speedx )
    }
})


//Changes speed based on up arrow

document.getElementById("control-down").addEventListener("click",(event) =>{
    if (speedy === 0) {
    return
    }
    if (speedy > 0 || speedx > 0){
        (speedx > 0) ? speedx -= 1 : speedx += 1;
        (speedy > 0) ? speedy -= 1 : speedy += 1;
        velocityDisplay.innerText = Math.abs(speedx)
    }
})

document.getElementById("control-up").addEventListener("click",(event) =>{
    (speedx > 0) ? speedx += 1 : speedx -= 1;
    (speedy > 0) ? speedy += 1 : speedy -= 1;
    velocityDisplay.innerText = Math.abs(speedx)
})


//Functions for when you press a key it will let the paddle move left or right
//When you release a key it won't allow the paddle to move left or right
function keyDownHandler(event) {
    if(event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCanvas()
    init()
    draw()
    drawBall()
  }); 



