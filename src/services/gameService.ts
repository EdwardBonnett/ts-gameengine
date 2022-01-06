import { singleton } from 'tsyringe';
import * as PIXI from 'pixi.js';
import { MapOverworld } from '../maps/mapOverworld';
import { Service } from './service';
import { IGameService } from './interfaces/IGameService';

@singleton()
export class GameService extends Service implements IGameService {
    readonly _app: PIXI.Application;

    constructor () {
        super();
        const el = document.getElementById('game') as HTMLElement;
        this._app = new PIXI.Application({
            width: 320,
            height: 320,
            backgroundColor: 0x333333,
            autoDensity: true,
            resizeTo: window,
            resolution: window.devicePixelRatio,
        });
        el.appendChild(this._app.view);
        this._app.ticker.add((dt: number) => this.update(dt));
    }

    init () {
        this.services.Render.init();
        this.services.Debug.init();
        this.services.Map.changeMap(MapOverworld);
    }

    update (dt: number) {
        this.services.Map.update(dt);
        this.services.Debug.update();
        this.services.Render.update();
        this.services.Input.update();
    }
}
