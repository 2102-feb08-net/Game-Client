import { Position } from '../interfaces/position';
import {Orc} from '../config/OrcConfig';

export class Mob {

    constructor(){
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

    //Movement and Mob State

    isMovingUp = false;
    isMovingDown = false;
    isMovingRight = false;
    isMovingLeft = false;

    isAttacking = false;
    isDead = false;

    mobimage : HTMLImageElement = new Image();
    
    updateMobContext(mobContext: any){

        this.pickImage();
        this.drawMob(mobContext);
        this.updateFrame();

    }

    updateFrame(){
        this.currentFrame += .1;
        if(this.currentFrame > Orc.numberofFrames){
            this.currentFrame = 0;
        }

    }

    drawMob(mobContext: any){
        console.log(this.currentRow);
        mobContext.drawImage(this.mobimage,32*Math.floor(this.currentFrame), Orc.height*this.currentRow,Orc.width,Orc.height,this.mob.x,this.mob.y,Orc.width,Orc.height);
    }

    animateMob(){
        this.currentFrame += .12;
        
        if(this.isDead){
                if(this.currentFrame > 5){
                    this.currentFrame = 5;
                }
                return;
        }
        
        else if(this.isAttacking){
            this.currentFrame += .12;
            if(this.currentFrame > 11){
                this.currentFrame = 0;
                this.isAttacking = false;
            }
            return;
        }
        else if(this.isMovingLeft || this.isMovingRight){
            if(this.currentFrame > 8){
                this.currentFrame = 0;
            }
            return;
        }
        else{
            if(this.currentFrame > 5){
                this.currentFrame = 0;
            }
        }
 
    }

    playerAttack(){
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

    handleMovement(playerposition: Position){

        let distance = this.calculateDistanceToPlayer(playerposition);

        if(distance < 50){
            this.moveMobTowardsPlayer(playerposition);
        }
    }

    handleHit(damage: number){

    }
    moveMobTowardsPlayer(position: Position){
        
        if(this.mob.x < position.x){
            this.mob.x += this.mobSpeed;
        }
        else{
            this.mob.x -= this.mobSpeed;
        }

        if(this.mob.y < position.y){
            this.mob.y += this.mobSpeed;
        }
        else{
            this.mob.y -= this.mobSpeed;
        }
    }


    calculateDistanceToPlayer(position: Position){

        let xdiff = Math.abs(this.mob.x - position.x);

        let ydiff = Math.abs(this.mob.y - position.y);

        let ysquared = Math.pow(ydiff, 2);

        let xsquared = Math.pow(xdiff, 2);

        let distance = Math.sqrt(ysquared+ xsquared);

        return distance;

    }


  }
