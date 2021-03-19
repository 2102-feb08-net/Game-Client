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


  @ViewChild("canvas")
  private playerCanvas: ElementRef | undefined;

  private playercontext: any;

  public ngOnInit(){

  }

  public ngAfterViewInit(){

    this.playercontext = this.playerCanvas?.nativeElement.getContext("2d");

    this.playercontext.fillRect(this.playerService.player.x, this.playerService.player.y,20,20);


  }

  public updateContext(){
    this.playercontext.clearRect(0, 0, 480, 640);
    this.playercontext.fillRect(this.playerService.player.x, this.playerService.player.y,20,20);

  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		this.playerService.movePlayer(event);
    this.playerService.updatePlayerContext(this.playercontext);
	}

}
