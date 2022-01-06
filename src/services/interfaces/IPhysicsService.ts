import * as PIXI from 'pixi.js';
import { IEntity } from '../../entities/interfaces/IEntity';
import { Direction } from '../../models/direction';
import { IService } from './IService';

export interface IPhysicsService extends IService {
    raycast (entity: IEntity, distance: number, offset?: number, direction?: Direction, filter?: (filteredEntity?: IEntity, x?: number, y?: number) => boolean): IEntity | null;
    calculateCollisionRect (entity: IEntity, x?: number, y?: number, width?: number, height?: number): PIXI.Rectangle;
    isOverlapping (entityOrRect: PIXI.Rectangle | IEntity, entityOrRect2: PIXI.Rectangle | IEntity): boolean;
}
