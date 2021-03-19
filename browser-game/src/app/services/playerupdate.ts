import { PlayerPosition } from '../interfaces/playerposition';

import { Injectable, Input } from '@angular/core';

@Injectable()

export class PlayerUpdate {

    constructor(){
        this.image.height=this.playerHeight;
        this.image.width = this.playerWidth;
        this.image.src = 'assets/imgs/Warrior/WarriorIdle.png';
    }

    player: PlayerPosition = {
		x: 100,
		y: 100,
	};

    currentFrame = 0;
    playerSpeed = 5;
    playerWidth = 64;
    playerHeight = 46;

    isMovingUp = false;
    isMovingDown = false;
    isMovingRight = false;
    isMovingLeft = false;

    isAttacking = false;

    image : HTMLImageElement = new Image();

    animatePlayer(){
        this.currentFrame += .12;
        if(this.isAttacking){
            if(this.currentFrame > 11){
                this.currentFrame = 0;
                this.isAttacking = false;
            }
        }
        else{
            if(this.currentFrame > 5){
                this.currentFrame = 0;
            }
        }
 
    }

    playerAttack(){
        this.isAttacking = true;
        this.currentFrame = 0;
    }


    movePlayer(keyCodes: { [key: number]: boolean }): void {

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

        this.handleMovement();

  }

    updatePlayerContext(playerContext: any){
        this.pickImage();
        playerContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        playerContext.drawImage(this.image,0,46*Math.floor(this.currentFrame),64,46,this.player.x,this.player.y,this.playerWidth,this.playerHeight);
  }

  pickImage(){
    if(this.isAttacking){
        this.image.src = 'assets/imgs/Warrior/WarriorAttack.png'; 
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

    handleMovement(){

        if(this.isMovingLeft){
            this.player.x -= this.playerSpeed;
        }
        if(this.isMovingDown){
            this.player.y += this.playerSpeed;
        }
        if(this.isMovingRight){
            this.player.x += this.playerSpeed;
        }
        if(this.isMovingUp){
            this.player.y -= this.playerSpeed;
        }

    }



  }
