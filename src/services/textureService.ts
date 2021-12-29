import * as PIXI from 'pixi.js';
import AnimationFrame from '../models/animationFrame';
import { delay, inject, singleton } from "tsyringe";
import GameService from './gameService';

@singleton()
export default class TextureService {
    textures: Record<string, PIXI.FrameObject> = {};

    constructor (@inject(delay(() => GameService)) private gameService: GameService) {
    }

    async loadResource (resourcePath: string, resourceName: string) {
        if (this.gameService.App.loader.resources[resourceName]) return;
        return new Promise((complete) => {
            this.gameService.App.loader.add(resourceName, resourcePath).load(() => {
                complete(true);
            })
        });
    }

    loadTexture (resourceName: string, textureName: string) {
        if (this.textures[textureName]) return;
        const time = this.gameService.App.loader.resources[resourceName].data.frames[textureName]?.duration ?? 99;
        this.textures[textureName] = { texture: PIXI.Texture.from(textureName),  time };
    }

    getTextures (resourceName: string, textureNames: string[]): Array<PIXI.FrameObject> {
        textureNames.forEach((textureName) => {
            this.loadTexture(resourceName, textureName);
        });
        
        return textureNames.map(a => this.textures[a]);
    }

    getTextureNamesFromAnimation (resourceName: string, animationName: string) {
        const animation: AnimationFrame = this.gameService.App.loader.resources[resourceName].data.meta.frameTags.find(((a: AnimationFrame) => a.name === animationName));
        if (!animation) return [];
        const textures = [];
        for (let i = animation.from; i <= animation.to; i += 1) {
            textures.push(`${resourceName} ${i}.aseprite`);
        }
        return textures;
    }
}