import * as PIXI from 'pixi.js';
import { Component } from "./component";

export class RenderComponent extends Component {
    resourceName?: string;

    resourcePath?: string;

    currentAnimation?: string;

    looping = false;

    animated = false;

    visible = true;

    sprite!: PIXI.AnimatedSprite;

    async init ({ resourceName, resourcePath, currentAnimation, looping, animated, visible }: 
        {
            resourceName?: string;
            resourcePath: string;
            currentAnimation?: string;
            looping?: boolean;
            animated?: boolean;
            visible?: boolean;
        }) {
            this.resourceName = resourceName ?? this.entity.name;
            this.resourcePath = resourcePath;
            this.currentAnimation = currentAnimation;
            this.looping = looping ?? false;
            this.animated = animated ?? false;
            this.visible = visible ?? true;

            await this.loadResource();
            if (this.currentAnimation) {
                this.playAnimation(this.currentAnimation);
            }
        }

    async loadResource () {
        if (this.resourcePath && this.resourceName) {
            await this.entity.textureService.loadResource(this.resourcePath, this.resourceName);
        }
    }

    private createSprite (animationName: string, resourceName?: string) {
        if (!this.resourceName) return;
        const frames = this.entity.textureService.getTextureNamesFromAnimation(resourceName ?? this.resourceName, animationName);
        const textures = this.entity.textureService.getTextures(this.resourceName, frames);
        this.sprite = new PIXI.AnimatedSprite(textures);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.zIndex = this.entity.transform.position.z;
        if (this.entity.parent && this.entity.parent.getComponent(RenderComponent)) {
            this.entity.parent.getComponent(RenderComponent).sprite.addChild(this.sprite);
        } else {
            this.entity.gameService.App.stage.addChild(this.sprite);
        }
        this.sprite.interactive = true;
        this.sprite.on('mouseover', () => {
            this.entity.debugService.setDebugText(this.entity.transform.scale.x.toString());
        });
        if (!this.visible) {
            this.sprite.visible = false;
        }
    }

    playAnimation (animationName: string, looping = true, startFrame = 0, resourceName?: string) {
        if (!this.resourceName && !resourceName) return;
        if (!this.sprite) {
            this.createSprite(animationName, this.resourceName ?? resourceName);
        } else {
            const frames = this.entity.textureService.getTextureNamesFromAnimation(this.resourceName ?? resourceName!, animationName);
            const textures = this.entity.textureService.getTextures(this.resourceName ?? resourceName!, frames);
            this.sprite.textures = textures;
        }
        this.currentAnimation = animationName;
        this.sprite!.loop = looping;
        this.sprite!.gotoAndPlay(startFrame);
        if (!this.animated) this.sprite?.stop();
    }

    update () {
        if (!this.sprite) return;
        this.sprite.x = this.entity.transform.localPosition.x;
        this.sprite.y = this.entity.transform.localPosition.y;
        this.sprite.scale.x = this.entity.transform.localScale.x;
        this.sprite.scale.y = this.entity.transform.localScale.y;
    }

    destroy(): void {
        if (this.sprite) {
            this.sprite.parent.removeChild(this.sprite);
            this.sprite.destroy();
        }
    }

}