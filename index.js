var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var xVel = yVel = 0;
var playerX = playerY = 10;
var gridSize = tilesCount = 20;
var appleX = appleY = 15;
var trail = [];
var tail = 5;

function keyPush(e){
  switch (e.keyCode) {
    case 37: xVel = -1; yVel = 0;
                break;
    case 38: xVel = 0; yVel = -1;
                break;
    case 39: xVel = 1; yVel = 0;
                break;
    case 40: xVel = 0; yVel = 1;
                break;
  }
}
document.addEventListener('keydown', keyPush);

setInterval(game, 1000/10);

function game() {
  snakeMovement();
  drawEverything();
}

function snakeMovement() {
  playerX += xVel;
  playerY += yVel;

// Check if snake is out of bounds
  if (playerX < 0) {
    playerX = tilesCount - 1;
  }
  if (playerX > tilesCount -1) {
    playerX = 0;
  }
  if (playerY < 0) {
    playerY = tilesCount - 1;
  }
  if (playerY > tilesCount -1) {
    playerY = 0;
  }
}
function drawEverything(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = 'lime';
  for (var i=0;i<trail.length;i++) {
    ctx.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2);
    if (trail[i].x === playerX && trail[i].y === playerY) {
      tail = 5;
    }
  }

  trail.push({x: playerX, y: playerY});
  while (trail.length>tail) {
    trail.shift();
  }

   if (playerX === appleX && playerY === appleY) {
    tail++;
    appleX = Math.floor(Math.random()*tilesCount);
    appleY = Math.floor(Math.random()*tilesCount);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2);
}
