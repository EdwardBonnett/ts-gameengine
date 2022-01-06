import * as PIXI from 'pixi.js';
import { Component } from './component';

export class RenderComponent extends Component {
    resourceName?: string;

    resourcePath?: string;

    currentAnimation?: string;

    looping = false;

    spriteType: 'animated' | 'static' | 'tiled' | 'animatedTiled' = 'static';

    visible = true;

    sprite!: PIXI.Sprite | PIXI.AnimatedSprite | PIXI.TilingSprite;

    layer!: string | number;

    tiledWidth?: number;

    tiledHeight?: number;

    animatedTexture: Array<PIXI.FrameObject> = [];

    time = 0;

    async init ({
        resourceName, resourcePath, currentAnimation, looping, spriteType, visible, layer, tiledHeight, tiledWidth,
    }:
        {
            resourceName?: string;
            resourcePath: string;
            currentAnimation?: string;
            looping?: boolean;
            spriteType?: 'animated' | 'static' | 'tiled' | 'animatedTiled';
            visible?: boolean;
            layer?: string | number;
            tiledHeight?: number;
            tiledWidth?: number
        }) {
        this.resourceName = resourceName ?? this.entity.name;
        this.resourcePath = resourcePath;
        this.currentAnimation = currentAnimation;
        this.looping = looping ?? false;
        this.spriteType = spriteType ?? 'static';
        this.visible = visible ?? true;
        this.layer = layer ?? 0;
        this.tiledHeight = tiledHeight;
        this.tiledWidth = tiledWidth;

        await this.loadResource();
        if (this.currentAnimation) {
            this.playAnimation(this.currentAnimation);
        }
    }

    async loadResource () {
        if (this.resourcePath && this.resourceName) {
            await this.services.Textures.loadResource(this.resourcePath, this.resourceName);
        }
    }

    private createSprite (animationName: string, resourceName?: string) {
        if (!this.resourceName) return;
        const frames = this.services.Textures.getTextureNamesFromAnimation(resourceName ?? this.resourceName, animationName);
        const textures = this.services.Textures.getTextures(this.resourceName, frames);
        switch (this.spriteType) {
        case 'animated':
            this.sprite = new PIXI.AnimatedSprite(textures);
            break;
        case 'static':
            this.sprite = new PIXI.Sprite(textures[0].texture);
            break;
        case 'tiled':
            this.sprite = new PIXI.TilingSprite(textures[0].texture);
            this.sprite.height = this.tiledHeight ?? this.sprite.height;
            this.sprite.width = this.tiledWidth ?? this.sprite.width;
            break;
        case 'animatedTiled':
            this.sprite = new PIXI.TilingSprite(textures[0].texture);
            this.animatedTexture = textures;
            this.sprite.height = this.tiledHeight ?? this.sprite.height;
            this.sprite.width = this.tiledWidth ?? this.sprite.width;
            break;
        }
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.zIndex = this.entity.transform.position.z;
        if (this.entity.parent && this.entity.parent.getComponent(RenderComponent)) {
            this.entity.parent.getComponent(RenderComponent).sprite.addChild(this.sprite);
        } else {
            this.services.Render.addToStage(this.sprite, this.layer);
        }
        this.sprite.interactive = true;
        this.sprite.on('mouseover', () => {
            this.services.Debug.setDebugText(this.entity.transform.scale.x.toString());
        });
        if (!this.visible) {
            this.sprite.visible = false;
        }
    }

    stopAnimation () {
        if (this.spriteType === 'animated') {
            (this.sprite as PIXI.AnimatedSprite).stop();
        }
    }

    playAnimation (animationName: string, looping = true, startFrame = 0, resourceName?: string) {
        if (!this.resourceName && !resourceName) return;
        if (!this.sprite) {
            this.createSprite(animationName, this.resourceName ?? resourceName);
        } else {
            const frames = this.services.Textures.getTextureNamesFromAnimation(this.resourceName ?? resourceName ?? '', animationName);
            const textures = this.services.Textures.getTextures(this.resourceName ?? resourceName ?? '', frames);
            switch (this.spriteType) {
            case 'animated':
                (this.sprite as PIXI.AnimatedSprite).textures = textures;
                (this.sprite as PIXI.AnimatedSprite).loop = looping;
                (this.sprite as PIXI.AnimatedSprite).gotoAndPlay(startFrame);
                break;
            case 'static':
            case 'tiled':
                this.sprite.texture = textures[0].texture;
                break;
            case 'animatedTiled':
                this.animatedTexture = textures;
                this.sprite.texture = textures[0].texture;
                break;
            }
        }
        this.currentAnimation = animationName;
    }

    update (dt: number) {
        if (!this.sprite) return;
        if (this.spriteType === 'animatedTiled') {
            this.time += (dt / 60) * 1000;
            let frameTime = 0;

            for (let i = 0; i < this.animatedTexture.length; i += 1) {
                frameTime += this.animatedTexture[i].time;
                if (this.time >= frameTime) {
                    this.sprite.texture = this.animatedTexture[i].texture;
                    if (i === this.animatedTexture.length - 1) {
                        this.time = 0;
                    }
                    this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
            }
        }
        this.sprite.x = this.entity.transform.localPosition.x;
        this.sprite.y = this.entity.transform.localPosition.y;

        this.sprite.scale.x = this.entity.transform.localScale.x;
        this.sprite.scale.y = this.entity.transform.localScale.y;
    }

    destroy (): void {
        if (this.sprite) {
            this.sprite.parent.removeChild(this.sprite);
            this.sprite.destroy();
        }
    }
}
