import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';
import { IEntity } from '../entities/interfaces/IEntity';
import { Component } from './component';

@injectable()
export class CollisionComponent extends Component {
    collisionRect?: PIXI.Rectangle;

    async init ({ collisionRect }: { collisionRect?: PIXI.Rectangle}) {
        this.collisionRect = collisionRect;
    }

    isCollidingWith (entity: IEntity, ownRect?: PIXI.Rectangle) {
        return this.services.Physics.isOverlapping(ownRect ?? this.entity, entity);
    }

    update () {
        if (this.entity.debug?.collisionRect) {
            this.services.Debug.drawRectangle(this.entity.id, this.services.Physics.calculateCollisionRect(this.entity), false);
        }
    }
}
