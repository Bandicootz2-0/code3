var splashScreenimg;
var bg_img;
var playBtn, abtBtn;
var player_img, player;
var enemy, enemyGroup;
var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7;
var benefit1, benefit2, benefit3
var benefit, benefitGroup;
var bulletimg;
var bullet, bulletGroup;
var score = 0;
var health = 100;
var maxHealth = 100;
var gameState = "wait";


function preload() {
    splashScreenimg = loadImage("assets/mainScreen.gif");
    player_img = loadImage("assets/player.gif");
    bg_img = loadImage("assets/bg1.png");
    enemy1 = loadImage("assets/explodingzombie.gif")
    enemy2 = loadImage("assets/zombie.gif")
    enemy3 = loadImage("assets/regZom.gif")
    enemy4 = loadImage("assets/speedyZom.gif")
    enemy5 = loadImage("assets/happygreen.gif")
    enemy6 = loadImage("assets/redminizombie.gif")
    enemy7 = loadImage("assets/blackenemy.gif")
    benefit1 = loadImage("assets/key.png")
    benefit2 = loadImage("assets/laser.png")
    benefit3 = loadImage("assets/potion.png")
    bulletimg = loadImage("assets/bullet.png")
  }

function setup(){
    createCanvas(700,700);

    playBtn= createImg("assets/startbutton.png");
    playBtn.position(250,300);
    playBtn.size(80,80);
    playBtn.hide();
    
    abtBtn= createImg("assets/helpbutton.png");
    abtBtn.position(350,300);
    abtBtn.size(80,80);
    abtBtn.hide();

    player = createSprite(50,490)
    player.addImage(player_img)
    player.scale = 0.45
    player.visible = false

    enemyGroup = new Group();
    benefitGroup = new Group();
    bulletGroup = new Group();
}

function draw(){
    if(gameState == "wait"){
        background(splashScreenimg);
        playBtn.show();
        abtBtn.show();
    }
    playBtn.mousePressed( () => {
        playBtn.hide();
        abtBtn.hide();
        gameState = "level1";
    })

    
    abtBtn.mousePressed( ()=> {
        playBtn.hide();
        abtBtn.hide();
        gameState = "about";
    })
    if(gameState == "level1"){
        background(bg_img);
        player.visible = true;
        movement();
        spawnEnemies();
        spawnBenefits();
        healthLevel();
        if(keyDown("space")){
          spawnBullets();
        }

      for(var i = 0; i<enemyGroup.length; i++){
          if(bulletGroup.isTouching(enemyGroup.get(i))){
              score +=10;
              enemyGroup.get(i).remove();
              bulletGroup.destroyEach();
            }
        }
        
    
    for(var i = 0; i<enemyGroup.length; i++){
            if(player.isTouching(enemyGroup.get(i))){
              health -=50;
              enemyGroup.get(i).remove();
              bulletGroup.destroyEach();
            }
        }

    if(health>0 && score>=10){
      gameState= "nextLevelInfo"
      bulletGroup.destroyEach();
      enemyGroup.destroyEach();
      benefitGroup.destroyEach();
      player.visible = false;
    }
    if(health <=0){
      gameState= "gameEnd"
      bulletGroup.destroyEach();
      enemyGroup.destroyEach();
      benefitGroup.destroyEach();
      player.visible = false;
    }   
    }

   if(gameState=="nextLevelInfo"){
    nextLevelInfoPopUp();
   }

   if(gameState == "gameEnd"){
    gameEnd();
   }

    if(gameState == "about"){
        AbtFunc();
    }
    drawSprites();
    if(gameState=="level1"){
      fill("red");
      textSize(20);
      text("Score: " + score, 600, 100);
    }
}

function AbtFunc(){
    swal({
        title: "About this game",
        text: "Zombies appear from all sides, aim your player to kill the zombies",
        textAlign: "CENTER",
        imageUrl: "assets/mainScreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Back to game",
        confirmButtonColor:"Red"
    },
    function () {
        gameState = "wait"
    })
}

function movement(){
  if(player.x >= 650){
    player.x = 650;
  }
  if(player.x <= 10){
    player.x = 10;
  }
  if(player.y <=10){
    player.y = 10
  }

  if(player.y >= 480){
    player.y = 480;
  }
  if(keyDown("up_arrow")){
    player.velocityY = -10;
  }
  player.velocityY = player.velocityY + 0.8;
  if(keyDown("left_arrow")){
    player.x -= 3;
  }
  if(keyDown("right_arrow")){
    player.x += 3;
  }
  
}

function spawnEnemies(){
  
  if(frameCount%100 == 0){
    var random = Math.round((Math.random()*4)+1);
    console.log("random value" + random);
    enemy = createSprite(720, 490);
    
    switch(random){
      case 1: 
        enemy.addImage(enemy5)
        enemy.scale = 0.4;
        enemy.velocityX = -2;
        break;
      case 2:
        enemy.addImage(enemy6)
        enemy.scale = 0.4;
        enemy.velocityX = -2;
        break;
      case 3:
        enemy.addImage(enemy7)
        enemy.scale = 0.3;
        enemy.velocityX = -2;
        break;
      case 4:
        enemy.addImage(enemy4)
        enemy.scale = 0.3;
        enemy.velocityX = -5;
        break;
      default:
        break;

    }
    enemyGroup.add(enemy);
  }
}

function spawnBenefits(){
  
  if(frameCount%260 == 0){
    var random = Math.round((Math.random()*4)+1);
    console.log("random value" + random);
    benefit = createSprite(720, 490);
    
    switch(random){
      case 1: 
        benefit.addImage(benefit2)
        benefit.scale = 0.2;
        benefit.velocityX = -2;
        break;
      case 2:
        benefit.addImage(benefit3)
        benefit.scale = 1;
        benefit.velocityX = -2;
        break;  
      default:
        break;

    }
    benefitGroup.add(benefit);
  }
}

function spawnBullets(){
  bullet = createSprite(player.x + 20, player.y -10, 10,10);
  bullet.addImage(bulletimg);
  bullet.scale = 0.20;
  bullet.velocityX = 2;
  bullet.depth = player.depth;
  player.depth += 1;
  bulletGroup.add(bullet);
}

function healthLevel(){
  stroke("lightgreen");
  strokeWeight(10);
  noFill();
  rect(100,100, maxHealth, 20);

  noStroke();
  fill("green");
  rect(100,100, health, 20);
}

function nextLevelInfoPopUp(){
  swal({
    title: "Level 1 Win",
    text: "Zombies appear from all sides, aim your player to kill the zombies",
    textAlign: "CENTER",
    imageUrl: "assets/mainScreen.gif",
    imageSize: "200x200",
    confirmButtonText: "Go to Level2",
    confirmButtonColor:"Green"
},
function () {
    gameState = "level2"
})
}


function gameEnd(){
  swal({
    title: "Game Over",
    text: "restart to play again",
    textAlign: "CENTER",
    imageUrl: "assets/mainScreen.gif",
    imageSize: "200x200",
    confirmButtonText: "restart",
    confirmButtonColor:"green"
},
function () {
    gameState = "wait"
})
}