// screen related variables
var score = document.getElementById("score");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var padding = 10;

// key bools
var upPressed;
var downPressed;
var leftPressed;
var rightPressed;
var wPressed;
var sPressed;
var aPressed;
var dPressed;
var twoPlayer;
var oneBall;
var ai;

// game variables
var paused = false;
var blueScore = 0;
var redScore = 0;

// paddle variables when taller vertically
var paddleW = 10; // width
var paddleH = 150; // height
var paddleS = 10; // speed

var paddle1 = { // top
  x: canvas.width - (padding + paddleH),
  y: padding,
};

var paddle2 = { // right
  x: canvas.width - (padding + paddleW),
  y: canvas.height - (padding + paddleH),
};

var paddle3 = { // bottom
  x: padding,
  y: canvas.height - (padding + paddleW),
};

var paddle4 = { // left
  x: padding,
  y: padding,
};

// ball variables
var ballR = 10; // radius
var ballS = 5; // speed
var ballX = 1;
var ballY = 2;
var ball1DirX;
var ball1DirY;
var ball2DirX;
var ball2DirY;

var ball1 = { // red

  x: canvas.width / 2,
  y: canvas.height / 2,
};

var ball2 = { // blue
  x: canvas.width / 2,
  y: canvas.height / 2,
};

// event listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// event handlers
function keyDownHandler(e) {
  if (e.key == 'Up' || e.key == 'ArrowUp') {
    upPressed = true;
  }
  if (e.key == 'Down' || e.key == 'ArrowDown') {
    downPressed = true;
  }
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  }
  if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
  if (e.key == 'w' || e.key == 'KeyW') {
    wPressed = true;
  }
  if (e.key == 's' || e.key == 'KeyS') {
    sPressed = true;
  }
  if (e.key == 'a' || e.key == 'KeyA') {
    aPressed = true;
  }
  if (e.key == 'd' || e.key == 'KeyD') {
    dPressed = true;
  }
  if (e.key == 'p' || e.key == 'KeyP') {
    pause();
  }
  if (e.key == 'r' || e.key == "KeyR") {
    resetScore();
  }
  if (e.key == '1' || e.key == 'Digit1') {
    if (twoPlayer) {
      twoPlayer = false;
    }
    else {
      twoPlayer = true;
    }
    resetScore();
  }
  if (e.key == '2' || e.key == 'Numpad2') {
    if (oneBall) {
      oneBall = false;
    }
    else {
      oneBall = true;
    }
  }
  if (e.key == '3' || e.key == 'Numpad3') {
    if (ai) {
      ai = false;
    }
    else {
      ai = true;
    }
  }
}

function keyUpHandler(e) {
  if (e.key == 'Up' || e.key == 'ArrowUp') {
    upPressed = false;
  }
  if (e.key == 'Down' || e.key == 'ArrowDown') {
    downPressed = false;
  }
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  }
  if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
  if (e.key == 'w' || e.key == 'KeyW') {
    wPressed = false;
  }
  if (e.key == 's' || e.key == 'KeyS') {
    sPressed = false;
  }
  if (e.key == 'a' || e.key == 'KeyA') {
    aPressed = false;
  }
  if (e.key == 'd' || e.key == 'KeyD') {
    dPressed = false;
  }
}

// game functions
function resetScore() {
  redScore = 0;
  blueScore = 0;
}

function sleep(milliseconds) {
  var date = Date.now();
  var currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function redBallStart() {
  ball1.x = canvas.width / 2;
  ball1.y = canvas.width / 2;

  do {
    ball1DirX = math.round(math.random() * ballS);
    ball1DirY = math.round(math.random() * ballS);
  } while (ball1DirX + ball1DirY != ballS || ball1DirX == ball1DirY)

  if (math.round(math.random())) {
    ball1DirX = -ball1DirX;
  }
  if (math.round(math.random())) {
    ball1DirY = -ball1DirY;
  }
}

function blueBallStart() {
  ball2.x = canvas.width / 2;
  ball2.y = canvas.width / 2;

  do {
    ball2DirX = math.round(math.random() * ballS);
    ball2DirY = math.round(math.random() * ballS);
  } while (ball2DirX + ball2DirY != ballS || ball2DirX == ball2DirY)

  if (math.round(math.random())) {
    ball2DirX = -ball2DirX;
  }
  if (math.round(math.random())) {
    ball2DirY = -ball2DirY;
  }
}

// ball1 red scoring and collision
function redBallLogic() {
  if (ball1.y + ball1DirY < ballR + padding + paddleW) { // top wall, paddle1
    if (twoPlayer) {
      if (ball1.x <= canvas.height && ball1.x >= 0) {
        ball1DirY = -ball1DirY;
      }
    }
    else if (ball1.x >= paddle1.x && ball1.x <= (paddle1.x + paddleH)) {
      ball1DirY = -ball1DirY;
    }
    else {
      redScore += 1;
      redBallStart();
    }
  }

  if (ball1.x + ball1DirX > canvas.width - ballR - padding - paddleW) { // right wall, paddle2
    if (paddle2.y <= ball1.y && ball1.y <= (paddle2.y + paddleH)) {
      ball1DirX = -ball1DirX;
    }
    else {
      redScore += 1;
      redBallStart();
    }
  }

  if (ball1.y + ball1DirY > canvas.height - ballR - padding - paddleW) { // bottom wall, paddle3
    if (twoPlayer) {
      if (ball1.x <= canvas.height && ball1.x >= 0) {
        ball1DirY = -ball1DirY;
      }
    }
    else if (ball1.x >= paddle3.x && ball1.x <= (paddle3.x + paddleH)) {
      ball1DirY = -ball1DirY;
    }
    else {
      blueScore += 1;
      redBallStart();
    }
  }

  if (ball1.x + ball1DirX < ballR + padding + paddleW) { // left wall, paddle4
    if (paddle4.y <= ball1.y && ball1.y <= (paddle4.y + paddleH)) {
      ball1DirX = -ball1DirX;
    }
    else {
      blueScore += 1;
      redBallStart();
    }
  }
}

// ball2 blue scoring and collision
function blueBallLogic() {
  if (ball2.y + ball2DirY < ballR + padding + paddleW) { // top wall, paddle1
    if (twoPlayer && ball2.x >= 0 && ball2.x <= canvas.height) { // two player mode, balls bounce off top and bottom walls
      ball2DirY = -ball2DirY;
    }
    else if (ball2.x >= paddle1.x && ball2.x <= (paddle1.x + paddleH)) {
      ball2DirY = -ball2DirY;
    }
    else {
      redScore += 1;
      blueBallStart();
    }
  }

  if (ball2.x + ball2DirX > canvas.width - ballR - padding - paddleW) { // right wall, paddle2
    if (paddle2.y <= ball2.y && ball2.y <= (paddle2.y + paddleH)) {
      ball2DirX = -ball2DirX;
    }
    else {
      redScore += 1;
      blueBallStart();
    }
  }

  if (ball2.y + ball2DirY > canvas.height - ballR - padding - paddleW) { // bottom wall, paddle3
    if (twoPlayer && ball2.x <= canvas.height && ball2.x >= 0) {
      ball2DirY = -ball2DirY;
    }
    else if (ball2.x >= paddle3.x && ball2.x <= (paddle3.x + paddleH)) {
      ball2DirY = -ball2DirY;
    }
    else {
      blueScore += 1;
      blueBallStart();
    }
  }

  if (ball2.x + ball2DirX < ballR + padding + paddleW) { // left wall, paddle4
    if (paddle4.y <= ball2.y && ball2.y <= (paddle4.y + paddleH)) {
      ball2DirX = -ball2DirX;
    }
    else {
      blueScore += 1;
      blueBallStart();
    }
  }
}

function pause() {
  if (paused) {
    sleep(1000);
    drawInterval = setInterval(draw, 10);
    paused = false;
  }
  else {
    clearInterval(drawInterval);
    paused = true;
  }
}

// draw functions
function drawPaddle(paddleN) { // takes in paddle number and draws that paddle
  ctx.beginPath();
  if (paddleN == 1) {
    ctx.rect(paddle1.x, paddle1.y, paddleH, paddleW);
    ctx.fillStyle = "blue";
  }
  else if (paddleN == 2) {
    ctx.rect(paddle2.x, paddle2.y, paddleW, paddleH);
    ctx.fillStyle = "blue";
  }
  else if (paddleN == 3) {
    ctx.rect(paddle3.x, paddle3.y, paddleH, paddleW);
    ctx.fillStyle = "red";
  }
  else if (paddleN == 4) {
    ctx.rect(paddle4.x, paddle4.y, paddleW, paddleH);
    ctx.fillStyle = "red";
  }
  ctx.fill();
}

function drawBall(ballN) { // takes in ball number and draws that ball
  ctx.beginPath();
  if (ballN == 1) {
    ctx.arc(ball1.x, ball1.y, ballR, 0, Math.PI * 2);
    ctx.fillStyle = "red";
  }
  else if (ballN == 2) {
    ctx.arc(ball2.x, ball2.y, ballR, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
  }
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas

  // selection of paddles and balls
  if (twoPlayer) { // two player mode
    drawPaddle(2);
    drawPaddle(4);
  }
  else {
    drawPaddle(1);
    drawPaddle(2);
    drawPaddle(3);
    drawPaddle(4);
  }

  if (oneBall) { // one ball mode
    drawBall(1);
    redBallLogic();
  }
  else {
    drawBall(1);
    drawBall(2);
    redBallLogic();
    blueBallLogic();
  }

  // ball movement
  ball1.x += ball1DirX;
  ball1.y += ball1DirY;

  ball2.x += ball2DirX;
  ball2.y += ball2DirY;

  // ball to ball collision
  if ((ball1.x <= ball2.x + ballR && ball2.x + ballR <= ball1.x) && (ball2.x <= ball1.x + ballR && ball1.x + ballR <= ball2.x)) {
    ball1DirX = -ball1DirX;
    ball1DirY = -ball1DirY;
    ball2DirX = -ball2DirX;
    ball2DirY = -ball2DirY;
  }

  // display score
  score.innerHTML = "Red Score: " + redScore + " - Blue Score: " + blueScore;

  // top paddle 1
  if (leftPressed && paddle1.x > 0 + padding) {
    paddle1.x -= paddleS;
  }
  if (rightPressed && paddle1.x + paddleH < canvas.height - padding) {
    paddle1.x += paddleS;
  }

  // right paddle 2
  if (ai) {
    if ((paddle2.y + (paddleH / 2)) <= ball1.y) {
      paddle2.y += 5;
    }
    if ((paddle2.y + (paddleH / 2)) >= ball1.y) {
      paddle2.y -= 5;
    }
  }
  else {
    if (upPressed && paddle2.y > 0 + padding) {
      paddle2.y -= paddleS;
    }
    if (downPressed && paddle2.y + paddleH < canvas.height - padding) {
      paddle2.y += paddleS;
    }
  }

  // bottom paddle3
  if (aPressed && paddle3.x > 0 + padding) {
    paddle3.x -= paddleS;
  }
  if (dPressed && paddle3.x + paddleH < canvas.height - padding) {
    paddle3.x += paddleS;
  }

  // left paddle4
  if (ai) {
    if ((paddle4.y + (paddleH / 2)) <= ball1.y) {
      paddle4.y += 5;
    }
    if ((paddle4.y + (paddleH / 2)) >= ball1.y) {
      paddle4.y -= 5;
    }
  }
  else {
    if (wPressed && paddle4.y > 0 + padding) {
      paddle4.y -= paddleS;
    }
    if (sPressed && paddle4.y + paddleH < canvas.height - padding) {
      paddle4.y += paddleS;
    }
  }
}

redBallStart();
blueBallStart();
var drawInterval = setInterval(draw, 10);
