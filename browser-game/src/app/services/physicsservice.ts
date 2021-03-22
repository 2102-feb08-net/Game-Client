import {Mob} from '../classes/mob';

import { Position } from '../interfaces/position';

import { Injectable } from '@angular/core';

@Injectable()

export class PhysicsService {

    DetectMobHits(player: any, Mobs: Mob [],isFacingRight:boolean = true){
        if(isFacingRight){
            let swordPosition :Position = {x:player.player.x + 40,
                                            y: player.player.y}

                

            Mobs.forEach(Mob => 
                
                {
                    if (this.CalculateDistance(Mob.mob,swordPosition) < 30){
                        Mob.handleHit(player.attack);
                    }
                }
                  
            
            );
        }
    }

    CalculateDistance(position1:Position,position2:Position){

        let xdiff = Math.abs(position1.x - position2.x);

        let ydiff = Math.abs(position1.x-position2.x);

        let xsqrd = Math.pow(xdiff,2);

        let ysqrd = Math.pow(ydiff,2);

        let distance = Math.sqrt(xsqrd+ysqrd);

        return distance;

    }


  }
