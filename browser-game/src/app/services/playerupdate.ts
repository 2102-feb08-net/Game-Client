import { PlayerPosition } from '../interfaces/playerposition';

import { Injectable, Input } from '@angular/core';

@Injectable()

export class PlayerUpdate {

    player: PlayerPosition = {
		x: 200,
		y: 200,
	};

    movePlayer(event: KeyboardEvent, type: string): void {
		
        console.log(event);

	}


}