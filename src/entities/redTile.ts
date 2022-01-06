import { RenderComponent } from '../components/renderComponent';
import { Entity } from './entity';
import { IEntityParams } from './interfaces/IEntityParams';

export class RedTile extends Entity {
    async init (params: IEntityParams) {
        await super.init({
            name: 'RedTile',
            components: [
                {
                    component: RenderComponent,
                    props: {
                        resourceName: 'FloorTile',
                        resourcePath: '/FloorTile.json',
                        currentAnimation: 'RedTile',
                        looping: false,
                    },
                },
            ],
            ...params,
        });
    }

    update (dt: number): void {
        if (this.services.Input.isKeyPressed('KeyB')) {
            this.transform.scale.x += 1;
        }
        super.update(dt);
    }
}
