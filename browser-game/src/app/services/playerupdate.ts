import { PlayerPosition } from '../interfaces/playerposition';

import { Injectable, Input } from '@angular/core';

@Injectable()

export class PlayerUpdate {

    player: PlayerPosition = {
		x: 200,
		y: 200,
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


}