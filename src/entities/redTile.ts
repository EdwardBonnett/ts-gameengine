import { RenderComponent } from "../components/renderComponent";
import { Entity, EntityParams } from "./entity";

export class RedTile extends Entity {
    async init (params: EntityParams) {
        await super.init({
            name: 'RedTile',
            components: [
                {
                    component: RenderComponent, 
                    props: {
                        resourceName: 'FloorTile',
                        resourcePath: '/FloorTile.json',
                        currentAnimation: 'RedTile',
                        looping: false
                    }
                },
                ...(params.components ?? [])
            ],
            ...params,
        });
    }

    update(): void {
         if (this.inputService.isKeyPressed('KeyB')) {
             this.transform.scale.x += 1;
         }
         super.update();
    }
}