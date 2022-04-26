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
const ballRadius = 8
const textForBoard = {
scoreT: "Score", 
lifeT: "Life", 
gateT: "Gate"
}
let brick = []
let rightArrowBtn = false
let leftArrowBtn = false
let lifeScores = 3 // player life
let scores = 0 // player's score
let levelGate = 1
let maxGate = 8
let gameOVer = false
let scoresUnit = 1
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

// Create the ball and Draw
const theBall = {
x: canvas.width/2,
y: paddle.y - ballRadius,
radius: ballRadius,
speed: 4,
 deltaX: 3 * (Math.random() * 2 - 1),
deltaY: -3
}
function ballDraw (){
    ctx.beginPath()
    ctx.arc(theBall.x, theBall.y, theBall.radius, 0, Math.PI*2)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

 // Move the Ball by creating a function:

 function ballMove(){
    theBall.x += theBall.deltaX
    theBall.y += theBall.deltaY
 } 

// create a function for the Ball Collision to the wall

function ballCollision (){
    if(theBall.x + theBall.radius > canvas.width || theBall.x - theBall.radius < 0){
        theBall.deltaX = - theBall.deltaX
    }
    if(theBall.y - theBall.radius < 0){
        theBall.deltaY = -theBall.deltaY
    }
    if(theBall.y + theBall.radius > canvas.height){
        lifeScores-- // this takes one out of the lifeScore point when the ball fall behind the paddle.
        ballReset()
    }
}
// Function that reset the ball when the ball goes behind the paddle.
function ballReset (){
theBall.x = canvas.width/2
theBall.y = paddle.y - ballRadius
   theBall.deltaX = 3 * (Math.random() * 2 - 1)
theBall.deltaY = -3
}

// Function that take care of the ball collision with the paddle

function ballCollisionToPaddle(){
    if (theBall.x < paddle.x + paddle.width && theBall.x > paddle.x && paddle.y < paddle.y + paddle.height && theBall.y > paddle.y){
       // Create a variable to check the collision point where the ball hit the paddle. And normalize the values.
    let collisionPoint = theBall.x - (paddle.x + paddle.width/2)
        collisionPoint = collisionPoint / (paddle.width/2)
       //  create a variable to calculate the Angle of the ball
        let angleBall = collisionPoint * Math.PI/3

        theBall.deltaX = - theBall.speed * Math.sin(angleBall)
        theBall.deltaY = - theBall.speed * Math.cos(angleBall)
    }
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

// An event that for the user keypress: Left arrow or Right arrow
document.addEventListener('keydown', e =>{
    if (e.key === 'ArrowLeft'){
leftArrowBtn = true
    } else if (e.key === 'ArrowRight'){
        rightArrowBtn = true
    }


})

document.addEventListener('keyup', e =>{
    if (e.key === 'ArrowLeft'){
        leftArrowBtn = false
    } else if (e.key === 'ArrowRight'){
        rightArrowBtn = false
    }


})

// Now I will create the Bricks.
const bricks = {
    row : 1,
    column : 10,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 40,
    fillColor : 'gray',
    colorStroke : "purple"
}

// r = rows and c = column for the bricks
function bricksCreation(){
    for (let r =0; r < bricks.row; r++ ){
        brick[r] = []
        for(let c = 0; c < bricks.column; c++){
            brick[r][c] = {
                x : c * (bricks.offSetLeft + bricks.width) + bricks.offSetLeft,
                y : r * (bricks.offSetTop + bricks.height) + bricks.offSetTop + bricks.marginTop,
                status : true
            }
        }
    }
}
bricksCreation()
//Draw the Bricks
function drawBricks(){
    for (let r =0; r < bricks.row; r++ ){
        for(let c = 0; c < bricks.column; c++){
            let bR = brick[r][c]
            // this check for broken bricks. if the brick is broken
            if(bR.status){
                ctx.fillStyle = bricks.fillColor
                ctx.fillRect(bR.x, bR.y, bricks.width, bricks.height)

                // the stroke of the bricks
                ctx.strokeStyle = bricks.colorStroke
                ctx.strokeRect(bR.x, bR.y, bricks.width, bricks.height)
            }
            }
        }
}

//Below is the ball to bricks collision

function ballToBrickCollision (){
    for (let r =0; r < bricks.row; r++ ){
        for(let c = 0; c < bricks.column; c++){
            let bR = brick[r][c]
            // this check for broken bricks. if the brick is broken
            if(bR.status){
            if(theBall.x + theBall.radius > bR.x && theBall.x - theBall.radius < bR.x + bricks.width && theBall.y + theBall.radius > bR.y && theBall.y - theBall.radius < bR.y + bricks.height){
                theBall.deltaY = - theBall.deltaY
                bR.status = false // this is false because when the brick is broken status becomes false.
                scores += scoresUnit
            }
            }
            }
        }
}

// Create a game stats by using a function
function gameStats(text, textX, textY){
    ctx.fillStyle = 'white'
    ctx.font = "bold 15px serif"
    ctx.fillText(text, textX, textY)
}

// Create a function for the Gate 

function gatesOpen(){
    let isGatesOpened = true

    for (let r =0; r < bricks.row; r++ ){
        for(let c = 0; c < bricks.column; c++){
            isGatesOpened = isGatesOpened && !brick[r][c].status
            }
        }
if (isGatesOpened){
    if (levelGate >= maxGate){
        gameOVer = true
        return
    }
    bricks.row++
    bricksCreation()
    theBall.speed += 0.8
    ballReset()
    levelGate++
}
}
// Create a game over function>

function gameOverr (){
    if (lifeScores <= 0){
        gameOVer = true
    }
}
// Create function draws, it will draw everthing. 
function draws (){
    drawingPaddle()
    ballDraw()
    drawBricks()
    gameStats(lifeScores, canvas.width/2, 25)
    gameStats(textForBoard.lifeT, (canvas.width/2) -30, 25)
    gameStats(levelGate, canvas.width - 25, 25)
    gameStats(textForBoard.gateT, (canvas.width -25) -50, 25)
    gameStats(scores, 85, 25)
    gameStats(textForBoard.scoreT, 35, 25)

    
}

// updateGame function is where I will put the game logic 

function updateGame(){
paddleMove()
ballMove()
ballCollision()
ballCollisionToPaddle()
ballToBrickCollision()
gameOverr()
gatesOpen()
}

// Create the game Loop by creating a function. Inisde that function I will put three function ( draw(), updateG (), )

function loopFunc (){
    ctx.drawImage(backImg, 0, 0)
    draws()
    updateGame()
    if(!gameOVer){
    requestAnimationFrame(loopFunc)
    }
}
loopFunc()

