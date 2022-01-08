import { IEntity } from '../../entities/interfaces/IEntity';
import { IPosition } from './IPosition';

export class LocalPosition implements IPosition {
    z = 0;

    private _x = 0;

    private _y = 0;

    private _destinationX: number | null = null;

    private _destinationY: number | null = null;

    entity!: IEntity;

    init (entity: IEntity) {
        this.entity = entity;
        return this;
    }

    get x () {
        return this._x;
    }

    set x (val: number) {
        if (this._x === val) return;
        this._x = val;
    }

    get y () {
        return this._y;
    }

    set y (val: number) {
        if (this.y === val) return;
        this._y = val;
        // this.entity.transform.position.y = val;
    }

    get destinationX () {
        return this._destinationX;
    }

    set destinationX (val: number | null) {
        this._destinationX = val;
    }

    get destinationY () {
        return this._destinationY;
    }

    set destinationY (val: number | null) {
        this._destinationY = val;
    }
}
