import { Position } from '../interfaces/position';

import { Injectable, Input } from '@angular/core';

@Injectable()

export class PlayerUpdate {

    constructor(){
        this.image.height=this.playerHeight;
        this.image.width = this.playerWidth;
        this.image.src = 'assets/imgs/Warrior/WarriorIdle.png';
    }

    player: Position = {
		x: 100,
		y: 100,
	};

    //Fields Related to Character Sprite

    currentFrame = 0;
    playerSpeed = 1;
    playerWidth = 64;
    playerHeight = 46;

    //Fields Related to Character Information

    username = "Guest";
    maxHealth = 10;
    currentHealth = 10;
    defense = 10;
    attack = 2;

    //Movement and Character State

    isMovingUp = false;
    isMovingDown = false;
    isMovingRight = false;
    isMovingLeft = false;

    isFacingRight = true;

    isAttacking = false;
    isDead = false;

    image : HTMLImageElement = new Image();

    animatePlayer(){
        this.currentFrame += .12;
        
        if(this.isDead){
                if(this.currentFrame > 5){
                    this.currentFrame = 5;
                }
                return;
        }
        
        else if(this.isAttacking){
            this.currentFrame += .12;
            if(this.currentFrame > 11){
                this.currentFrame = 0;
                this.isAttacking = false;
            }
            return;
        }
        else if(this.isMovingLeft || this.isMovingRight){
            if(this.currentFrame > 8){
                this.currentFrame = 0;
            }
            return;
        }
        else{
            if(this.currentFrame > 5){
                this.currentFrame = 0;
            }
        }
 
    }

    playerAttack(){
        if(this.isDead){
            return;
        }
        this.isAttacking = true;
        this.currentFrame = 0;
    }


    movePlayer(keyCodes: { [key: number]: boolean },mapService: any): void {

        if(this.isDead || this.isAttacking){
            return;
        }

        this.resetMovement();

        if(keyCodes[87]){
            this.isMovingUp = true;
        }
        if(keyCodes[65]){
            this.isMovingLeft = true;
        }
        if(keyCodes[83]){
            this.isMovingDown = true;
        }
        if(keyCodes[68]){           
           this.isMovingRight = true;
        }

        this.handleMovement(mapService);

  }

    updatePlayerContext(playerContext: any,mapService:any){
        this.pickImage();
        this.animatePlayer();
        playerContext.imageSmoothingEnabled = false;
        playerContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        playerContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        playerContext.fillStyle = 'Red';
        let healthbarlength = this.getHealthBarLength();
        let centerwidth = playerContext.canvas.width/2 -this.image.width/2;
        let centerheight = playerContext.canvas.height/2 -this.image.height/2;
        this.player.x = centerwidth + mapService.viewPort.x;
        this.player.y = centerheight + mapService.viewPort.y;
        playerContext.fillRect(centerwidth+21, centerheight+22,healthbarlength , 1.5);
        playerContext.drawImage(this.image,0,46*Math.floor(this.currentFrame),64,46,centerwidth,centerheight,this.playerWidth,this.playerHeight);
  }
  
  getHealthBarLength(){
   
    let length = 20*this.currentHealth/this.maxHealth;

    if(length < 0){
        return 0;
    }
    else{
        return length;
    }

  }

  pickImage(){

    if(this.isDead){
        this.image.src = 'assets/imgs/Warrior/WarriorDeath.png';
        return; 
    }
    else if(this.isAttacking){
        this.image.src = 'assets/imgs/Warrior/WarriorAttack.png';
        return; 
    }
    else if(this.isMovingRight){
        this.image.src = 'assets/imgs/Warrior/WarriorRun.png';
    }
    else if(this.isMovingLeft){
        this.image.src = 'assets/imgs/Warrior/WarriorRunLeft.png';
    }
    else{
        this.image.src = 'assets/imgs/Warrior/WarriorIdle.png'; 
    }
  }

    resetMovement(){
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }

    handleMovement(mapService:any){

        if(this.isMovingLeft){
            mapService.viewPort.x -= this.playerSpeed;
         //   this.player.x -= this.playerSpeed;
        }
        if(this.isMovingDown){
            mapService.viewPort.y +=this.playerSpeed;
           // this.player.y += this.playerSpeed;
        }
        if(this.isMovingRight){
            mapService.viewPort.x +=this.playerSpeed;
           // this.player.x += this.playerSpeed;
        }
        if(this.isMovingUp){
            mapService.viewPort.y -=this.playerSpeed;
          //  this.player.y -= this.playerSpeed;
        }

    }

    handleHit(damage: number){

        this.currentHealth -= damage;

        if(this.currentHealth <= 0){
            this.isDead = true;
        }
    }


  }
