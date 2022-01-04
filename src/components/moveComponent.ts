import { Direction } from "../models/direction";
import { CollisionComponent } from "./collisionComponent";
import { Component } from "./component";
import { SolidComponent } from "./solidComponent";

export class MoveComponent extends Component {
    destinationX = 0;

    destinationY = 0;

    async init () {
        this.destinationX = this.entity.transform.position.x;
        this.destinationY = this.entity.transform.position.y;
        super.init();
    }

    update () {
        if (this.destinationX < this.entity.transform.position.x) {
            this.entity.transform.direction = Direction.Left;
        } else if (this.destinationX > this.entity.transform.position.x) {
            this.entity.transform.direction = Direction.Right;
        } else if (this.destinationY > this.entity.transform.position.y) {
            this.entity.transform.direction = Direction.Down;
        } else if (this.destinationY < this.entity.transform.position.y) {
            this.entity.transform.direction = Direction.Up;
        }

        this.entity.transform.position.x = this.destinationX;
        this.entity.transform.position.y = this.destinationY;
    }

    move (dt: number, direction: Direction) {
        switch (direction) {
            case Direction.Up:
                this.destinationY -= dt;
                break;
            case Direction.Down:
                this.destinationY += dt;
                break;
            case Direction.Left:
                this.destinationX -= dt;
                break;
            case Direction.Right:
                this.destinationX += dt;
                break;
        }
        if (direction) {
            this.entity.transform.direction = direction;
        }
        this.collisionCheck();
    }

    collisionCheck () {
        const collisionComponent = this.entity.getComponent(CollisionComponent);
        if (!collisionComponent) return;
        const myRect = this.services.Physics.calculateCollisionRect(this.entity, this.destinationX, this.destinationY, this.entity.transform.width, this.entity.transform.height);
        this.services.Map.currentMap?.entities.forEach((entity) => {
            if (!entity.getComponent(SolidComponent)) return;
            if (collisionComponent.isCollidingWith(entity, myRect)) {
                this.destinationX = this.entity.transform.position.x;
                this.destinationY = this.entity.transform.position.y
            }
        });
    }
}