import { Injectable } from '@angular/core';
import { Potion } from '../config/itemConfig';

@Injectable()

export class ItemService{
    constructor(){
        this.itemImage.src = Potion.spritePath;
        this.itemImage.width = Potion.width;
        this.itemImage.height = Potion.height;
    }

    // Item
    itemImage: HTMLImageElement = new Image();
    itemX = 50;
    itemY = 50;

    drawItem(itemContext: any){
        itemContext.drawImage(this.itemImage, 0, 0, 16, 16, this.itemX, this.itemY, 10, 10);
    }
}