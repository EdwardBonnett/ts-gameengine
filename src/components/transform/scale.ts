import { IEntity } from '../../entities/interfaces/IEntity';

export class Scale {
    entity!: IEntity;

    init (entity: IEntity) {
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
