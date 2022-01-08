import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';
import { Layer } from '../models/layer';
import { IRenderService } from './interfaces/IRenderService';
import { Service } from './service';

@singleton()
export class RenderService extends Service implements IRenderService {
    private _layers: Array<Layer> = [];

    private _camera!: PIXI.Container;

    private _gui!: PIXI.Container;

    get fps () {
        return this.services.Game._app.ticker.FPS;
    }

    get resources () {
        return this.services.Game._app.loader.resources;
    }

    get screenWidth () {
        return this.services.Game._app.screen.width;
    }

    get screenHeight () {
        return this.services.Game._app.screen.height;
    }

    get camera () {
        return this._camera;
    }

    get gui () {
        return this._gui;
    }

    init () {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this._camera = new PIXI.Container();
        this._gui = new PIXI.Container();
        this.gui.width = this.screenWidth;
        this.gui.height = this.screenHeight;
        this.services.Game._app.stage.addChild(this._camera);
        this.services.Game._app.stage.addChild(this._gui);
        this.createLayer('world', 0);
    }

    loadResource (resourceName: string, resourcePath: string, cb?: PIXI.Loader.OnCompleteSignal | undefined) {
        this.services.Game._app.loader.add(resourceName, resourcePath).load(cb);
    }

    addToStage (child: PIXI.DisplayObject, layerNameOrIndex: string | number = 0) {
        const layer = this.getLayer(layerNameOrIndex);
        (layer ?? this.services.Game._app.stage).addChild(child);
    }

    getLayer (layerNameOrIndex: string | number) {
        return this._layers.find(a => a.name === layerNameOrIndex || a.index === layerNameOrIndex)?.layer;
    }

    createLayer (layerName: string, layerNumber: number, gui = false) {
        if (this._layers.find(a => a.name === layerName)) return;
        const container = new PIXI.Container();
        container.zIndex = layerNumber;

        if (gui) {
            this.gui.addChild(container);
        } else {
            this.camera.addChild(container);
        }

        this._layers.push({
            layer: container,
            name: layerName,
            gui,
            index: layerNumber,
        });
    }

    update () {
        this.services.Game._app.stage.sortChildren();
        this._layers.forEach((layer) => {
            layer.layer.sortChildren();
        });
    }
}
