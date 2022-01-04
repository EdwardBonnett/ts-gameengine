import * as PIXI from 'pixi.js';
import { inject, singleton, delay } from 'tsyringe';
import { GameService } from './gameService';
import { ServiceAccessor } from './serviceAccessor';

@singleton()
export class ScreenService extends ServiceAccessor {
    public readonly ScreenHeight: number = 16;
    
    public readonly ScreenWidth: number = 32;

    get fps () {
        return this.services.Game.App.ticker.FPS;
    }

    get resources () {
        return this.services.Game.App.loader.resources;
    }

    loadResource (resourceName: string, resourcePath: string, cb?: PIXI.Loader.OnCompleteSignal | undefined) {
        this.services.Game.App.loader.add(resourceName, resourcePath).load(cb);
    }

    addToStage (child: PIXI.DisplayObject) {
        this.services.Game.App.stage.addChild(child);
    }

    update () {
        this.services.Game.App.stage.sortChildren();
    }

}