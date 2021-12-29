import { delay, inject, singleton } from "tsyringe";
import * as PIXI from 'pixi.js';
import InputService from "./inputService";
import MapService from "./mapService";
import MapOverworld from "../maps/mapOverworld";
import { TileSize } from "../consts";
import DebugService from "./debugService";

@singleton()
export default class GameService {

    public readonly ScreenWidth: number = 32;
    
    public readonly ScreenHeight: number = 16;
    
    public readonly App: PIXI.Application;

    timer = 0;

    constructor (
        @inject(InputService) private inputService: InputService,
        @inject(MapService) private mapService: MapService,
        @inject(delay(() => DebugService)) private debugService: DebugService,
    ) {
        this.App = new PIXI.Application({
            width: this.ScreenWidth * TileSize,
            height: this.ScreenHeight * TileSize,
            backgroundColor: 0x666666,
        });
        document.body.appendChild(this.App.view);
        this.App.ticker.add((dt: number) => this.update(dt));
    }

   

    init () {
        this.mapService.changeMap(MapOverworld);
    }

    update (dt: number) {
        this.timer += dt;
        this.mapService.update();
        this.inputService.update();
        this.debugService.update();
        this.App.stage.sortChildren();
    }
}