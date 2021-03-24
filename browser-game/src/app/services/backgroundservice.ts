import {BackgroundMap} from '../interfaces/backgroundmap';
import {Injectable, Input} from '@angular/core';
import {MapConfig} from '../config/mapConfig';
import {Position} from '../interfaces/position';

@Injectable()


export class BackgroundService {
    // Map

    // Tile size and resource 
    constructor(){
        this.tile.height = MapConfig.mapHeight;
        this.tile.width = MapConfig.desiredSize;
        this.tile.src = MapConfig.imgsrc;
        this.tileLayer = MapConfig.map;
    }

    
    // Tile position
    tilex = 0;
    tiley= 0;
    tile: HTMLImageElement = new Image();


    // Generate Map
    tileLayer: any;

    viewPort = {x:0,
        y:0,
        width:1000,
        height:600,
        scrollTo : function(playerposition:Position) {
           
                      this.x = playerposition.x - this.width*.5;
                      this.y = playerposition.y - this.height*.5;
        }
    };


    generateMap(mapContext: any,player:any) {


        var x_min = Math.floor(this.viewPort.x / MapConfig.desiredSize);
        var y_min = Math.floor(this.viewPort.y / MapConfig.desiredSize);
        var x_max = Math.ceil((this.viewPort.x + this.viewPort.width) / MapConfig.desiredSize);
        var y_max = Math.ceil((this.viewPort.y + this.viewPort.height) / MapConfig.desiredSize);

        if (x_min < 0) x_min = 0;
        if (y_min < 0) y_min = 0;
        if (x_max > MapConfig.columns) x_max = MapConfig.columns;
        if (y_max > MapConfig.rows) y_max = MapConfig.rows;
        
        mapContext.imageSmoothingEnabled = false;

        let xoffset =  this.viewPort.x + 1000 * 0.5 - this.viewPort.width * 0.5;
        let yoffset =  this.viewPort.y + 600 * 0.5 - this.viewPort.height * 0.5;

        for (let x = x_min; x < x_max; x ++) {

            for (let y = y_min; y < y_max; y ++) {

            let index = y * MapConfig.columns + x;
            let value = MapConfig.map[index];// Tile value

   
            let tile_x = Math.floor(x * MapConfig.desiredSize - xoffset);// Tile x destination for drawing
            let tile_y = Math.floor(y * MapConfig.desiredSize - yoffset);// Tile y destination for drawing

          

            mapContext.drawImage(this.tile, value * MapConfig.tileSize, 0, MapConfig.tileSize, MapConfig.tileSize, tile_x-300, tile_y-450, MapConfig.desiredSize, MapConfig.desiredSize);

         
            
            }

          }



        mapContext.save();
        return mapContext;
    }

    // Load map
    loadMapContext(mapContext: any,player: any){
        let mapState = this.generateMap(mapContext,player);
        mapState.restore();
    }

    
    // UpdateMap


    //Handle map events (loading map zones or other maps)

}