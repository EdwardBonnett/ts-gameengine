import { TileSize } from '../consts';
import { Direction } from '../models/direction';
import { Component } from './component';
import { PlayerInputComponent } from './playerInputComponent';

export class PushableComponent extends Component {
    update () {
        const lastKey = this.services.Input.getLastKeyDown();
        if (lastKey === 'Action' && this.entity.transform.position.destinationX === null && this.entity.transform.position.destinationY === null) {
            this.services.Map.currentMap?.entities?.forEach((entity) => {
                if (entity.getComponent(PlayerInputComponent) && this.services.Physics.raycast(entity, TileSize, 0, entity.transform.direction, (e) => e?.parent !== entity) === this.entity) {
                    switch (entity.transform.direction) {
                    case Direction.Up:
                        this.entity.transform.position.destinationY = this.entity.transform.position.y - 16;
                        break;
                    case Direction.Down:
                        this.entity.transform.position.destinationY = this.entity.transform.position.y + 16;
                        break;
                    case Direction.Left:
                        this.entity.transform.position.destinationX = this.entity.transform.position.x - 16;
                        break;
                    case Direction.Right:
                        this.entity.transform.position.destinationX = this.entity.transform.position.x + 16;
                        break;
                    }
                }
            });
        }
    }
}
