import { Component ,OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';

import {PlayerUpdate} from '../services/playerupdate';

import {BackgroundService} from '../services/backgroundservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private playerService: PlayerUpdate, private mapService: BackgroundService){}

  title = 'browser-game';

  gameLoop :any;

  keysPressed : { [key: number]: boolean }  = {};


  @ViewChild("canvas")
  private playerCanvas: ElementRef | undefined;

  private playercontext: any;

  @ViewChild("gamemap")
  private gameMap: ElementRef | undefined;
  private mapContext: any;

  public ngOnInit(){


  }

  public ngAfterViewInit(){

    this.playercontext = this.playerCanvas?.nativeElement.getContext("2d");

    this.playerService.updatePlayerContext(this.playercontext);

    this.mapContext = this.gameMap?.nativeElement.getContext("2d");

    this.mapService.loadMapContext(this.mapContext);

    this.startGameLoop();

  }

	startGameLoop() {
		this.gameLoop = setInterval(() => {
    this.playerService.updatePlayerContext(this.playercontext);
    this.playerService.animatePlayer();
    this.playerService.movePlayer(this.keysPressed);
    this.mapService.loadMapContext(this.mapContext);
		}, 15);

	}
  
  attack() {
    this.playerService.playerAttack();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		//this.playerService.movePlayer(event);
    this.keysPressed[event.keyCode] = true;

    
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    this.keysPressed[event.keyCode] = false;
	}


}
