import {Mob} from '../classes/mob';

import { Position } from '../interfaces/position';

import { Injectable } from '@angular/core';

@Injectable()

export class MobService {

    currentMobs: Mob[] = [];

    DeclareConfig(){

        var mob = new Mob(50,100);

        var mob2 = new Mob(150,100);

        var mob3 = new Mob(100,50);

        this.currentMobs.push(mob,mob2,mob3);
    }

    DrawMobs(mobContext: any){
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => mob.updateMobContext(mobContext));
    }

    MoveMobs(player:any){
        this.currentMobs.forEach(mob => mob.handleMovement(player));
    }

  }
