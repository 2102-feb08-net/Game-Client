export interface BackgroundMap {
    imgsrc: string;
    mapHeight: number;
    mapWidth: number;
    columns: number;
    rows: number;
    tileSize: number;
    layer: Array<Array<number>>;
}