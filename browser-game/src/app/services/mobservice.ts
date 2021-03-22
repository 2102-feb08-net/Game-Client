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

        var mob = new Mob(50,100,0);

        var mob2 = new Mob(150,100,0);

        var mob3 = new Mob(100,50,1);

        this.currentMobs.push(mob,mob2,mob3);
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
