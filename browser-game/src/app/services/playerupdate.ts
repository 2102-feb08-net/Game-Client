import { PlayerPosition } from '../interfaces/playerposition';

import { Injectable, Input } from '@angular/core';

@Injectable()

export class PlayerUpdate {

    player: PlayerPosition = {
		x: 100,
		y: 100,
	};

    playerSpeed = 5;

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
        playerContext.fillRect(this.player.x, this.player.y,20,20);

  }
}