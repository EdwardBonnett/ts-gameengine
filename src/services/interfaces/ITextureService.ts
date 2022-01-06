import * as PIXI from 'pixi.js';
import { IService } from './IService';

export interface ITextureService extends IService {
    loadResource (resourcePath: string, resourceName: string): Promise<boolean>;
    loadTexture (resourceName: string, textureName: string): void;
    getTextures (resourceName: string, textureNames: string[]): Array<PIXI.FrameObject>;
    getTextureNamesFromAnimation (resourceName: string, animationName: string): Array<string>;
}
