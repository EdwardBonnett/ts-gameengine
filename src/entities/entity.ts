import * as PIXI from 'pixi.js';
import Component from '../components/component';
import Direction from '../models/direction';
import DebugService from '../services/debugService';
import EntityService from '../services/entityService';
import GameService from '../services/gameService';
import InputService from '../services/inputService';
import MapService from '../services/mapService';
import TextureService from '../services/textureService';

export interface EntityParams {
    name?: string;
    resourceName?: string;
    resourcePath?: string;
    currentAnimation?: string;
    looping?: boolean;
    animated?: boolean;
    x?: number;
    y?: number;
    z?: number;
    scaleX?: number;
    scaleY?: number;
    collisionRect?: { x: number; y: number, width: number; height: number },
    components?: Array<{ component:  typeof Component, props?: unknown }>;
    componentProps?: Record<string, unknown>;
    global?: boolean;
    debug?: {
        collisionRect?: boolean;
    };
}

export default class Entity {
    name = 'Entity';

    resourceName?: string;
    
    sprite?: PIXI.AnimatedSprite;
    
    currentAnimation?: string;
    
    resourcePath?: string;
    
    currentDirection: Direction = Direction.Down;

    components: Record<string, Component> = {};

    currentAction?: string;

    global = false;

    scaleX: number = 0;
    
    scaleY: number = 0;

    id: string = '';
    
    animated: boolean = false;

    private _collisionRect?: PIXI.Rectangle;

    z = 0;

    private _x = 0;

    private _y = 0;

    debug?: {
        collisionRect?: boolean;
    } = {}

    constructor (
        public gameService: GameService, 
        public textureService: TextureService, 
        public inputService: InputService, 
        public mapService: MapService,
        public entityService: EntityService, 
        public debugService: DebugService) {
    }

    get x () {
        return this._x;
    }

    set x (val: number) {
        this._x = val;
        if (this.sprite) {
            this.sprite.x = this.x;
        }
        this.drawCollisionBox();  
    }

    get y () {
        return this._y;
    }

    set y (val: number) {
        this._y = val;
        if (this.sprite) {
            this.sprite.y = this.y;
        }
        this.drawCollisionBox();
    }

    get collisionRect () {
        if (!this.sprite) return;
        return this.calculateCollisionRect(this.x, this.y, this.sprite?.width, this.sprite?.height);
    }

    set collisionRect (rect: PIXI.Rectangle | undefined) {
        this._collisionRect = rect;
    }

    init (params?: EntityParams) {
        this.id = Math.random().toString();
        if (params) {
            this.name = params.name ?? 'Entity';
            this.resourceName = params.resourceName ?? this.name;
            this.resourcePath = params.resourcePath;
            this.currentAnimation = params.currentAnimation;
            this.x = params.x ?? 0;
            this.y = params.y ?? 0
            this.z = params.z ?? 0;
            this.scaleX = params.scaleX ?? 1;
            this.scaleY = params.scaleY ?? 1;
            this.global = params.global ?? false;
            this.collisionRect = params.collisionRect as PIXI.Rectangle;
            this.animated = params.animated ?? false;
            this.debug = params.debug;
            if (!params.componentProps) params.componentProps = {};
            if (params.components) {
                params.components.forEach((c) => {
                    const component = new c.component(this);
                    if (c.props) {
                        params.componentProps![component.name] = c.props;
                    }
                    this.components[component.name] = component;
                });
            }
            Object.values(this.components).forEach((component) => {
                component.init(params.componentProps![component.name]);
            });
        }
    }

    async loadResource () {
        if (this.resourcePath && this.resourceName) {
            await this.textureService.loadResource(this.resourcePath, this.resourceName);
        }
    }

    private drawCollisionBox () {
        if (this.debug?.collisionRect) {
            this.debugService.drawDebugRectangle(this.id, this.collisionRect);
        }
    }

    private createSprite (animationName: string, resourceName?: string) {
        if (!this.resourceName) return;
        const frames = this.textureService.getTextureNamesFromAnimation(resourceName ?? this.resourceName, animationName);
        const textures = this.textureService.getTextures(this.resourceName, frames);
        this.sprite = new PIXI.AnimatedSprite(textures);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.set(this.scaleX, this.scaleY);
        this.sprite.zIndex = this.z;
        this.gameService.App.stage.addChild(this.sprite);
        this.x = this.x;
        this.y = this.y;
        this.sprite.interactive = true;
        this.sprite.on('mouseover', () => {
            this.debugService.setDebugText(this.mapService.positionToTilePos(this.x) + ',' + this.mapService.positionToTilePos(this.y));
        });
        this.drawCollisionBox();
    }

    playAnimation (animationName: string, looping = true, startFrame = 0, resourceName?: string) {
        if (!this.resourceName && !resourceName) return;
        if (!this.sprite) {
            this.createSprite(animationName, this.resourceName ?? resourceName);
        } else {
            const frames = this.textureService.getTextureNamesFromAnimation(this.resourceName ?? resourceName!, animationName);
            const textures = this.textureService.getTextures(this.resourceName ?? resourceName!, frames);
            this.sprite.textures = textures;
        }
        this.currentAnimation = animationName;
        this.sprite!.loop = looping;
        this.sprite!.gotoAndPlay(startFrame);
        if (!this.animated) this.sprite?.stop();
    }

    update () {
        Object.values(this.components).forEach((component) => {
            component.update();
        });
    }

    destroy () {
        if (this.sprite) {
            this.sprite.destroy();
        }
        this.entityService.removeEntity(this);
        this.debugService.removeDebugRectangle(this.id);
    }

    calculateCollisionRect (x: number, y: number, width: number, height: number) {
        const rect = this._collisionRect ?? { 
            x: 0,
            y: 0, 
            height: height / this.scaleY,
            width: width / this.scaleX,
        };
        return new PIXI.Rectangle(
            x + rect.x * this.scaleX - width * 0.5,
            y + rect.y * this.scaleY - height * 0.5,
            rect.width * this.scaleX,
            rect.height * this.scaleY,
         );
    }

    isCollidingWith (entity: Entity, ownRect?: PIXI.Rectangle) {
        if (!ownRect) ownRect = this.collisionRect;
        if (!ownRect || entity === this) return false;
        const rect = entity.collisionRect;
        if (!rect) return false;
        return ownRect.right >= rect.left
            && ownRect.left <= rect.right
            && ownRect.top <= rect.bottom
            && ownRect.bottom >= rect.top
    }
 }