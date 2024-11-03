class Player extends Sprite {
    constructor({position, CollisionBlocks,platformCollisionBlocks,imageSrc, frameRate, scale=0.5,animations}) {
      super({imageSrc,frameRate, scale})
      this.position = position;
      this.velocity = {
        x: 0,
        y: 1,
      };
      // this.width = 25;
      // this.height = 25;
      this.CollisionBlocks = CollisionBlocks
      this.platformCollisionBlocks = platformCollisionBlocks
      
      
      this.hitBox ={
        position :{
          x: this.position.x,
          y: this.position.y,
        },
        width : 10,
        height :10,
      
      }
      this.animations = animations
      this.lastDirection = 'right'
      for(let key in this.animations){
        const image = new Image()
        image.src= this.animations[key].imageSrc
        this.animations[key].image=image
      }
  
    }

    switchSprite(key){
      if( this.image === this.animations[key].image || !this.loaded) return
      this.currentFrame=0
   this.image = this.animations[key].image
   this.frameBuffer = this.animations[key].frameBuffer
   this.frameRate = this.animations[key].frameRate
    }
    updateCameraBox(){
      this.cameraBox = {
        position:{
          x:this.position.x-50,
          y:this.position.y,
        },
        width :200,
        height:80,
      }

  
    }
    checkForHorizentalCanvasCollsion(){
        if(this.hitBox.position.x + this.hitBox.width + this.velocity.x >= 576 || this.hitBox.position.x + this.velocity.x <= 0 ){
         this.velocity.x = 0
        }
    }
    shouldPanCameraToTheLeft({canvas,camera}){
      const cameraBoxRightSide= this.cameraBox.position.x + this.cameraBox.width
      const scalDownCanvasWidth = canvas.width/4
      if(cameraBoxRightSide >= 576) return
      if(cameraBoxRightSide >= scalDownCanvasWidth + Math.abs(camera.position.x)){
        camera.position.x -= this.velocity.x
      }
    }

    shouldPanCameraToTheRight({canvas,camera}){
      
      if(this.cameraBox.position.x <= 0) return
      if(this.cameraBox.position.x <= Math.abs(camera.position.x)){
        camera.position.x -= this.velocity.x
      }
    }

    shouldPanCameraDown({canvas,camera}){
      
      if(this.cameraBox.position.y + this.velocity.y <= 0) return
      if(this.cameraBox.position.y <= Math.abs(camera.position.y)){
        camera.position.y -= this.velocity.y
      }
    }

    shouldPanCameraUp({canvas,camera}){
      if(this.cameraBox.position.y + this.velocity.y + this.cameraBox.height >= 432) return
          const scalDownCanvasHeight = canvas.height/ 4
      if(this.cameraBox.position.y + this.cameraBox.height >= Math.abs(camera.position.y) + scalDownCanvasHeight){
        camera.position.y -= this.velocity.y
      }
    }
    // shouldPanCameraUp({canvas,camera}){
    //   const cameraBoxDownSide= this.cameraBox.position.y + this.cameraBox.height
    //   const scalDownCanvasHeight = canvas.height/4
    //   if(cameraBoxDownSide >= 576) return
    //   if(cameraBoxDownSide >= scalDownCanvasHeight + Math.abs(camera.position.y)){
    //     camera.position.y -= this.velocity.y
    //   }
    // }

    update() {
      this.updateFrames();
      this.updateHitBox();
      this.updateCameraBox();

      //drow out the image
      // C.fillStyle ='rgba(0,255,0,0.2)'
      // C.fillRect(this.position.x, this.position.y, this.width, this.height);
   
      // C.fillStyle ='rgba(0,0,255,0.2)'
      // C.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);
   
      this.draw();
      this.position.x += this.velocity.x; // Update position.x based on velocity.x
      this.updateHitBox()
      this.checkForHorizontalCollition()
      this.applyGravity()
      this.updateHitBox()
      this.checkForVerticalCollition()
    }
updateHitBox(){
  this.hitBox ={
    position :{
      x: this.position.x + 35,
      y: this.position.y + 26,
    },
    width : 14,
    height :27,
  }
}
    checkForHorizontalCollition(){
      
      for(let i =0; i< this.CollisionBlocks.length;i++){
       const CollisionBlock= this.CollisionBlocks[i]
 if(
  collision({
   object1: this.hitBox,
   object2:CollisionBlock
 })
 ){
   if(this.velocity.xy > 0){
     this.velocity.x = 0
     const offSet= this.hitBox.position.x - this.position.x + this.hitBox.width
     this.position.x = CollisionBlock.position.x - offSet - 0.01
     break
   }
 
   if(this.velocity.x < 0){
     this.velocity.x = 0
     const offSet= this.hitBox.position.x - this.position.x 
     this.position.x = CollisionBlock.position.x + CollisionBlock.width -offSet + 0.01
     break
   }
         }
       }
     }
    applyGravity(){
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollition(){
      
      for(let i =0; i< this.CollisionBlocks.length;i++){
       const CollisionBlock= this.CollisionBlocks[i]
 if(
  collision({
   object1: this.hitBox,
   object2:CollisionBlock
 })
 ){
   if(this.velocity.y > 0){
     this.velocity.y = 0
     const offSet= this.hitBox.position.y - this.position.y + this.hitBox.height
     this.position.y = CollisionBlock.position.y - offSet - 0.01
     break
   }
 
   if(this.velocity.y < 0){
     this.velocity.y = 0
     const offSet= this.hitBox.position.y - this.position.y 
     this.position.y = CollisionBlock.position.y + CollisionBlock.height -offSet + 0.01
     break
   }
         }
       }


       ///platform Collision Blocks

       for(let i =0; i< this.platformCollisionBlocks.length;i++){
        const platformCollisionBlocks= this.platformCollisionBlocks[i]
  if(
    platformCollision({
    object1: this.hitBox,
    object2:platformCollisionBlocks
  })
  ){
    if(this.velocity.y > 0){
      this.velocity.y = 0
      const offSet= this.hitBox.position.y - this.position.y + this.hitBox.height
      this.position.y = platformCollisionBlocks.position.y - offSet - 0.01
      break
    }
  
    // if(this.velocity.y < 0){
    //   this.velocity.y = 0
    //   const offSet= this.hitBox.position.y - this.position.y 
    //   this.position.y = platformCollisionBlocks.position.y + platformCollisionBlocks.height -offSet + 0.01
    //   break
    // }
          }
        }
     }
  

  }