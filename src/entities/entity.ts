import { Component } from '../components/component';
import { TransformComponent } from '../components/transform/transformComponent';
import { TileSize } from '../consts';
import { DebugService } from '../services/debugService';
import { EntityService } from '../services/entityService';
import { GameService } from '../services/gameService';
import { InputService } from '../services/inputService';
import { MapService } from '../services/mapService';
import { TextureService } from '../services/textureService';

export interface EntityParams {
    id?: string;
    name?: string;
    x?: number;
    y?: number;
    z?: number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
    components?: Array<{ component:  typeof Component, props?: unknown }>;
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

export class Entity {
    name = 'Entity';
    
    private _components: Record<string, Component> = {};

    currentAction?: string;

    global = false;

    id: string = '';
 
    children: Array<Entity> = [];

    parent?: Entity;
    
    transform!: TransformComponent;

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

    async init (params?: EntityParams) {
        if (!params) params = {};
        this.transform = new TransformComponent(this);
        this.id = params.id ?? Math.random().toString();
        this.name = params.name ?? 'Entity';
        this.parent = params.parent;
      
        this.transform.localPosition.x = params.x ?? 0;
        this.transform.localPosition.y = params.y ?? 0
        this.transform.localPosition.z = params.z ?? 0;
        this.transform.localScale.x = params.scaleX ?? 1;
        this.transform.localScale.y = params.scaleY ?? 1;
        this.transform.width = params.width ?? TileSize;
        this.transform.height = params.height ?? TileSize;
  
        this.global = params.global ?? false;
        this.debug = params.debug;

        const componentProps: Record<string, unknown> = {};

        (params.components ?? []).forEach((component) => {
            this.addComponent(component.component);
            componentProps[component.component.name] = component.props;
        });
    
        const components = this.getAllComponents();
        for (let i = 0; i < components.length; i += 1) {
            const component = components[i];
            await component.init(componentProps[component.name] ?? {});
        }
    }

    getComponent<T extends Component>(component: { new (entity: Entity): T }) {
        return this._components[component.name] as T;
    }

    addComponent<T extends Component>(component: { new (entity: Entity): T }, props?: unknown, initialise: boolean = true) {
        if (this._components[component.name]) {
            console.warn(`Component ${component.name} had already been added, replacing`);
        }
        this._components[component.name] = new component(this);
        if (initialise) {
            this._components[component.name].init(props);
        }
    }

    removeComponent<T extends Component>(component: { new (entity: Entity): T }) {
        if (this._components[component.name]) {
            this._components[component.name].destroy();
            delete this._components[component.name];
        }
    }

    getAllComponents () {
        return Object.values(this._components);
    }
   
    update () {
        Object.values(this._components).forEach((component) => {
            component.update();
        });
        this.children.forEach((child) => {
            child.update();
        });
    }

    destroy () {
        Object.values(this._components).forEach((component) => {
            component.destroy();
        });
        this.entityService.removeEntity(this);
        this.debugService.removeDebugRectangle(this.id);
        this.children.forEach((child) => {
            child.destroy();
        });
    }
 }