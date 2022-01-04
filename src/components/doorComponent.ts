import { TileSize } from "../consts";
import { WorldMap } from "../models/worldMap";
import { CollisionComponent } from "./collisionComponent";
import { Component } from "./component";
import { MoveComponent } from "./moveComponent";
import { PlayerInputComponent } from "./playerInputComponent";

export class DoorComponent extends Component {

    destination?: typeof WorldMap;

    destinationX?: number;

    destinationY?: number;
   
    async init ({ room, x, y }: { room: typeof WorldMap, x: number, y: number }) {
        super.init();
        this.destination = room;
        this.destinationX = x;
        this.destinationY = y;
        if (!this.entity.getComponent(CollisionComponent)) {
            this.entity.addComponent(CollisionComponent);
        }
    }

    update () {
        if (!this.destination || !this.destinationX || !this.destinationY) return;
        this.services.Map.currentMap?.entities?.forEach((entity) => {
            if (entity.getComponent(PlayerInputComponent) && this.entity.getComponent(CollisionComponent)?.isCollidingWith(entity)) {
                this.services.Map.changeMap(this.destination!);
                entity.transform.position.x = this.destinationX! * TileSize;
                entity.transform.position.y = this.destinationY! * TileSize;
                if (entity.getComponent(MoveComponent)) {
                    entity.getComponent(MoveComponent).destinationX = this.destinationX! * TileSize;
                    entity.getComponent(MoveComponent).destinationY = this.destinationY! * TileSize;
                }
            }
        });
        
    }
}