import { HttpClient } from '@angular/common/http';
import {Mob} from '../classes/mob';

import { Position } from '../interfaces/position';

import { Injectable } from '@angular/core';
import { MobObj } from '../interfaces/mob';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class MobService {
    private readonly baseUrl = environment.gameApiBaseUrl;

    constructor(private http: HttpClient){}

    currentMobs: Mob[] = [];

    DeclareConfig(){

        var mob = new Mob(0,0,0);

        var mob4 = new Mob(200, 100, 2);

        var mob5 = new Mob(250, 100, 3);

        var mob6 = new Mob(50, 50, 4);

        var mob7 = new Mob(250, 50, 5);

        this.currentMobs.push(mob, mob4, mob5, mob6, mob7);
    }

    DrawMobs(mobContext: any){
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => mob.updateMobContext(mobContext));
    }

    MoveMobs(player:any){
        this.currentMobs.forEach(mob => mob.handleMovement(player));
    }

    getAllMobs(): Observable<MobObj[]> {
        return this.http.get<MobObj[]>(`${this.baseUrl}/api/mobs`);
      }

    
  }
