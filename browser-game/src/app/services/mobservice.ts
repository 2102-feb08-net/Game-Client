import { HttpClient } from '@angular/common/http';
import {Mob} from '../classes/mob';

import { Position } from '../interfaces/position';

import { Injectable } from '@angular/core';
import { MobObj } from '../interfaces/mob';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weapon } from '../interfaces/weapon';
import { ThrowStmt } from '@angular/compiler';

@Injectable()

export class MobService {
    private readonly baseUrl = environment.gameApiBaseUrl;

    constructor(private http: HttpClient){}

    currentMobs: Mob[] = [];

    DeclareConfig(){

        var mob = new Mob(0,0,1);

        var mob4 = new Mob(200, 100, 2);

        var mob5 = new Mob(250, 100, 3);

        var mob6 = new Mob(50, 50, 4);

        var mob7 = new Mob(250, 50, 5);

        this.currentMobs.push(mob, mob4, mob5, mob6, mob7);
    }

    DrawMobs(mobContext: any,mapService:any){
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => 
            mob.updateMobContext(mobContext,mapService));
    }

    MoveMobs(player:any){
        this.currentMobs.forEach(mob => mob.handleMovement(player));
        for(let i = 0; i < this.currentMobs.length;i++){
            if(this.currentMobs[i].hasBeenLooted){
                this.getLoot(this.currentMobs[i].Id).subscribe(
                    (weapon) => {
                        player.Inventory.push(weapon);
                        console.log(player.Inventory);
                    })
                this.currentMobs.splice(i,1);
           
            }
        }
    }

    getAllMobs(): Observable<MobObj[]> {
        return this.http.get<MobObj[]>(`${this.baseUrl}/api/mobs`);
      }

    getLoot(mobId: number): Observable<Weapon> {
        return this.http.get<Weapon>(`${this.baseUrl}/api/mobs/loot/${mobId}`);
    }
  }
