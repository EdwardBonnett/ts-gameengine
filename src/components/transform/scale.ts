import { Entity } from "../../entities/entity";

export class Scale {
    entity!: Entity;

    init (entity: Entity) {
        this.entity = entity;
        return this;
    }

    get x (): number {
        return (this.entity.parent?.transform.scale.x ?? 1) * this.entity.transform.localScale.x;
    }

    set x (val: number) {
        this.entity.transform.localScale.x = val / (this.entity.parent?.transform.scale.x ?? 1);
    }

    get y (): number {
        return (this.entity.parent?.transform.scale.y ?? 1) * this.entity.transform.localScale.y;
    }

    set y (val: number) {
        this.entity.transform.localPosition.y = val / (this.entity.parent?.transform.scale.y ?? 1);
    }
}