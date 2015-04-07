var HelperMethods = function(){}

HelperMethods.prototype.makeBoundingBox = function(x, y, imageUrl){
  var img = Resources.get(imageUrl);
  return { x: x, y: y, width: img.width, height: img.height};
}

HelperMethods.prototype.collisionDetected = function(box1, box2){
  if (box1.x < (box2.x + box2.width) &&
     (box1.x +  box1.width) > box2.x &&
      box1.y < (box2.y + box2.height) &&
     (box1.height + box1.y) > box2.y) {
      // collision detected!
      return true;
  } else
    false;
}

var helperMethods = new HelperMethods();

// Enemies our player must avoid
var Enemy = function(name) {

  function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  this.randomSpeed = function(){
    var randomSpeeds    = [100, 125, 150];
    var index = getRandomInt(0, randomSpeeds.length);
    return randomSpeeds[index];
  }

  this.randomPosX = function(){
    var randomStartPosX = [30, 0, 50, 40, 75];
    var index = getRandomInt(0, randomStartPosX.length);
    return randomStartPosX[index];
  }

  this.randomPosY = function(){
    var randomStartPosY = [140, 160, 180, 200, 220, 250, 300];
    var index = getRandomInt(0, randomStartPosY.length);
    return randomStartPosY[index];
  }

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.startX = this.randomPosX();
  this.startY = this.randomPosY();
  this.x = this.startX;
  this.y = this.startY;
  this.vx = this.randomSpeed();
  this.vy = 0;
  this.name = name;
}

//stop watch
var StopWatch = function (){
  this.startTime = 0;
  this.stopTime = 0;
  this.running = false;
  this.performance = performance === false ? false : !!window.performance;
};

StopWatch.prototype.isRunning = function(){
  return this.running;
}

StopWatch.prototype.currentTime = function () {
  return this.performance ? window.performance.now() : new Date().getTime();
};

StopWatch.prototype.start = function () {
  this.startTime = this.currentTime();
  this.running = true;
};

StopWatch.prototype.stop = function () {
  this.stopTime = this.currentTime();
  this.running = false;
};

StopWatch.prototype.getElapsedMilliseconds = function () {
  if (this.running) {
    this.stopTime = this.currentTime();
  }

  return this.stopTime - this.startTime;
};

StopWatch.prototype.getElapsedSeconds = function () {
  return Math.round(this.getElapsedMilliseconds() / 1000);
};

StopWatch.prototype.getElapsedMinutes = function () {
  var seconds = Math.round(this.getElapsedSeconds());
  if (seconds >= 60)
    return Math.round(seconds / 60);
  else
    return 0;
};

StopWatch.prototype.getElapsedHours = function () {
  var minutes = this.getElapsedMinutes();
  if (minutes >= 60)
    return (minutes / 60);
  else
    return 0;
};

StopWatch.prototype.getElapsedTimeString = function(){
  var seconds = this.getElapsedSeconds();
  if (seconds >= 60)
    seconds = seconds % 60;
  if (seconds < 10)
    seconds = '0' + seconds;

  var minutes = this.getElapsedMinutes();
  if (minutes < 10)
    minutes = '0' + minutes;

  var hours = this.getElapsedHours();
  if (hours < 10)
    hours = '0' + hours;

  return hours + ':' + minutes + ':' + seconds;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 400)
      this.x += this.vx * dt;
    else
      this.regenerate();

    this.y += this.vy * dt;
    var img = Resources.get(this.sprite);
    if (typeof img !== 'undefined'){
      this.boundingBox = helperMethods.makeBoundingBox(this.x,
                                                       this.y,
                                                       this.sprite);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.checkCollision = function(){
  if (typeof(this.boundingBox) !== 'undefined' && typeof(player.boundingBox) !== 'undefined'){
    return helperMethods.collisionDetected(this.boundingBox, player.boundingBox);
  }
}

Enemy.prototype.regenerate = function(){
  this.startX = this.randomPosX();
  this.startY = this.randomPosY();
  this.x = this.startX;
  this.y = this.startY;
  this.vx = this.randomSpeed();
}

var playerPositions = {
   450: 'bottom',
   350: 'second',
   250: 'third',
   150: 'fourth',
    50: 'top'
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.score = 0;
  this.numberOfAttempts = 0;
  this.numberOfSuccess = 0;
  this.elapsedTime = '00:00:00';
  this.scoredPositions = {};
  this.initPosition();
  this.initScoredPositions();
  this.bitten = false;
}

Player.prototype.update = function() {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += 0;
  this.y += 0;
  var img = Resources.get(this.sprite);
  if (typeof img !== 'undefined')
    this.boundingBox = helperMethods.makeBoundingBox(this.x, this.y, this.sprite);
  this.elapsedTime = stopWatch.getElapsedTimeString();
  if (this.scoredPositions[this.y] === 0){
    this.score += scoreCalculator.getPoints(this.y);
    this.scoredPositions[this.y] = 1;
  }
  var position = playerPositions[this.y];
  if (position == 'top' ){
    this.reachedGoal = true;
  }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.initPosition = function(){
  this.x = 220;
  this.y = 450;
  this.deltaX = 100;
  this.deltaY = 100;
}

Player.prototype.initScoredPositions = function(){
  var scoredPositions = {};
  $.each(playerPositions, function(key, val){
    scoredPositions[key] = 0;
  });
  this.scoredPositions = scoredPositions;
  this.reachedGoal = false;
  this.bitten = false
}

Player.prototype.handleInput = function(dir){
  if (paused) return;
  if (dir === 'left'){
    if (this.x > 20){
      this.x -= this.deltaX;
    }
  } else if (dir === 'right'){
    if (this.x < 400){
      this.x += this.deltaX;
    }
  } else if (dir === 'up'){
    if ( this.y > 50){
      this.y -= this.deltaY;
    }
  } else {
    if (this.y < 450){
      this.y += this.deltaY;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player;
var scoreCalculator = new ScoreCalculator();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
