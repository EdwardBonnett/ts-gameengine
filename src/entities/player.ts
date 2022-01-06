import { AnimationComponent } from '../components/animationComponent';
import { CameraComponent } from '../components/cameraComponent';
import { CollisionComponent } from '../components/collisionComponent';
import { MoveComponent } from '../components/moveComponent';
import { PlayerInputComponent } from '../components/playerInputComponent';
import { RenderComponent } from '../components/renderComponent';
import { Entity } from './entity';
import { IEntityParams } from './interfaces/IEntityParams';

export class Player extends Entity {
    async init (params: IEntityParams) {
        await super.init({
            name: 'Dude3',
            global: true,
            z: 99,
            width: 16,
            height: 24,
            debug: {
                collisionRect: true,
                drawRaycasts: true,
            },
            components: [
                {
                    component: RenderComponent,
                    props: {
                        resourcePath: '/Dude3.json',
                        currentAnimation: 'Front-Walk',
                        looping: true,
                        spriteType: 'animated',
                    },
                },
                {
                    component: CollisionComponent,
                    props: {
                        collisionRect: {
                            x: 4,
                            y: 14,
                            height: 5,
                            width: 9,
                        },
                    },
                },
                { component: MoveComponent },
                { component: PlayerInputComponent },
                {
                    component: AnimationComponent,
                    props: {
                        Up: 'Back-Walk',
                        Left: 'Side-Walk',
                        Right: 'Side-Walk',
                        Down: 'Front-Walk',
                    },
                },
                {
                    component: CameraComponent,
                },
            ],
            ...params,
        });
    }

    update (dt: number) {
        const inFront = this.services.Physics.raycast(this, 32, 10, this.transform.direction, (entity) => entity?.name === 'RedTile' && entity.parent !== this);
        if (inFront && this.services.Input.isLastKeyDown('KeyV')) {
            inFront.destroy();
            this.services.UI.showMessage('yOU KILLED IT');
        }
        super.update(dt);
    }
}
