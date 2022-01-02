import { Entity } from "../../entities/entity";
import { IPosition } from "./IPosition";

export class LocalPosition implements IPosition {
    z = 0;

    private _x = 0;

    private _y = 0;

    entity!: Entity;

    init (entity: Entity) {
        this.entity = entity;
        return this;
    }

    get x () {
        return this._x;
    }

    set x (val: number) {
        if (this._x === val) return;
        this._x = val;
        // this.entity.transform.position.x = val;
    }

    get y () {
        return this._y;
    }

    set y (val: number) {
        if (this.y === val) return;
        this._y = val;
        // this.entity.transform.position.y = val;
    }
}