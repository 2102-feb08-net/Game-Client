import { Component ,OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';

import {PlayerUpdate} from '../services/playerupdate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private playerService: PlayerUpdate){}

  title = 'browser-game';

  gameLoop :any;

  keysPressed : { [key: number]: boolean }  = {};


  @ViewChild("canvas")
  private playerCanvas: ElementRef | undefined;

  private playercontext: any;

  public ngOnInit(){


  }

  public ngAfterViewInit(){

    this.playercontext = this.playerCanvas?.nativeElement.getContext("2d");

    this.playerService.updatePlayerContext(this.playercontext);

    this.startGameLoop();

  }

	startGameLoop() {
		this.gameLoop = setInterval(() => {
    this.playerService.updatePlayerContext(this.playercontext);
    this.playerService.animatePlayer();
		}, 10);
	}
  
  attack() {
    this.playerService.playerAttack();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		//this.playerService.movePlayer(event);
    this.keysPressed[event.keyCode] = true;
    this.playerService.movePlayer(this.keysPressed);
    
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    this.keysPressed[event.keyCode] = false;
	}


}
