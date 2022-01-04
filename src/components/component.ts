import { Entity } from "../entities/entity";
import { ServiceAccessor } from "../services/serviceAccessor";

export class Component extends ServiceAccessor {

    get name () { return this.constructor.name };

    entity: Entity;

    requiredComponents: Array<string> = [];

    constructor (entity: Entity) {
        super();
        this.entity = entity;
    }
    

    async init (_props?: any) {
        // this.requiredComponents.forEach((component) => {
        //     if (!this.entity.components[component]) {
        //         console.error(`ERROR: ${this.name} requires component ${component} to be present on entity ${this.entity.name}`)
        //     }
        // })

    }

    update (dt?: number) {

    }

    destroy () {

    }

}