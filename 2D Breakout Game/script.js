const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddlePosX = (canvas.width - paddleWidth) / 2;

let moveRight = false;
let moveLeft = false;

const brickRows = 3;
const brickColumns = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives = 3;

const bricks = Array.from({ length: brickColumns }, () =>
    Array.from({ length: brickRows }, () => ({ x: 0, y: 0, active: 1 }))
);

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);

function handleKeyDown(event) {
    if (event.key === "Right" || event.key === "ArrowRight") moveRight = true;
    else if (event.key === "Left" || event.key === "ArrowLeft") moveLeft = true;
}

function handleKeyUp(event) {
    if (event.key === "Right" || event.key === "ArrowRight") moveRight = false;
    else if (event.key === "Left" || event.key === "ArrowLeft") moveLeft = false;
}

function detectCollisions() {
    bricks.forEach((column, colIndex) => {
        column.forEach((brick, rowIndex) => {
            if (brick.active && ballX > brick.x && ballX < brick.x + brickWidth &&
                ballY > brick.y && ballY < brick.y + brickHeight) {
                ballSpeedY = -ballSpeedY;
                brick.active = 0;
                score++;
                if (score === brickRows * brickColumns) {
                    alert("Congrats Sai Sreeram Nanapu, you won!");
                    document.location.reload();
                }
            }
        });
    });
}

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#0066cc";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddlePosX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0066cc";
    context.fill();
    context.closePath();
}

function drawBricks() {
    bricks.forEach((column, colIndex) => {
        column.forEach((brick, rowIndex) => {
            if (brick.active) {
                const brickX = colIndex * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = rowIndex * (brickHeight + brickPadding) + brickOffsetTop;
                brick.x = brickX;
                brick.y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#0066cc";
                context.fill();
                context.closePath();
            }
        });
    });
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0066cc";
    context.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    context.font = "16px Arial";
    context.fillStyle = "#0066cc";
    context.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    detectCollisions();

    if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        if (ballX > paddlePosX && ballX < paddlePosX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        } else {
            lives--;
            if (lives === 0) {
                alert("Game Over, Sai Sreeram Nanapu!");
                document.location.reload();
            } else {
                ballX = canvas.width / 2;
                ballY = canvas.height - 30;
                ballSpeedX = 3;
                ballSpeedY = -3;
                paddlePosX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (moveRight && paddlePosX < canvas.width - paddleWidth) {
        paddlePosX += 7;
    } else if (moveLeft && paddlePosX > 0) {
        paddlePosX -= 7;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    requestAnimationFrame(gameLoop);
}

gameLoop();
