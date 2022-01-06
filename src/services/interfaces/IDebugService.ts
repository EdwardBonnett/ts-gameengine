import * as PIXI from 'pixi.js';
import { IService } from './IService';

export interface IDebugService extends IService {
    init ():void;
    setDebugText (text: string): void;
    drawLine (id: string, line: { xFrom: number; yFrom: number; xTo: number; yTo: number }, gui: boolean): void;
    removeLine (id: string): void;
    drawRectangle (id: string, rect: PIXI.Rectangle, gui: boolean): void
    removeRectangle (id: string): void;
    update (): void;
}
