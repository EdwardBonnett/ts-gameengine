import { delay, inject, singleton } from "tsyringe";
import * as PIXI from 'pixi.js';
import { InputService } from "./inputService";
import { MapService } from "./mapService";
import { MapOverworld } from "../maps/mapOverworld";
import { TileSize } from "../consts";
import { DebugService } from "./debugService";
import { ServiceAccessor } from "./serviceAccessor";

@singleton()
export class GameService extends ServiceAccessor {

    public readonly ScreenWidth: number = 32;
    
    public readonly ScreenHeight: number = 16;
    
    public readonly App: PIXI.Application;

    timer = 0;

    constructor () {
        super();
        this.App = new PIXI.Application({
            width: this.ScreenWidth * TileSize,
            height: this.ScreenHeight * TileSize,
            backgroundColor: 0x666666,
            // autoDensity: true,
            // resizeTo: window,
            // resolution: window.devicePixelRatio,
        });
        document.body.appendChild(this.App.view);
        this.App.ticker.add((dt: number) => this.update(dt));
    }

    init () {
        this.services.Map.changeMap(MapOverworld);
        this.services.Debug.init();
    }

    update (dt: number) {
        this.timer += dt;
        this.services.Map.update(dt);
        this.services.Input.update();
        this.services.Debug.update();
        this.App.stage.sortChildren();
    }
}