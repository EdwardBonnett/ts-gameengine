import { Component } from "./component";
import * as PIXI from 'pixi.js';
import { Entity } from "../entities/entity";

export class CollisionComponent extends Component {

    private _collisionRect?: PIXI.Rectangle;

    get collisionRect () {
        return this.calculateCollisionRect(this.entity.transform.position.x, this.entity.transform.position.y, this.entity.transform.width, this.entity.transform.height);
    }

    set collisionRect (rect: PIXI.Rectangle | undefined) {
        this._collisionRect = rect;
    }

    async init ({ collisionRect }: { collisionRect?: PIXI.Rectangle}) {
        this.collisionRect = collisionRect;
    }

    calculateCollisionRect (x: number, y: number, width: number, height: number) {
        const rect = this._collisionRect ?? { 
            x: 0,
            y: 0, 
            height: height,
            width: width,
        };

        if (this.entity.parent) {
            x += this.entity.transform.localPosition.x * this.entity.parent.transform.scale.x - this.entity.transform.localPosition.x;
            y += this.entity.transform.localPosition.y * this.entity.parent.transform.scale.y - this.entity.transform.localPosition.y;
        }

        return new PIXI.Rectangle(
            x - width * this.entity.transform.scale.x * 0.5 + rect.x * this.entity.transform.scale.x,
            y - height * this.entity.transform.scale.y * 0.5 + rect.y * this.entity.transform.scale.y,
            rect.width * this.entity.transform.scale.x,
            rect.height * this.entity.transform.scale.y,
         );
    }

    isCollidingWith (entity: Entity, ownRect?: PIXI.Rectangle) {
        if (!ownRect) ownRect = this.collisionRect;
        if (!ownRect || entity === this.entity) return false;
        const rect = entity.getComponent(CollisionComponent)?.collisionRect;
        if (!rect) return false;
        return Math.max(ownRect.right, ownRect.left) >= Math.min(rect.left, rect.right)
            && Math.min(ownRect.left, ownRect.right) <= Math.max(rect.right, rect.left)
            && Math.min(ownRect.top, ownRect.bottom) <= Math.max(rect.bottom, rect.top)
            && Math.max(ownRect.bottom, ownRect.top) >= Math.min(rect.top, rect.bottom)
    }

    update () {
        if (this.entity.debug?.collisionRect) {
            this.entity.debugService.drawDebugRectangle(this.entity.id, this.collisionRect);
        }
   

    }
}