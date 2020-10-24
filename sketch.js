var Monkey, Monkey_Animation;
var StoneGroup, Stone_IMG;
var Jungle_IMG, Jungle;
var Banana_IMG,Banana_Group;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime;

function preload(){
  Monkey_Animation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
Stone_IMG = loadImage("stone.png");
Jungle_IMG = loadImage("jungle.jpg");
Banana_IMG = loadImage("banana.png");
}

function setup() {
  createCanvas(800, 400);
  Monkey = createSprite(100,340,20,50);
  Monkey.addAnimation("Running", Monkey_Animation);
  Monkey.scale = 0.1;
  Jungle = createSprite(0,0,800,400);
  Jungle.addAnimation("jungle",Jungle_IMG);
  Jungle.scale = 1.5;
  Jungle.velocityX=-6;
  Jungle.x = Jungle.width/2;
  invisibleGround = createSprite(400,350,800,10);
  invisibleGround.visible = false;
  Banana_Group = new Group();
  StoneGroup = new Group();
  survivalTime = 0;
}

function draw() {
  background(220);
  edges = createEdgeSprites();
  Jungle.depth = Monkey.depth;
  Monkey.depth = Monkey.depth+1;
  if (Jungle.x<0){
      Jungle.x = Jungle.width/2;
      }
   if (gameState===PLAY){
    if(keyDown("space") ) {
      Monkey.velocityY = -12;
    }
  Monkey.velocityY = Monkey.velocityY+1;
  survivalTime = Math.round(getFrameRate()/60);
     survivalTime.depth = Monkey.depth+1;
    text("Survival time:"+survivalTime,150,100);
   Monkey.collide(invisibleGround);
  spawnFood();
  spawnObstacles() ;
   }else if(gameState===END){
     Monkey.y = 165;
     Jungle.velocityX = 0;
   }
  drawSprites();
}
function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
   var Banana = createSprite(600,250,40,10);
    Banana.y = random(120,200);    
    Banana.velocityX = -5;
    
     //assign lifetime to the variable
    //Banana.lifetime = 300;
    Monkey.depth = Banana.depth + 1;
    
    //add image of banana
     Banana.addImage(Banana_IMG);
    Banana.scale=0.05;
    
    //add each banana to the group
    Banana_Group.add(Banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle;
    obstacle = createSprite(800,120,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addAnimation("Stone",Stone_IMG);
    obstacle.scale=0.15;
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    StoneGroup.add(obstacle);
  }
}