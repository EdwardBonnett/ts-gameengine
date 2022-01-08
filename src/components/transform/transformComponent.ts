import { TileSize } from '../../consts';
import { Direction } from '../../models/direction';
import { lerp } from '../../util/lerp';
import { Component } from '../component';
import { LocalPosition } from './localPosition';
import { LocalScale } from './localScale';
import { Position } from './position';
import { Scale } from './scale';

export class TransformComponent extends Component {
    readonly position: Position = new Position().init(this.entity);

    readonly localPosition: LocalPosition = new LocalPosition().init(this.entity);

    readonly scale: Scale = new Scale().init(this.entity);

    readonly localScale: LocalScale = new LocalScale().init(this.entity);

    height: number = TileSize;

    width: number = TileSize;

    direction: Direction = Direction.Down;

    update (dt: number): void {
        if (this.position.destinationX !== null) {
            this.position.x = lerp(this.position.x, this.position.destinationX, dt * 0.1);
            if (Math.abs(this.position.x - this.position.destinationX) < 0.4) {
                this.position.x = Math.round(this.position.destinationX);
                this.position.destinationX = null;
            }
        }
        if (this.position.destinationY !== null) {
            this.position.y = lerp(this.position.y, this.position.destinationY, dt * 0.1);
            if (Math.abs(this.position.y - this.position.destinationY) < 0.4) {
                this.position.y = Math.round(this.position.destinationY);
                this.position.destinationY = null;
            }
        }
    }
}
