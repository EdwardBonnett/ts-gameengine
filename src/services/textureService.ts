import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';
import { AnimationFrame } from '../models/animationFrame';
import { ITextureService } from './interfaces/ITextureService';
import { Service } from './service';

@singleton()
export class TextureService extends Service implements ITextureService {
    textures: Record<string, PIXI.FrameObject> = {};

    async loadResource (resourcePath: string, resourceName: string): Promise<boolean> {
        if (this.services.Render.resources[resourceName]) return true;
        return new Promise((complete) => {
            this.services.Render.loadResource(resourceName, resourcePath, () => {
                complete(true);
            });
        });
    }

    loadTexture (resourceName: string, textureName: string) {
        if (this.textures[textureName]) return;
        const time = this.services.Render.resources[resourceName].data.frames[textureName]?.duration ?? 99;
        this.textures[textureName] = { texture: PIXI.Texture.from(textureName), time };
    }

    getTextures (resourceName: string, textureNames: string[]): Array<PIXI.FrameObject> {
        textureNames.forEach((textureName) => {
            this.loadTexture(resourceName, textureName);
        });

        return textureNames.map(a => this.textures[a]);
    }

    getTextureNamesFromAnimation (resourceName: string, animationName: string) {
        const animation: AnimationFrame = this.services.Render.resources[resourceName].data.meta.frameTags.find(((a: AnimationFrame) => a.name === animationName));
        if (!animation) return [];
        const textures = [];
        for (let i = animation.from; i <= animation.to; i += 1) {
            textures.push(`${resourceName} ${i}.aseprite`);
        }
        return textures;
    }
}
