import {Mob} from '../classes/mob';

import { Position } from '../interfaces/position';

import { Injectable } from '@angular/core';

@Injectable()

export class MobService {

    currentMobs: Mob[] = [];

    DeclareConfig(){

        var mob = new Mob();

        this.currentMobs.push(mob);
    }

    DrawMobs(mobContext: any){
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => mob.updateMobContext(mobContext));
    }

    MoveMobs(player:any){
        this.currentMobs.forEach(mob => mob.handleMovement(player));
    }

  }
