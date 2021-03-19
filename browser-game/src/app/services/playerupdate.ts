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
    image : HTMLImageElement = new Image();

    animatePlayer(){
        this.currentFrame++;
        if(this.currentFrame > 5){
            this.currentFrame = 0;
        }
    }


    movePlayer(event: KeyboardEvent): void {
		
    var keyCode = event.keyCode;
      switch (keyCode) {
        case 68: //d
            this.player.x += this.playerSpeed;
            break;
        case 83: //s
            this.player.y += this.playerSpeed;
            break;
        case 65: //a
            this.player.x -= this.playerSpeed;
            break;
        case 87: //w
            this.player.y -= this.playerSpeed;
            break;
  }
}

    updatePlayerContext(playerContext: any){
      
        playerContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        playerContext.drawImage(this.image,0,46*this.currentFrame,64,46,this.player.x,this.player.y,this.playerWidth,this.playerHeight);

  }

  }
