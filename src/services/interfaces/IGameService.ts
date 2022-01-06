import * as PIXI from 'pixi.js';
import { IService } from './IService';

export interface IGameService extends IService {

    readonly _app: PIXI.Application;
    init (): void;

    update (dt: number): void;
}
