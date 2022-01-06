import { RenderComponent } from '../components/renderComponent';
import { Entity } from './entity';
import { IEntityParams } from './interfaces/IEntityParams';

export class TiledAnimation extends Entity {
    async init (params: IEntityParams) {
        await super.init({
            name: 'TiledAnimation',
            components: [
                {
                    component: RenderComponent,
                    props: {
                        resourcePath: '/Dude3.json',
                        resourceName: 'Dude3',
                        currentAnimation: 'Front-Walk',
                        looping: true,
                        spriteType: 'animatedTiled',
                        tiledHeight: 48,
                        tiledWidth: 64,
                    },
                },
            ],
            ...params,
        });
    }
}
