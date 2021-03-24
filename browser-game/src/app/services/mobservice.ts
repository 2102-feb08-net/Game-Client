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

    allMobs: Mob[] = [];

    DeclareConfig(){

        this.getAllMobs().subscribe(
            (mobs) => {
                mobs.forEach((mob) => 

                this.currentMobs.push(new Mob(Math.random()*200,Math.random()*200,mob.id-1 )))

            })

        this.allMobs = this.currentMobs;
        
        
    }

    SpawnMob(){
        let index = Math.ceil(Math.random()*this.currentMobs.length);
        this.currentMobs.push(new Mob(Math.random()*400,Math.random()*400,index ))
    }

    DrawMobs(mobContext: any,mapService:any){
        if(this.allMobs.length <= 2){
            this.SpawnMob();
        }
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => 
            mob.updateMobContext(mobContext,mapService));
    }

    MoveMobs(player:any){
        this.currentMobs.forEach(mob => mob.handleMovement(player));
        for(let i = 0; i < this.currentMobs.length;i++){
            if(this.currentMobs[i].hasBeenLooted){
                this.getLoot(this.currentMobs[i].Id + 1).subscribe(
                    (weapon) => {
                        player.Inventory.push(weapon);
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
