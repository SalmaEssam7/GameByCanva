/* Created by Salma Essam  on 20/08/2024. */


const canvas = document.querySelector('canvas');
const C = canvas.getContext('2d');
canvas.width = 1034;
canvas.height = 576;
const ScalCanvas={
  with:canvas.width/4,
  height:canvas.height/4,
}
const floorCollisions2D=[]

for(let i=0; i<floorCollisions.length;i+=36){
  floorCollisions2D.push(floorCollisions.slice(i, i+36))
}
const CollisionBlocks=[]
floorCollisions2D.forEach((row, y)=>{
  row.forEach((symbol, x) => {
   if(symbol===202){
 //   console.log('drow a block here')
    CollisionBlocks.push(
      new CollisionBlock({
      position:{
      x: x * 16,
      y: y * 16,
    }})
      )
   }
  })
})


const platformCollisions2D=[]
for(let i=0; i<platformCollisions.length;i+=36){
  platformCollisions2D.push(platformCollisions.slice(i, i+36))
}

const platformCollisionBlocks=[]
platformCollisions2D.forEach((row, y)=>{
  row.forEach((symbol, x) => {
   if(symbol===202){
  //  console.log('drow a block here')
    platformCollisionBlocks.push(
      new CollisionBlock({
      position:{
      x: x * 16,
      y: y * 16,
    },
    height: 4
  })
      )
   }
  })
})

const gravity = 0.1;

const player = new Player({
  position:{
    x: 100,
    y: 300,
  },
  CollisionBlocks,
  platformCollisionBlocks,
  imageSrc:'./images/warrior/Idle.png',
  frameRate:8,
  animations:{
    Idle:{
      imageSrc:'./images/warrior/Idle.png',
     frameRate:8,
     frameBuffer:3,
    },
    IdleLeft:{
      imageSrc:'./images/warrior/IdleLeft.png',
     frameRate:8,
     frameBuffer:3,
    },
    Run:{
      imageSrc:'./images/warrior/Run.png',
     frameRate:8,
     frameBuffer:5,
    },
    RunLeft:{
      imageSrc:'./images/warrior/RunLeft.png',
     frameRate:8,
     frameBuffer:5,
    },
    Jump:{
      imageSrc:'./images/warrior/Jump.png',
     frameRate:2,
     frameBuffer:5,
    },
    JumpLeft:{
      imageSrc:'./images/warrior/JumpLeft.png',
     frameRate:2,
     frameBuffer:5,
    },
    Fall:{
      imageSrc:'./images/warrior/Fall.png',
     frameRate:2,
     frameBuffer:5,
    },
    FallLeft:{
      imageSrc:'./images/warrior/FallLeft.png',
     frameRate:2,
     frameBuffer:5,
    }
  }
});
// const player2 = new Player({
//   x: 300,
//   y: 100,
// });

const Keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position:{
    x: 0,
    y: 0,
  },
  imageSrc:'./images/background.png',
});
const backgrondImageHeight = 432
const camera = {
  position:{
    x: 0,
    y: -backgrondImageHeight + ScalCanvas.height,
  },
}


function animate() {
  window.requestAnimationFrame(animate);
  C.fillStyle = 'white';
  C.fillRect(0, 0, canvas.width, canvas.height);

  C.save()
  C.scale(4,4)
  C.translate(camera.position.x,camera.position.y)
  background.update()

  // CollisionBlocks.forEach(collisionBlock =>{
  //   collisionBlock.update()
  // })

  // platformCollisionBlocks.forEach(Block =>{
  //   Block.update()
  // })

player.checkForHorizentalCanvasCollsion()
  player.update();
  // player2.update()

  player.velocity.x = 0;

  if (Keys.d.pressed) {
    player.switchSprite('Run')
    player.velocity.x = 2;
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({canvas,camera})
  } else if (Keys.a.pressed) {
    player.switchSprite('RunLeft')
    player.velocity.x = -2;
    player.lastDirection = 'left'
    player.shouldPanCameraToTheRight({canvas,camera})
  }else if(player.velocity.y ===0){
    
    if(player.lastDirection ==='right')
    player.switchSprite('Idle')
  else  player.switchSprite('IdleLeft')
  
  }
  if(player.velocity.y <0){
    player.shouldPanCameraDown({canvas,camera})
    if(player.lastDirection ==='right')
    player.switchSprite('Jump')
  else  player.switchSprite('JumpLeft')
  }
  
  else if(player.velocity.y >0){
    player.shouldPanCameraUp({canvas,camera})
if(player.lastDirection ==='right')
player.switchSprite('Fall')
else player.switchSprite('FallLeft')

  }
 
  C.restore()

}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      Keys.d.pressed = true;
      break;
    case 'a':
      Keys.a.pressed = true;
      break;
    case 'w':
      player.velocity.y = -4;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      Keys.d.pressed = false;
      break;
    case 'a':
      Keys.a.pressed = false;
      break;
  }
});



