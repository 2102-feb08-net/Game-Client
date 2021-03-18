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

  keyPress(event: KeyboardEvent) {
    console.log(event)
}

  @ViewChild("canvas")
  private gameCanvas: ElementRef | undefined;

  private context: any;

  public ngOnInit(){

  }

  public ngAfterViewInit(){

    this.context = this.gameCanvas?.nativeElement.getContext("2d");

    this.context.fillRect(20,20,20,20);
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		this.keyPress(event);
	}

}
