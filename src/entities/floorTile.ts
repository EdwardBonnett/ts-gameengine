import { RenderComponent } from '../components/renderComponent';
import { Entity } from './entity';
import { IEntityParams } from './interfaces/IEntityParams';

export class FloorTile extends Entity {
    async init (params: IEntityParams) {
        await super.init({
            name: 'FloorTile',
            components: [
                {
                    component: RenderComponent,
                    props: {
                        resourceName: 'FloorTile',
                        resourcePath: '/FloorTile.json',
                        currentAnimation: 'FloorTile',
                        looping: false,
                    },
                },
            ],
            ...params,
        });
    }
}
