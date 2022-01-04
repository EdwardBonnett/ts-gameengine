import * as PIXI from 'pixi.js';
import { AnimationFrame } from '../models/animationFrame';
import { delay, inject, singleton } from "tsyringe";
import { GameService } from './gameService';
import { ServiceAccessor } from './serviceAccessor';

@singleton()
export class TextureService extends ServiceAccessor {
    textures: Record<string, PIXI.FrameObject> = {};


    async loadResource (resourcePath: string, resourceName: string) {
        if (this.services.Game.App.loader.resources[resourceName]) return;
        return new Promise((complete) => {
            this.services.Game.App.loader.add(resourceName, resourcePath).load(() => {
                complete(true);
            })
        });
    }

    loadTexture (resourceName: string, textureName: string) {
        if (this.textures[textureName]) return;
        const time = this.services.Game.App.loader.resources[resourceName].data.frames[textureName]?.duration ?? 99;
        this.textures[textureName] = { texture: PIXI.Texture.from(textureName),  time };
    }

    getTextures (resourceName: string, textureNames: string[]): Array<PIXI.FrameObject> {
        textureNames.forEach((textureName) => {
            this.loadTexture(resourceName, textureName);
        });
        
        return textureNames.map(a => this.textures[a]);
    }

    getTextureNamesFromAnimation (resourceName: string, animationName: string) {
        const animation: AnimationFrame = this.services.Game.App.loader.resources[resourceName].data.meta.frameTags.find(((a: AnimationFrame) => a.name === animationName));
        if (!animation) return [];
        const textures = [];
        for (let i = animation.from; i <= animation.to; i += 1) {
            textures.push(`${resourceName} ${i}.aseprite`);
        }
        return textures;
    }
}