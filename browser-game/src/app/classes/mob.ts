import { Position } from '../interfaces/position';
import {Orc} from '../config/OrcConfig';

export class Mob {

    constructor(x:number,y:number){
        this.mob.x=x;
        this.mob.y=y;
        this.mobimage.height=Orc.height;
        this.mobimage.width = Orc.width;
        this.mobimage.src = Orc.spritePath;
    }

    mob: Position = {
		x: 50,
		y: 50,
	};

    //Fields Related to Character Sprite
    currentRow = 0;
    currentFrame = 0;
    mobSpeed = 1;
    //Fields Related to Mob Information

    mobType = "Goblin";
    maxHealth = 10;
    currentHealth = 10;
    defense = 10;
    attack = 1;

    //Movement and Mob State

    isMovingUp = false;
    isMovingDown = false;
    isMovingRight = false;
    isMovingLeft = false;

    velocityXModifier = 1;
    velocityYModifier = 1;

    isAttacking = false;
    isDead = false;
    hasKilled = false;

    mobimage : HTMLImageElement = new Image();
    
    updateMobContext(mobContext: any){

        this.pickImage();
        this.drawMob(mobContext);
        this.updateFrame();

    }

    updateFrame(){
        this.currentFrame += .1;
        if(this.currentFrame > Orc.numberofFrames){
            if(this.isAttacking){
                this.isAttacking = false;
            }
            this.currentFrame = 0;
        }

    }

    drawMob(mobContext: any){
        mobContext.drawImage(this.mobimage,32*Math.floor(this.currentFrame), Orc.height*this.currentRow,Orc.width,Orc.height,Math.floor(this.mob.x),Math.floor(this.mob.y),Orc.width,Orc.height);
    }

   
  
  getHealthBarLength(){
   
    let length = 20*this.currentHealth/this.maxHealth;

    if(length < 0){
        return 0;
    }
    else{
        return length;
    }

  }

  pickImage(){

    if(this.isDead){
        this.currentRow=4
        return;
    }
    else if(this.hasKilled){
        this.currentRow = 1;
        return;
    }
    else if(this.isAttacking){
        this.currentRow = 3;
        return;
    }
    else if(this.isMovingLeft || this.isMovingRight){
        this.currentRow = 2;
    }
    else{
        this.currentRow = 0;
    }

  }

    resetMovement(){
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }

    calculateVelocityModifier(playerlocation:Position){
        
        let xdiff = Math.abs(this.mob.x - playerlocation.x);

        let ydiff = Math.abs(this.mob.y - playerlocation.y);

        let totaldiff = xdiff + ydiff;


        this.velocityXModifier = this.mobSpeed*xdiff/totaldiff;

        this.velocityYModifier = this.mobSpeed*ydiff/totaldiff;

        if(this.velocityYModifier < .2){
            this.velocityYModifier = .2;
        }
        else if(this.velocityXModifier < .2){
            this.velocityXModifier =.2;
        }

        

    }

    handleMovement(player: any){

        let distance = this.calculateDistanceToPlayer(player.player);

        this.calculateVelocityModifier(player.player);

        if(distance < Orc.attackRange && distance > 10){
            this.moveMobTowardsPlayer(player.player);
        }

        else if (distance <= 15){
            this.InitiateAttack(player);
        }
    }

    InitiateAttack(player:any){
        if(player.isDead){
            this.hasKilled = true;
        }
        player.handleHit(this.attack);
        this.isAttacking = true;
    }

    handleHit(damage: number){

    }
    moveMobTowardsPlayer(position: Position){
        
        if(this.mob.x - Orc.width/2 < position.x){
            this.mob.x += this.mobSpeed*this.velocityXModifier;
        }
        else{
            this.mob.x -= this.mobSpeed*this.velocityXModifier;
        }

        if(this.mob.y - Orc.height/2 < position.y){
            this.mob.y += this.mobSpeed*this.velocityYModifier;
        }
        else{
            this.mob.y -= this.mobSpeed*this.velocityYModifier;
        }
    }


    calculateDistanceToPlayer(position: Position){

        let xdiff = Math.abs((this.mob.x -Orc.width/2 ) - position.x);

        let ydiff = Math.abs((this.mob.y - Orc.height/2) - position.y);

        let ysquared = Math.pow(ydiff, 2);

        let xsquared = Math.pow(xdiff, 2);

        let distance = Math.sqrt(ysquared+ xsquared);

        return distance;

    }


  }
