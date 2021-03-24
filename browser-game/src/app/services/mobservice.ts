import { HttpClient } from '@angular/common/http';
import {Mob} from '../classes/mob';

import { Position } from '../interfaces/position';

import { Injectable } from '@angular/core';
import { MobObj } from '../interfaces/mob';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weapon } from '../interfaces/weapon';
import { ThrowStmt } from '@angular/compiler';
import { LoginApiService } from './loginservice';
import { PlayerUpdate } from './playerupdate';

@Injectable()

export class MobService {
    private readonly baseUrl = environment.gameApiBaseUrl;

    constructor(private http: HttpClient){}

    currentMobs: Mob[] = [];

    allMobs: Mob[] = [];

    DeclareConfig(){

        this.getAllMobs().subscribe(
            (mobs) => {
                mobs.forEach((mob) => {
                    console.log(mob);
                    this.allMobs.push(new Mob(Math.random()*200,Math.random()*200,mob.id-1 ,mob.attack,mob.defense,mob.exp))
                    this.currentMobs.push(new Mob(Math.random()*200,Math.random()*200,mob.id-1 ,mob.attack,mob.defense,mob.exp))
                }
       

        )})
        
        
    }

    SpawnMob(){
        let index = Math.ceil(Math.random()*this.allMobs.length);
        let id = this.allMobs[index].Id;
        let exp = this.allMobs[index].exp;
        let attack = this.allMobs[index].attack;
        let defense = this.allMobs[index].defense;

        this.currentMobs.push(new Mob(Math.random()*400,Math.random()*400,id,exp,attack,defense))
    }

    DrawMobs(mobContext: any,mapService:any){
        if(this.currentMobs.length <= 2){
            this.SpawnMob();
        }
        mobContext.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.currentMobs.forEach(mob => 
            mob.updateMobContext(mobContext,mapService));
    }

    MoveMobs(player: PlayerUpdate,loginservice: LoginApiService){
        this.currentMobs.forEach(mob => mob.handleMovement(player));
        for(let i = 0; i < this.currentMobs.length;i++){
            if(this.currentMobs[i].hasBeenLooted){
        
                    this.getLoot(this.currentMobs[i].Id).subscribe(
                        (weapon) => {
                            player.Inventory.push(weapon);
                        });
                    
                    console.log('player: ' + player.Id);
                    console.log('exp: ' + this.currentMobs[i].exp);
                    loginservice.updateExp(player.Id, this.currentMobs[i].exp).subscribe(
                        (character) => {
                            console.log(character);
                        }
                    );
                
               
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
