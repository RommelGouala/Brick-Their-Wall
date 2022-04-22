//select Canvas and add border to canvas 
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.style.border = "1px solid black"
// ctx.fillStyle = 'red';
// ctx.fillRect(20, 20, 250, 100)

// Variables init and constant  
const paddle_width = 100
const paddle_Margin_Bottom = 50
const paddle_Height = 20
let rightArrowBtn = false
let leftArrowBtn = false

/* Create the Paddle Object () that takes: x, y, width, height, deltaX ;
The x will contain canvas.width divide by 2 and minus the paddle width ;
The y will contain canvas.height minus paddle margin bottom and minus paddle height ;
The width will contain paddle width ;
The height will contain paddle height ;
The deltaX will contain the number 5 ; */

const paddle = {
    x: canvas.width/2 - paddle_width/2,
    y: canvas.height - paddle_Margin_Bottom - paddle_Height,
    width: paddle_width,
    height: paddle_Height,
    deltaX: 5

}

/* Draw Paddle by creating a function that can draw the Paddle ;

The paddle will be black
The position will be the x y, height, weight, inside the Paddle object above ;
*/

function drawingPaddle(){
    ctx.fillStyle = "black"
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
}

// Control the paddle with the key left and right with a function
function paddleMove (){
    if (rightArrowBtn && paddle.x + paddle.width < canvas.width){
    paddle.x += paddle.deltaX
    }else if (leftArrowBtn && paddle.x > 0){
        paddle.x -= paddle.deltaX
    }

}

document.addEventListener('keydown', e =>{
    if (e.key === 'ArrowLeft'){
leftArrowBtn = true
    } else if (e.key === 'ArrowRight'){
        rightArrowBtn = true
    }


})

document.addEventListener('keyup', e =>{
    if (e.key === 'Arrowleft'){
leftArrowBtn = false
    } else if (e.key === 'ArrowRight'){
        rightArrowBtn = false
    }


})

// Create function draws, it will draw everthing. 
function draws (){
    drawingPaddle()
    
}

// updateGame function is where I will put the game logic 

function updateGame(){
paddleMove()
}

// Create the game Loop by creating a function. Inisde that function I will put three function ( draw(), updateG (), )

function loopFunc (){
    ctx.drawImage(backgroundImg, 0, 0)
    draws()
    updateGame()
    requestAnimationFrame(loopFunc)
}
loopFunc()

