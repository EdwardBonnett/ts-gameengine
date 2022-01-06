import { Component } from '../components/component';
import { TransformComponent } from '../components/transform/transformComponent';
import { TileSize } from '../consts';
import { ServiceAccessor } from '../services/serviceAccessor';
import { IEntity } from './interfaces/IEntity';
import { IEntityParams } from './interfaces/IEntityParams';

export class Entity implements IEntity {
    get type (): 'entity' { return 'entity'; }

    name = 'Entity';

    private _components: Record<string, Component> = {};

    currentAction?: string;

    global = false;

    id = '';

    children: Array<IEntity> = [];

    parent?: IEntity;

    transform!: TransformComponent;

    debug?: {
        collisionRect?: boolean;
        drawRaycasts?: boolean;
    } = {}

    services = new ServiceAccessor().services;

    async init (params?: IEntityParams) {
        if (!params) params = {};
        this.transform = new TransformComponent(this);
        this.id = params.id ?? Math.random().toString();
        this.name = params.name ?? 'Entity';
        this.parent = params.parent;

        this.transform.localPosition.x = params.x ?? 0;
        this.transform.localPosition.y = params.y ?? 0;
        this.transform.localPosition.z = params.z ?? 0;
        this.transform.localScale.x = params.scaleX ?? 1;
        this.transform.localScale.y = params.scaleY ?? 1;
        this.transform.width = params.width ?? TileSize;
        this.transform.height = params.height ?? TileSize;

        this.global = params.global ?? false;
        this.debug = params.debug;

        const componentProps: Record<string, object> = params.componentProps ?? {};

        [...(params.components ?? []), ...(params.additionalComponents ?? [])].forEach((component) => {
            this.addComponent(component.component, null, false);
            componentProps[component.component.name] = { ...(component.props ?? {}), ...componentProps[component.component.name] };
        });

        const components = this.getAllComponents();
        for (let i = 0; i < components.length; i += 1) {
            const component = components[i];
            await component.init(componentProps[component.name] ?? {});
        }
    }

    getComponent<T extends Component> (component: { new (entity: Entity): T }) {
        return this._components[component.name] as T;
    }

    addComponent<T extends Component> (ComponentType: { new (entity: Entity): T }, props?: unknown, initialise = true) {
        if (this._components[ComponentType.name]) {
            console.warn(`Component ${ComponentType.name} had already been added, replacing`);
        }
        this._components[ComponentType.name] = new ComponentType(this);
        if (initialise) {
            this._components[ComponentType.name].init(props ?? {});
        }
    }

    removeComponent<T extends Component> (component: { new (entity: Entity): T }) {
        if (this._components[component.name]) {
            this._components[component.name].destroy();
            delete this._components[component.name];
        }
    }

    getAllComponents () {
        return Object.values(this._components);
    }

    update (dt: number) {
        Object.values(this._components).forEach((component) => {
            component.update(dt);
        });
        this.children.forEach((child) => {
            child.update(dt);
        });
    }

    removeChild (entity: Entity) {
        const index = this.children?.indexOf(entity) ?? -1;
        if (index > -1) {
            this.children?.splice(index, 1);
        }
    }

    destroy () {
        Object.values(this._components).forEach((component) => {
            component.destroy();
        });
        this.services.Entity.removeEntity(this);
        this.services.Map.removeEntityFromMap(this);
        this.services.Debug.removeRectangle(this.id);
        this.services.Debug.removeLine(this.id);
        this.children.forEach((child) => {
            child.destroy();
        });
        if (this.parent) this.parent.removeChild(this);
    }
}
