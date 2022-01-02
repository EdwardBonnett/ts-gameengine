import { RenderComponent } from "../components/renderComponent";
import { Entity, EntityParams } from "./entity";

export class FloorTile extends Entity {
    async init (params: EntityParams) {
        await super.init({
            name: 'FloorTile',
            components: [
                {
                    component: RenderComponent, 
                    props: {
                        resourceName: 'FloorTile',
                        resourcePath: '/FloorTile.json',
                        currentAnimation: 'FloorTile',
                        looping: false
                    }
                }
            ],
            ...params,
        });
    }

}