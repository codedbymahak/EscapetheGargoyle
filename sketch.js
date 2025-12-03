let x, y;
let xspeed, yspeed;
let ballSize = 30;
let lost = false;
let score = 0;
let ballImg;
let start = false;
let speedTimer = 0;
let speedIncreaseRate = 1.05;
let maxSpeed = 20;
let offCanvas = false;

function setup() {
  createCanvas(400, 400);

  x = random(ballSize/2, width - ballSize/2);
  y = random(ballSize/2, height - ballSize/2);

  xspeed = random(-5, 5);
  yspeed = random(-5, 5);
}

function preload() {
  ballImg = loadImage("ball.png");
}

function draw() {
  if (!start) {
    startButton();
    return;
  }

  // Check if mouse went off canvas
  offCanvas = mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height;
  if (offCanvas) lost = true;

  if (lost) {
    background(0, 51, 102);
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    if (offCanvas) {
      text("YOU WENT OFF CANVAS!", width / 2, height / 2);
    } else {
      text("YOU LOSE!", width / 2, height / 2);
    }

    textSize(24);
    text("Score: " + score.toFixed(2), width / 2, height / 2 + 40);
    return;
  }

  // Update score
  score += deltaTime / 1000;

  // Increase speed over time
  speedTimer += deltaTime / 1000;
  if (speedTimer >= 1) {
    xspeed *= speedIncreaseRate;
    yspeed *= speedIncreaseRate;
    speedTimer = 0;

    xspeed = constrain(xspeed, -maxSpeed, maxSpeed);
    yspeed = constrain(yspeed, -maxSpeed, maxSpeed);
  }

  background(255);
  fill(0);
  textSize(20);
  text("Score: " + score.toFixed(2), 55, 25);

  image(ballImg, x - ballSize/2, y - ballSize/2, ballSize, ballSize);

  x += xspeed;
  y += yspeed;

  if (x > width - ballSize/2 || x < ballSize/2) xspeed *= -1;
  if (y > height - ballSize/2 || y < ballSize/2) yspeed *= -1;

  // Check collision with the ball
  let d = dist(mouseX, mouseY, x, y);
  if (d < ballSize/2) {
    lost = true;
  }
}

function startButton() {
  background(255, 230, 240);
  fill(224, 0, 112);
  let w = 140;
  let h = 60;
  let bx = width / 2 - w / 2;
  let by = height / 2 - h / 2;

  rect(bx, by, w, h);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Click to Start", width / 2, height / 2);

  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Don't touch the Gargoyle!!!\nOr go off canvas!!!", width / 2, height / 2 - 100);
}

function mousePressed() {
  if (!start) {
    let w = 140;
    let h = 60;
    let bx = width / 2 - w / 2;
    let by = height / 2 - h / 2;
    if (mouseX > bx && mouseX < bx + w && mouseY > by && mouseY < by + h) {
      start = true;
      lost = false;
      offCanvas = false;
      score = 0;

      x = random(ballSize/2, width - ballSize/2);
      y = random(ballSize/2, height - ballSize/2);

      xspeed = random(-5, 5);
      yspeed = random(-5, 5);
      speedTimer = 0;
    }
  }
}
