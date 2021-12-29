import { TileSize } from "../consts";
import WorldMap from "../models/worldMap";
import Component from "./component";
import MoveComponent from "./moveComponent";

export default class DoorComponent extends Component {

    name = "door";

    destination?: typeof WorldMap;

    destinationX?: number;

    destinationY?: number;
   
    init ({ room, x, y }: { room: typeof WorldMap, x: number, y: number }) {
        super.init();
        this.destination = room;
        this.destinationX = x;
        this.destinationY = y;
    }

    update () {
        if (!this.destination || !this.destinationX || !this.destinationY) return;
        this.entity.mapService.currentMap?.entities?.forEach((entity) => {
            if (entity.components.playerInput && this.entity.isCollidingWith(entity)) {
                this.entity.mapService.changeMap(this.destination!);
                entity.x = this.destinationX! * TileSize;
                entity.y = this.destinationY! * TileSize;
                if (entity.components.move) {
                    (entity.components.move as MoveComponent).destinationX = this.destinationX! * TileSize;
                    (entity.components.move as MoveComponent).destinationY = this.destinationY! * TileSize;
                }
            }
        });
        
    }
}