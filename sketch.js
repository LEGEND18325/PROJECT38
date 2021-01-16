// after moving the ironman left and right ,you can press the space key to shoot lasers;





var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage,restartImage;
var powerSound,gameoverSound,explosionSound;


var spaceimage,space;
var astroidsimage,astroids,astroidsGroup;
var ironmanimage,ironman;
var laserimage,laserGroup,laser;
var powerupimage,powerupGroup,powerup;
var score;

function preload(){
spaceimage=loadImage("background.jpg");
  astroidsimage=loadImage("ASTROIDS.png");
  ironmanimage=loadImage("ironman5.png");
  laserimage=loadImage("LASER.jpg");
  powerupimage=loadImage("power up.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  powerSound = loadSound("power.mp4");
  gameoverSound = loadSound("GAMEOVER.mpeg");
  explosionSound = loadSound("Explosion.mp3");
  
}

function setup() {
  createCanvas(500,465);
  space=createSprite(250,250,50,50);
 space.addImage("space",spaceimage);
  space.scale=1;
  space.velocityY=3;
  
    //space.depth = score.depth;
    //score.depth = score.depth + 1;
  
  ironman=createSprite(250,250,50,50);
   camera.position.y=ironman.y;
     ironman.addImage("ironman",ironmanimage);
  ironman.scale=0.2;
  ironman.setCollider("rectangle",0,0,150,250);
  ironman.debug = false;
  
  gameOver = createSprite(250,250);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.9;
  
  
  restart = createSprite(250,290);
  restart.addImage(restartImage);
  restart.scale = 0.7;
  
  
   
  
  
  astroidsGroup=new Group();
  laserGroup=new Group();
  powerupGroup=new Group();
  score = 0;
}

function draw() {
 background("black");
  if(gameState === PLAY){
    
   if(space.y>400){
     space.y=250;
   }
   gameOver.visible = false;
    restart.visible = false;
    
  
  if(keyDown("left_arrow")){
    
    ironman.x=ironman.x-3        
    } 
    
  if(keyDown("right_arrow")){
    
    ironman.x=ironman.x+3        
    
  }
  
  
    if(keyDown("space"))
    {
      var  laser=spawnlaser();
    }
    
    
    if(laserGroup.isTouching(astroids)){ 
       explosionSound.play() 
       astroidsGroup.destroyEach();
       laserGroup.destroyEach();
       
     }
    
    
   if(powerupGroup.isTouching(ironman)){ 
       powerupGroup.destroyEach();
       powerSound.play() 
       score=score+1;
     }
    
    
    spawnAstroids();
   spawnpowerup();
    
    
    if(astroidsGroup.isTouching(ironman)){ 
        gameoverSound.play() 
     astroidsGroup.destroyEach();
    ironman.scale=-0.2;
       ironman.velocityY=ironman.velocityY+10;
      
      gameState = END;
      
     }
  
    
  }
  
  else if (gameState === END) {
    
    gameOver.visible = true;
    restart.visible = true;
   
    
     astroidsGroup.setVelocityXEach(0);
    powerupGroup.setVelocityXEach(0);
     laserGroup.setVelocityXEach(0); 
    space.velocityY = 0;
   
    
     if(mousePressedOver(restart)) {
      reset();
    }
    
    
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  drawSprites();
  fill("red");
  textSize(20)
  text("Score: "+ score, 10,15);
}

function spawnlaser()
{
    
    laser=createSprite(500,150,5,10)  
    laser.addImage(laserimage);
    //laser.velocityY=-10;
   laser.velocityY = -(10 + score/10);
    laser.scale=0.3 ;
    laser.x=ironman.x;
    laser.lifetime=180;
    laserGroup.add(laser);
}









function spawnAstroids(){
  if(frameCount%60===0){
   astroids=createSprite(250,1,100,100);
  astroids.addImage("astroids",astroidsimage);
  //astroids.velocityY=10
  astroids.velocityY = (10 + score/10);
  astroids.scale=0.3; 
  astroids.x=Math.round(random(50,450))
  astroids.lifetime=200;
  astroidsGroup.add(astroids)
    
  }  
    
  
}

function spawnpowerup()
{
    if(frameCount%60===0){
    powerup=createSprite(500,1,5,10)  
    powerup.addImage(powerupimage);
 // powerup.velocityY=10;
    powerup.velocityY = (10 + score/10);  
    powerup.scale=0.1 ;
    powerup.x=Math.round(random(50,450))
    powerup.lifetime=250;
    powerupGroup.add(powerup);
      
    }
}

function reset(){
  gameState=PLAY;
    gameOver.visible=false;
  
    restart.visible=false;
    astroidsGroup.destroyEach();
   powerupGroup.destroyEach();
  laserGroup.destroyEach();
  ironman.x=250;
  ironman.y=250;
  ironman.scale=0.2;
  ironman.velocityY=0;
  space.velocityY=3;
  score=0;
}


