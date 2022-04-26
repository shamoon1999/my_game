var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameoverimg, restartimg, restart;
var man, man_running, man_collided;
var road, roadImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;
var invisibleGround;
var score;
var jumpSound, dieSound;


function preload() {
    man_running = loadAnimation("man-1.jpg", "man-2.jpg", "man-3.jpg");
    man_collided = loadAnimation("man_collided.jpg");
    roadImage = loadImage("Road.png");
    gameoverimg = loadImage("gameOver.png");
    restartimg = loadImage("restart.png");
    obstacle1 = loadImage("obstacle-1.png")
    obstacle2 = loadImage("obstacle-2.png")
    obstacle3 = loadImage("obstacle-3.png")
    obstacle4 = loadImage("obstacle-4.png")
    obstacle5 = loadImage("obstacle-5.png")

    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")

}

function setup() {
    createCanvas(800, 400);
    road = createSprite(width / 2, 200);
    road.addImage(roadImage);
    road.velocityX = -3;


    man = createSprite(50, 100, 10, 10);
    man.addAnimation("running", man_running);
    man.addAnimation("collided", man_collided);
    man.scale = 0.45;

    gameOver = createSprite(300, 100);
    gameOver.addImage("over", gameoverimg);
    gameOver.visible = false;

    restart = createSprite(230, 130);
    restart.addAnimation("restart", restartimg);
    restart.visible = false;

    obstaclesGroup = createGroup();

    man.setCollider("rectangle", 20, 30, 45, 50);
    man.debug = true;

    invisibleGround = createSprite(200, 190, 400, 10);
    invisibleGround.visible = false;

}

function draw() {
    background(180);
    text("Score: " + score, 500, 50);

    if (gameState === PLAY) {

        //    ground.velocityX = -4;//

        score = score + Math.round(frameCount / 60);

       

        if (road.x < 0) {
            road.x = road.width / 2;
        }


        if (keyDown("space") && man.y >= 100) {
            man.velocityY = -13;
        }

        man.velocityY = man.velocityY + 0.8
        spawnObstacles();

        if (obstaclesGroup.isTouching(man)) {
            gameState = END;
            jumpSound.play();
            gameState = END;

        }

    }

    else if (gameState === END) {
        //  ground.velocityX = 0;
        man.velocityY = 0;

        obstaclesGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-2);

        man.changeAnimation("collided", man_collided);

        gameOver.visible = true;
        restart.visible = true;
    }

    man.collide(invisibleGround);
    //  //

    drawSprites();
}
function spawnObstacles() {
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(800, 165, 10, 40);
        obstacle.velocityX = -6;


        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1: obstacle.addImage(obstacle1);
                obstacle.scale = 0.0001;
                break;
            case 2: obstacle.addImage(obstacle2);
                obstacle.scale = 0.0009;
                break;
            case 3: obstacle.addImage(obstacle3);
                obstacle.scale = 0.000013;
                break;
            case 4: obstacle.addImage(obstacle4);
                obstacle.scale = 0.0009;
                break;
            
            default: break;
        }
        obstacle.scale = 0.1;
        obstacle.lifetime = 300;


        obstaclesGroup.add(obstacle);
    }
    if(mousePressedOver(restart)) {
        reset();
      }
}
function reset() {
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    score = 0;



}




