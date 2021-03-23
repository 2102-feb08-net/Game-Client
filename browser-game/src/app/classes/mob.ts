import { Position } from '../interfaces/position';
import {Orc} from '../config/OrcConfig';

export class Mob {

    constructor(x:number,y:number,id:number){
        this.Id = id;
        this.mob.x=x;
        this.mob.y=y;
        this.mobimage.height=Orc.height;
        this.mobimage.width = Orc.width;
        this.mobimage.src = Orc.spritePath;
        this.mobimageLeft.src = Orc.spritePathLeft;
        this.mobimageLeft.height=Orc.height;
        this.mobimageLeft.width = Orc.width;
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

    Id = 0;
    mobType = "Goblin";
    maxHealth = 10;
    currentHealth = 10;
    defense = 10;
    attack = .001;

    //Movement and Mob State

    isMoving = false;
    isFacingLeft = false;

    velocityXModifier = 1;
    velocityYModifier = 1;

    isAttacking = false;
    isDead = false;
    hasKilled = false;

    mobimage : HTMLImageElement = new Image();
    mobimageLeft : HTMLImageElement = new Image();
    
    updateMobContext(mobContext: any){

        this.pickImage();
        this.drawMob(mobContext);
        this.updateFrame();

    }

    updateFrame(){
        this.currentFrame += .1;
        if(this.currentFrame > Orc.numberofFrames){
            if(this.isDead){
                this.currentFrame = Orc.numberofFrames-1;
                return;
            }
            else if(this.isAttacking){
                this.isAttacking = false;
            }
            this.currentFrame = 0;
        }

    }

    drawMob(mobContext: any){

        var image;

        if(this.isFacingLeft){
            image = this.mobimageLeft;
        }
        else{
            image = this.mobimage;
        }

        mobContext.imageSmoothingEnabled = false;

        //Draw Mobs Healthbar

        let healthbarlength = this.getHealthBarLength();

        mobContext.fillStyle = '#990000';

        mobContext.fillRect(this.mob.x + 5, this.mob.y + Orc.height,healthbarlength , 1.5);

        //Draw Mob Himself

        mobContext.drawImage(image,32*Math.floor(this.currentFrame), Orc.height*this.currentRow + Orc.width*Orc.animationCount*this.Id,Orc.width,Orc.height,Math.floor(this.mob.x),Math.floor(this.mob.y),Orc.width,Orc.height);
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
    else if(this.isMoving){
        this.currentRow = 2;
    }
    else{
        this.currentRow = 0;
    }

  }


    calculateVelocityModifier(playerlocation:Position){
        
        let xdiff = Math.abs(this.mob.x - playerlocation.x);

        let ydiff = Math.abs(this.mob.y - playerlocation.y);

        let totaldiff = xdiff + ydiff;


        this.velocityXModifier = this.mobSpeed*xdiff/totaldiff;

        this.velocityYModifier = this.mobSpeed*ydiff/totaldiff;


        if(this.velocityYModifier < .3){
            this.velocityYModifier = .2;
        }
        else if(this.velocityXModifier < .3){
            this.velocityXModifier = .2;
        }
        

    }

    handleDirection(playerPosition:Position){
        if(this.mob.x <= playerPosition.x){
            this.isFacingLeft = false;
        }
        else{
            this.isFacingLeft = true;
        }
    }


    handleMovement(player: any){

        if(this.isDead){
            return;
        }

        let distance = this.calculateDistanceToPlayer(player.player);

        this.handleDirection(player.player);

        this.calculateVelocityModifier(player.player);

        if(distance < Orc.attackRange && distance > 5){
            this.isMoving = true;
            this.moveMobTowardsPlayer(player.player);
        }

        else if (distance <= 15){
            this.InitiateAttack(player);
        }
        else{
            this.isMoving = false;
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

        this.currentHealth -= damage;

        if(this.currentHealth <= 0){
            this.isDead = true;
        }
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
