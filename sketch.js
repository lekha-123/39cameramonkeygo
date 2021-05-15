var backImage, backgr;
var player, player_running;
var ground, ground_img;
var gameover,endsprite

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var bananaImage;
var obstaclesGroup;
var Foodgroup;
var score;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  gameOver = loadImage("gameOver.png");
  StoneImage = loadImage("stone.png");
gameover=loadImage("gameOver.png");

}

function setup() {
  createCanvas(displayWidth, displayHeight);

  backgr = createSprite(200, 300, 300,200);
  backgr.addImage(backImage);
  backgr.scale =2.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(displayWidth/6, displayHeight-150, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;
  

  ground = createSprite(displayWidth/6, displayHeight-125, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;

  endsprite=createSprite(displayWidth/2,displayHeight/2 );
endsprite.addImage(gameover);
endsprite.visible=false;
}

function draw() {

  background(0);
  
  camera.position.x=displayWidth/2;
  camera.position.y=player.y;
  if (gameState === PLAY) {

    if (backgr.x < 400) {
      backgr.x = backgr.width / 2;
    }

    if (keyDown("space")) {
      player.velocityY = -17;
    }
    spawnFood();
    spawnobstacles();
    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      player.scale += 0.05;
       score = score + 2;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);
    if (obstaclesGroup.isTouching(player)) {
      gameState = END;
    }
  } else if (gameState === END) {

    backgr.velocityX = 0;
    player.visible = false;
    camera.position.x=displayWidth/2;
    camera.position.y=displayHeight/2;
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
endsprite.visible=true;
    textSize(30);
    fill(255);
    stroke("red");
    text("Game Over!",  displayWidth-400, displayHeight-700);
  }

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, displayWidth-400, displayHeight-700)
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(displayHeight/2, displayHeight/3);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = displayWidth;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }

}

function spawnobstacles() {
  if (frameCount % 200 === 0) {
    var obstacles = createSprite(600, 250, 40, 10);
    obstacles.y = random(displayHeight/7, displayHeight/3);
    obstacles.addImage(StoneImage);
    obstacles.scale = 0.1;
    obstacles.velocityX = -4;

    obstacles.lifetime = displayWidth;
    player.depth =obstacles.depth + 1;
    obstaclesGroup.add(obstacles);
  }

}