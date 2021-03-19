import {BackgroundMap} from '../interfaces/backgroundmap';
import {Injectable, Input} from '@angular/core';

@Injectable()

export class BackgroundService {
    constructor(){
        this.image.height = this.imgheight;
        this.image.width = this.imgwidth;
        this.image.src = this.map.imgsrc;
    }

    map: BackgroundMap = {
        imgsrc:"assets/imgs/greenbckg.jpg",
        height: 400,
        width: 400
    };

    imgheight = 300;
    imgwidth = 300;

    image: HTMLImageElement = new Image();

    //Load map
    loadMapContext(mapContext: any){
        mapContext.drawImage(this.image, 0, 0, this.map.width, this.map.height);
    }
    //Handle map events (loading map zones or other maps)

}