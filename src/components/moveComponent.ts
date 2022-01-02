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

    move (direction: Direction) {
        switch (direction) {
            case Direction.Up:
                this.destinationY -= 1;
                break;
            case Direction.Down:
                this.destinationY += 1;
                break;
            case Direction.Left:
                this.destinationX -= 1;
                break;
            case Direction.Right:
                this.destinationX += 1;
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
        const myRect = collisionComponent.calculateCollisionRect(this.destinationX, this.destinationY, this.entity.transform.width, this.entity.transform.height);
        this.entity.mapService.currentMap?.entities.forEach((entity) => {
            if (!entity.getComponent(SolidComponent)) return;
            if (collisionComponent.isCollidingWith(entity, myRect)) {
                this.destinationX = this.entity.transform.position.x;
                this.destinationY = this.entity.transform.position.y
            }
        });
    }
}