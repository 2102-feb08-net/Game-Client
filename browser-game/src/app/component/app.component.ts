import { Component ,OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {PlayerUpdate} from '../services/playerupdate';
import {BackgroundService} from '../services/backgroundservice';
import {MobService} from '../services/mobservice';
import {LoginApiService} from '../services/loginservice';
import {PhysicsService} from '../services/physicsservice';
import {ItemService} from '../services/itemservice';
import {Position} from '../interfaces/position';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private physicsService: PhysicsService,
    private playerService: PlayerUpdate, 
    private mapService: BackgroundService, 
    private mobService: MobService,
    private itemService: ItemService, 
    private loginService: LoginApiService){}

  title = 'browser-game';

  gameLoop :any;

  keysPressed : { [key: number]: boolean }  = {};


  @ViewChild("canvas")
  private playerCanvas: ElementRef | undefined;
  private playercontext: any;

  @ViewChild("gamemap")
  private gameMap: ElementRef | undefined;
  private mapContext: any;

  @ViewChild("mobcanvas")
  private mobCanvas: ElementRef | undefined;
  private mobContext: any;

  @ViewChild("itemcanvas")
  private itemCanvas: ElementRef | undefined;
  private itemContext: any;

  player: any;

  character: any;

  public ngOnInit(){
    this.loginService.getPlayer('hamza@gmail.com', 'password123').subscribe(
      (player) => {
        let playerInfo: string = player.id + ' ' + player.characterId + ' ' + player.username + ' ' + player.password;
        console.log(playerInfo);
        this.player = {
          id: player.id,
          characterId: player.characterId,
          username: player.username,
          password: player.password
        };
      }
    );
    
    setTimeout(() => {
      this.loginService.getCharacter(this.player.id).subscribe(
        (character) => {
          let characterInfo: string = character.id + ' ' + character.characterName + ' ' + character.exp + ' ' + character.health
            + ' ' + character.attack + ' ' + character.defense + ' ' + character.mana;
          console.log(characterInfo);
          this.character = {
            id: character.id,
            characterName: character.characterName,
            exp: character.exp,
            health: character.health,
            attack: character.attack,
            defense: character.defense,
            mana: character.mana,
          };
        }
      );
    }, 10000);

    
  }

  public ngAfterViewInit(){

    this.playercontext = this.playerCanvas?.nativeElement.getContext("2d");

    this.mapContext = this.gameMap?.nativeElement.getContext("2d");

    this.mapService.loadMapContext(this.mapContext,this.playerService.player);

    this.mobContext = this.mobCanvas?.nativeElement.getContext("2d");

    this.itemContext = this.itemCanvas?.nativeElement.getContext("2d");

    this.itemService.drawItem(this.itemContext);

    this.startGameLoop();

    this.mobService.DeclareConfig();

  }

	startGameLoop() {
		this.gameLoop = setInterval(() => {
    this.playerService.updatePlayerContext(this.playercontext);
    this.playerService.movePlayer(this.keysPressed,this.mapService);
    this.mapService.loadMapContext(this.mapContext,this.playerService.player);
    this.mobService.DrawMobs(this.mobContext);
    this.mobService.MoveMobs(this.playerService);
    this.itemService.drawItem(this.itemContext);
		}, 15);

	}
  
  attack(event: any) {
    

  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    if(event.code == "Space"){
      this.playerService.playerAttack();
      this.physicsService.DetectMobHits(this.playerService,this.mobService.currentMobs);
    }

    this.keysPressed[event.keyCode] = true;

    
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    this.keysPressed[event.keyCode] = false;
	}


}
