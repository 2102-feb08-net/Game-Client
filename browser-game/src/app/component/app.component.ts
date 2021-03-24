import { Component ,OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { UserClaims } from '@okta/okta-auth-js';
import {PlayerUpdate} from '../services/playerupdate';
import {BackgroundService} from '../services/backgroundservice';
import {MobService} from '../services/mobservice';
import {LoginApiService} from '../services/loginservice';
import {PhysicsService} from '../services/physicsservice';
import {ItemService} from '../services/itemservice';
import {Position} from '../interfaces/position';
import { Weapon } from '../interfaces/weapon';
import { Character } from '../interfaces/character';
import { Player } from '../interfaces/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private oktaAuth: OktaAuthService,
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

  player: Player | null = null;
  character: Character | null = null;
  isAuthenticated = false;
  user: UserClaims | null = null;
  showUI = true;
  showStats = false;

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
            this.playerService.username = character.characterName;
            this.playerService.maxHealth = character.health;
            this.playerService.currentHealth = character.health;
            this.playerService.defense = character.defense;
            this.playerService.attack = character.attack;
          }
        );
      }
    );

    this.mobService.getLoot(1).subscribe(
      (weapon) => {
        let weaponInfo: string = weapon.id + ' ' + weapon.name + ' ' + weapon.description + ' ' + weapon.damage + ' ' + weapon.attackSpeed
          + ' ' + weapon.levelRequirement + ' ' + weapon.rarity;
        console.log(weaponInfo);
      }
    );

    this.oktaAuth.$authenticationState.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.oktaAuth.getUser().then((user) => (this.user = user));
      }
    });

    setTimeout(() => {
      console.log(this.character);
    }, 10000);
    
  }

  public ngAfterViewInit(){

    setTimeout(() => {
      this.playercontext = this.playerCanvas?.nativeElement.getContext("2d");

      this.mapContext = this.gameMap?.nativeElement.getContext("2d");
  
      this.mapService.loadMapContext(this.mapContext,this.playerService.player);
  
      this.mobContext = this.mobCanvas?.nativeElement.getContext("2d");
  
      this.itemContext = this.itemCanvas?.nativeElement.getContext("2d");
  
      this.itemService.drawItem(this.itemContext);
  
      this.startGameLoop();
  
      this.mobService.DeclareConfig();
    }, 10000);
  }

	startGameLoop() {
		this.gameLoop = setInterval(() => {
    this.playerService.updatePlayerContext(this.playercontext,this.mapService);
    this.playerService.movePlayer(this.keysPressed,this.mapService);
    this.mapService.loadMapContext(this.mapContext,this.playerService.player);
    this.mobService.DrawMobs(this.mobContext,this.mapService);
    this.mobService.MoveMobs(this.playerService);
		},15 );

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

  login(): void {
    this.oktaAuth.signInWithRedirect();
  }

  logout(): void {
    //this.oktaAuth.tokenManager.clear();
    this.oktaAuth.signOut();
  }

  toggleUI(): void{
    this.showUI = !this.showUI;
  }
  
  toggleStats(): void{
    this.showStats = !this.showStats;
  }

}
