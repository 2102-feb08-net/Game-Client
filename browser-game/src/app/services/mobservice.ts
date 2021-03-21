import {Mob} from '../classes/mob';

import { Injectable } from '@angular/core';

@Injectable()

export class MobService {

    currentMobs: Mob[] = [];

    DeclareConfig(){

        var mob = new Mob();

        this.currentMobs.push(mob);
    }

    UpdateMobs(mobContext: any){
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => mob.updateMobContext(mobContext));
    }

  }