import * as PIXI from 'pixi.js';
import { IService } from './IService';

export interface IRenderService extends IService {
    readonly fps: number;
    readonly resources: PIXI.utils.Dict<PIXI.LoaderResource>;
    readonly screenWidth: number;
    readonly screenHeight: number;
    readonly camera: PIXI.Container;
    readonly gui: PIXI.Container;
    init (): void;
    loadResource (resourceName: string, resourcePath: string, cb?: PIXI.Loader.OnCompleteSignal | undefined): void;
    addToStage (child: PIXI.DisplayObject, layerNameOrIndex: string | number): void;
    getLayer (layerNameOrIndex: string | number): PIXI.Container | undefined;
    createLayer (layerName: string, layerNumber: number, gui: boolean): void;
    update (): void;
}
