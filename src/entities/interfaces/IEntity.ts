import { Component } from '../../components/component';
import { TransformComponent } from '../../components/transform/transformComponent';
import { IServices } from '../../services/interfaces/IServices';
import { IEntityParams } from './IEntityParams';

export interface IEntity {
    readonly type: 'entity';
    currentAction?: string;
    global: boolean;
    id: string;
    name: string;
    children: Array<IEntity>;
    parent?: IEntity;
    transform: TransformComponent;
    services: IServices;
    debug?: {
        collisionRect?: boolean;
        drawRaycasts?: boolean;
    };
    init (params?: IEntityParams): Promise<void>;
    getComponent<T extends Component> (component: { new (entity: IEntity): T }): T;
    addComponent<T extends Component> (component: { new (entity: IEntity): T }, props?: unknown, initialise?: boolean): void;
    removeComponent<T extends Component> (component: { new (entity: IEntity): T }): void;
    getAllComponents (): Array<Component>;
    update (dt: number): void;
    removeChild (entity: IEntity): void;
    destroy (): void;

}
