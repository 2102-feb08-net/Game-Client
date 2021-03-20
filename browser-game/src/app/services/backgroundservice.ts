import {BackgroundMap} from '../interfaces/backgroundmap';
import {Injectable, Input} from '@angular/core';

@Injectable()

export class BackgroundService {
    constructor(){
        this.image.height = this.imgheight;
        this.image.width = this.imgwidth;
        this.image.src = this.map.imgsrc;
        this.tile.height = 16;
        this.tile.width = 16;
        this.tile.src = "assets/imgs/Tileset/Tile.png";
    }

    map: BackgroundMap = {
        imgsrc:"assets/imgs/greenbckg.jpg",
        height: 400,
        width: 400
    };

    imgheight = 320;
    imgwidth = 320;

    image: HTMLImageElement = new Image();
    
    tilex = 0;
    tiley= 0;

    tile: HTMLImageElement = new Image();


    // Generate Map
    
    // Sync layers

    //Load map
    loadMapContext(mapContext: any){
        for (let i = 0; i < this.imgheight; i +=16) {
            for(let j =0; j < this.imgwidth; j+=16) {
                mapContext.drawImage(this.tile, 0, 0, 16, 16, this.tilex+j, this.tiley+i, this.tile.width, this.tile.height);
            }
        }
        
    }
    //Handle map events (loading map zones or other maps)

}