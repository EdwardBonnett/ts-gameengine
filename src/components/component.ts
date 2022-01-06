import { IEntity } from '../entities/interfaces/IEntity';
import { ServiceAccessor } from '../services/serviceAccessor';

export class Component {
    get name () { return this.constructor.name; }

    entity: IEntity;

    requiredComponents: Array<string> = [];

    serviceAccessor?: ServiceAccessor;

    get services () {
        if (!this.serviceAccessor) this.serviceAccessor = new ServiceAccessor();
        return this.serviceAccessor.services;
    }

    constructor (entity: IEntity) {
        this.entity = entity;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async init (_props?: unknown) {
        // this.requiredComponents.forEach((component) => {
        //     if (!this.entity.components[component]) {
        //         console.error(`ERROR: ${this.name} requires component ${component} to be present on entity ${this.entity.name}`)
        //     }
        // })

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update (_dt?: number) {
        // To override
    }

    destroy () {
        // To override
    }
}
