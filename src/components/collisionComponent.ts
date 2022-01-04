import { Component } from "./component";
import * as PIXI from 'pixi.js';
import { Entity } from "../entities/entity";
import { injectable } from "tsyringe";

@injectable()
export class CollisionComponent extends Component {

    collisionRect?: PIXI.Rectangle;

    async init ({ collisionRect }: { collisionRect?: PIXI.Rectangle}) {
        this.collisionRect = collisionRect;
    }

    isCollidingWith (entity: Entity, ownRect?: PIXI.Rectangle) {
        return this.services.Physics.isOverlapping(ownRect ?? this.entity, entity);
    }

    update () {
        if (this.entity.debug?.collisionRect) {
            this.services.Debug.drawRectangle(this.entity.id, this.services.Physics.calculateCollisionRect(this.entity));
        }
   

    }
}