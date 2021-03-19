import {BackgroundMap} from '../interfaces/backgroundmap';
import {Injectable, Input} from '@angular/core';

@Injectable()

export class BackgroundService {
    map: BackgroundMap = {
        imgsrc:"./assets/imgs/greenbckg.jpg",
        height: 400,
        width: 400
    };

}