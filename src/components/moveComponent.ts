import Direction from "../models/direction";
import Component from "./component";

export default class MoveComponent extends Component {

    name = "move";

    destinationX = 0;

    destinationY = 0;

    init () {
        this.destinationX = this.entity.x;
        this.destinationY = this.entity.y;
        super.init();
    }

    update () {
        if (this.destinationX < this.entity.x) {
            this.entity.currentDirection = Direction.Left;
        } else if (this.destinationX > this.entity.x) {
            this.entity.currentDirection = Direction.Right;
        } else if (this.destinationY > this.entity.y) {
            this.entity.currentDirection = Direction.Down;
        } else if (this.destinationY < this.entity.y) {
            this.entity.currentDirection = Direction.Up;
        }

        this.entity.x = this.destinationX;
        this.entity.y = this.destinationY;
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
            this.entity.currentDirection = direction;
        }
        this.collisionCheck();
    }

    collisionCheck () {
        if (!this.entity.sprite) return;
        const myRect = this.entity.calculateCollisionRect(this.destinationX, this.destinationY, this.entity.width, this.entity.height);
        this.entity.mapService.currentMap?.entities.forEach((entity) => {
            if (!entity.components.solid) return;
            if (this.entity.isCollidingWith(entity, myRect)) {
                    this.destinationX = this.entity.x;
                    this.destinationY = this.entity.y
                }
        });
    }
}