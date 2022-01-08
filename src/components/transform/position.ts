import { IEntity } from '../../entities/interfaces/IEntity';

export class Position {
    entity!: IEntity;

    init (entity: IEntity) {
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

    get destinationX () {
        if (this.entity.transform.localPosition.destinationX === null) return null;
        return (this.entity.parent?.transform.position.x ?? 0) + this.entity.transform.localPosition.destinationX;
    }

    set destinationX (val: number | null) {
        if (val === null) {
            this.entity.transform.localPosition.destinationX = null;
            return;
        }
        this.entity.transform.localPosition.destinationX = val - (this.entity.parent?.transform.position.x ?? 0);
    }

    get destinationY () {
        if (this.entity.transform.localPosition.destinationY === null) return null;
        return (this.entity.parent?.transform.position.y ?? 0) + this.entity.transform.localPosition.destinationY;
    }

    set destinationY (val: number | null) {
        if (val === null) {
            this.entity.transform.localPosition.destinationY = null;
            return;
        }
        this.entity.transform.localPosition.destinationY = val - (this.entity.parent?.transform.position.y ?? 0);
    }
}
