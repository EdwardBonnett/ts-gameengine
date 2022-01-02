import { Entity } from "../../entities/entity";

export class Position {

    entity!: Entity;

    init (entity: Entity) {
        this.entity = entity;
        return this;
    }

    get x () {
        return (this.entity.parent?.transform.position.x ?? 0) + this.entity.transform.localPosition.x;
    }

    set x (val: number) {
        this.entity.transform.localPosition.x = val - (this.entity.parent?.transform.position.x ?? 0);
    }

    get y () {
        return (this.entity.parent?.transform.position.y ?? 0) + this.entity.transform.localPosition.y;
    }

    set y (val: number) {
        this.entity.transform.localPosition.y = val - (this.entity.parent?.transform.position.y ?? 0);
    }

    get z () {
        return (this.entity.parent?.transform.position.z ?? 0) + this.entity.transform.localPosition.z;
    }

    set z (val: number) {
        this.entity.transform.localPosition.z = val - (this.entity.parent?.transform.position.z ?? 0);
    }

}