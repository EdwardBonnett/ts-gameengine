import { AnimationComponent } from "../components/animationComponent";
import { CollisionComponent } from "../components/collisionComponent";
import { MoveComponent } from "../components/moveComponent";
import { PlayerInputComponent } from "../components/playerInputComponent";
import { RenderComponent } from "../components/renderComponent";
import { Entity, EntityParams } from "./entity";

export class Player extends Entity {

    async init (params: EntityParams) {
        await super.init({
            name: 'Dude3',
           
            global: true,
            z: 99,
            width: 16,
            height: 24,
            debug: {
                collisionRect: true,
            },
            components: [
                { component: RenderComponent, props: {
                    resourcePath: '/Dude3.json',
                    currentAnimation: 'Front-Walk',
                    looping: true,
                    animated: true,
                }},
                { 
                    component: CollisionComponent,
                    props: {
                        collisionRect: {
                            x: 4,
                            y: 14,
                            height: 5,
                            width: 19
                        }
                    }
                },
                { component: MoveComponent },
                { component: PlayerInputComponent },
                { 
                    component: AnimationComponent, 
                    props: {
                        "Up": "Back-Walk",
                        "Left": "Side-Walk",
                        "Right": "Side-Walk",
                        "Down": "Front-Walk" 
                    }
                },
            ],
            ...params,
        });
    }
}