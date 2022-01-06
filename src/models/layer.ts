import * as PIXI from 'pixi.js';

export interface Layer {
    name: string;
    index: number;
    layer: PIXI.Container;
    gui: boolean;
}
