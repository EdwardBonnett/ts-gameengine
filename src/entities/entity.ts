import * as PIXI from 'pixi.js';
import Component from '../components/component';
import { TileSize } from '../consts';
import Direction from '../models/direction';
import DebugService from '../services/debugService';
import EntityService from '../services/entityService';
import GameService from '../services/gameService';
import InputService from '../services/inputService';
import MapService from '../services/mapService';
import TextureService from '../services/textureService';

export interface EntityParams {
    id?: string;
    name?: string;
    resourceName?: string;
    resourcePath?: string;
    currentAnimation?: string;
    looping?: boolean;
    animated?: boolean;
    visible?: boolean;
    x?: number;
    y?: number;
    z?: number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
    collisionRect?: { x: number; y: number, width: number; height: number },
    components?: Array<{ component:  typeof Component, props?: unknown }>;
    componentProps?: Record<string, unknown>;
    global?: boolean;
    debug?: {
        collisionRect?: boolean;
    };
    parent?: Entity;
    children?: Array<{
        config: EntityParams,
        entity: typeof Entity
    }>;
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

    private _scaleX: number = 0;
    
    private _scaleY: number = 0;

    id: string = '';
    
    animated: boolean = false;

    visible: boolean = true;

    children: Array<Entity> = [];

    parent?: Entity;
    
    private _collisionRect?: PIXI.Rectangle;

    width: number = TileSize;

    height: number = TileSize;

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
        return (this.parent?.x ?? 0) + this._x;
    }

    set x (val: number) {
        this._x = val;
        if (this.sprite) {
            this.sprite.x = this.x - (this.parent?.x ?? 0);
        }
    }

    get y () {
        return (this.parent?.y ?? 0) + this._y;
    }

    set y (val: number) {
        this._y = val;
        if (this.sprite) {
            this.sprite.y = this.y - (this.parent?.y ?? 0);
        }
    }

    get scaleX () {
        return (this.parent?.scaleX ?? 1) * this._scaleX;
    }

    set scaleX (val: number) {
        this._scaleX = val;
        if (this.sprite) {
            this.sprite.scale.x = this._scaleX;
        }
    }

    get scaleY () {
        return (this.parent?.scaleY ?? 1) * this._scaleY;
    }

    set scaleY (val: number) {
        this._scaleY = val;
        if (this.sprite) {
            this.sprite.scale.y = this._scaleY;
        }
    }

    get collisionRect () {
        return this.calculateCollisionRect(this.x, this.y, this.width, this.height);
    }

    set collisionRect (rect: PIXI.Rectangle | undefined) {
        this._collisionRect = rect;
    }

    init (params?: EntityParams) {
        if (!params) params = {};
        this.id = params.id ?? Math.random().toString();
        this.name = params.name ?? 'Entity';
        this.parent = params.parent;
        this.resourceName = params.resourceName ?? this.name;
        this.resourcePath = params.resourcePath;
        this.currentAnimation = params.currentAnimation;
        this.x = params.x ?? 0;
        this.y = params.y ?? 0
        this.z = params.z ?? 0;
        this.width = params.width ?? TileSize;
        this.height = params.height ?? TileSize;
        this.scaleX = params.scaleX ?? 1;
        this.scaleY = params.scaleY ?? 1;
        this.global = params.global ?? false;
        this.collisionRect = params.collisionRect as PIXI.Rectangle;
        this.animated = params.animated ?? false;
        this.debug = params.debug;
        this.visible = params.visible ?? true;
        if (!params.componentProps) params.componentProps = {};
        if (params.components) {
            params.components.forEach((c) => {
                const component = new c.component(this);
                if (c.props) {
                    params!.componentProps![component.name] = c.props;
                }
                this.components[component.name] = component;
            });
        }
        Object.values(this.components).forEach((component) => {
            component.init(params!.componentProps![component.name]);
        });
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
        this.sprite.zIndex = this.z;
        if (this.parent && this.parent.sprite) {
            this.parent.sprite.addChild(this.sprite);
        } else {
            this.gameService.App.stage.addChild(this.sprite);
        }
        this.x = this._x;
        this.y = this._y;
        this.scaleX = this._scaleX;
        this.scaleY = this._scaleY;
        this.sprite.interactive = true;
        this.sprite.on('mouseover', () => {
            this.debugService.setDebugText(this.mapService.positionToTilePos(this.x) + ',' + this.mapService.positionToTilePos(this.y));
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
        this.children.forEach((child) => {
            child.update();
        });
        this.drawCollisionBox();
    }

    destroy () {
        if (this.sprite) {
            this.sprite.parent.removeChild(this.sprite);
            this.sprite.destroy();
        }
        this.entityService.removeEntity(this);
        this.debugService.removeDebugRectangle(this.id);
        this.children.forEach((child) => {
            child.destroy();
        });
    }

    calculateCollisionRect (x: number, y: number, width: number, height: number) {
        const rect = this._collisionRect ?? { 
            x: 0,
            y: 0, 
            height: height,
            width: width,
        };
        if (this.parent) {
            x += this._x * this.parent.scaleX - this._x;
            y += this._y * this.parent.scaleY - this._y;
        }

        return new PIXI.Rectangle(
            x - width * this.scaleX * 0.5 + rect.x * this.scaleX,
            y - height * this.scaleY * 0.5 + rect.y * this.scaleY,
            rect.width * this.scaleX,
            rect.height * this.scaleY,
         );
        return new PIXI.Rectangle(
            this.sprite!.worldTransform.tx - width * 0.5 * this.scaleX + rect.x * this.scaleX, 
            this.sprite!.worldTransform.ty - height * 0.5 * this.scaleY + rect.y * this.scaleY, 
            rect.width * this.scaleX,
            rect.height * this.scaleY
        )
    }

    isCollidingWith (entity: Entity, ownRect?: PIXI.Rectangle) {
        if (!ownRect) ownRect = this.collisionRect;
        if (!ownRect || entity === this) return false;
        const rect = entity.collisionRect;
        if (!rect) return false;
        return Math.max(ownRect.right, ownRect.left) >= Math.min(rect.left, rect.right)
            && Math.min(ownRect.left, ownRect.right) <= Math.max(rect.right, rect.left)
            && Math.min(ownRect.top, ownRect.bottom) <= Math.max(rect.bottom, rect.top)
            && Math.max(ownRect.bottom, ownRect.top) >= Math.min(rect.top, rect.bottom)
    }
 }