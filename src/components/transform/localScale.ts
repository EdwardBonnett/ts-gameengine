import { Entity } from "../../entities/entity";

export class LocalScale {
    private _x = 1;

    private _y = 1;

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
    }

    get y () {
        return this._y;
    }

    set y (val: number) {
        if (this._y === val) return;
        this._y = val;
    }
}