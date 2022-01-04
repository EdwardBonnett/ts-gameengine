import { Entity } from "../entities/entity";
import { Direction } from "../models/direction";
import { ServiceAccessor } from "./serviceAccessor";
import * as PIXI from 'pixi.js';
import { CollisionComponent } from "../components/collisionComponent";

export class PhysicsService extends ServiceAccessor {
    raycast (entity: Entity, distance: number, offset?: number, direction?: Direction, filter: (entity?: Entity, x?: number, y?: number) => boolean = () => true) {
        if (!direction) direction = entity.transform.direction;
        let x = entity.transform.position.x
        let y = entity.transform.position.y;
        let endX = x;
        let endY = y;
        switch (direction) {
            case Direction.Up:
                y -= offset ?? 0;
                endY = y - distance;
                break;
            case Direction.Right:
                x += offset ?? 0;
                endX = x + distance;
                break;
            case Direction.Down:
                y += offset ?? 0;
                endY = y + distance;
                break;
            case Direction.Left:
                x -= offset ?? 0;
                endX = x - distance;
                break;
        }
        
        if (entity.debug?.drawRaycasts) {
            this.services.Debug.drawLine(entity.id, { xFrom: x, yFrom: y, xTo: endX, yTo: endY });
        }

        const entities = this.services.Entity.entities.filter(entity => 
           filter(entity, x, y))

        while (x !== endX || y !== endY) {
            switch (direction) {
                case Direction.Up:
                    y -= 1;
                    break;
                case Direction.Right:
                    x += 1;
                    break;
                case Direction.Down:
                    y += 1;
                    break;
                case Direction.Left:
                    x -= 1;
                    break;
            }
            const rect = new PIXI.Rectangle(x, y, 1, 1);
            for (let i = 0; i < entities.length; i += 1) {
                const foundEntity = entities[i];
                if (foundEntity !== entity && this.isOverlapping(rect, foundEntity)) {
                    return foundEntity;
                }
            }
        }
        return null;
    }

    calculateCollisionRect (entity: Entity, x?: number, y?: number, width?: number, height?: number) {
        if (x === undefined) x = entity.transform.position.x;
        if (y === undefined) y = entity.transform.position.y;
        if (width === undefined) width = entity.transform.width;
        if (height === undefined) height = entity.transform.height;

        const rect = entity.getComponent(CollisionComponent)?.collisionRect ?? { 
            x: 0,
            y: 0, 
            height: height,
            width: width,
        };

        if (entity.parent) {
            x += entity.transform.localPosition.x * entity.parent.transform.scale.x - entity.transform.localPosition.x;
            y += entity.transform.localPosition.y * entity.parent.transform.scale.y - entity.transform.localPosition.y;
        }

        return new PIXI.Rectangle(
            x - width * entity.transform.scale.x * 0.5 + rect.x * entity.transform.scale.x,
            y - height * entity.transform.scale.y * 0.5 + rect.y * entity.transform.scale.y,
            rect.width * entity.transform.scale.x,
            rect.height * entity.transform.scale.y,
         );
    }

    isOverlapping (entityOrRect: PIXI.Rectangle | Entity, entityOrRect2: PIXI.Rectangle | Entity): boolean {
        if (entityOrRect === entityOrRect2) return false;
        const rect: PIXI.Rectangle = (entityOrRect as Entity).type === "entity" ? this.calculateCollisionRect(entityOrRect as Entity) : entityOrRect as PIXI.Rectangle;
        const rect2: PIXI.Rectangle = (entityOrRect2 as Entity).type === "entity" ? this.calculateCollisionRect(entityOrRect2 as Entity): entityOrRect2 as PIXI.Rectangle;
        return Math.max(rect.right, rect.left) >= Math.min(rect2.left, rect2.right)
            && Math.min(rect.left, rect.right) <= Math.max(rect2.right, rect2.left)
            && Math.min(rect.top, rect.bottom) <= Math.max(rect2.bottom, rect2.top)
            && Math.max(rect.bottom, rect.top) >= Math.min(rect2.top, rect2.bottom);
    }
}