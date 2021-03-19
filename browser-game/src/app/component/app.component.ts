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

    this.playerService.updatePlayerContext(this.playercontext);

  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		this.playerService.movePlayer(event);
    this.playerService.updatePlayerContext(this.playercontext);
	}

}
