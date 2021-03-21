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

    currentFrame = 0;
    mobSpeed = 3;
    mobWidth = 40;
    mobHeight = 40;

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
        mobContext.drawImage(this.mobimage,32*Math.floor(this.currentFrame),0,32,32,this.mob.x,this.mob.y,Orc.width,Orc.height);
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
        this.mobimage.src = 'assets/imgs/Warrior/WarriorDeath.png';
        return; 
    }
    else if(this.isAttacking){
        this.mobimage.src = 'assets/imgs/Warrior/WarriorAttack.png';
        return; 
    }
    else if(this.isMovingRight){
        this.mobimage.src = 'assets/imgs/Warrior/WarriorRun.png';
    }
    else if(this.isMovingLeft){
        this.mobimage.src = 'assets/imgs/Warrior/WarriorRunLeft.png';
    }
    else{
        this.mobimage.src = Orc.spritePath; 
    }
  }

    resetMovement(){
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }

    handleMovement(){

    }

    handleHit(damage: number){

    }


  }
