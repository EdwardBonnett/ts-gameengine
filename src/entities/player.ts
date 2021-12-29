import AnimationComponent from "../components/animationComponent";
import MoveComponent from "../components/moveComponent";
import PlayerInputComponent from "../components/playerInputComponent";
import Entity, { EntityParams } from "./entity";

export default class Player extends Entity {

    init (params: EntityParams) {
        super.init({
            name: 'Dude3',
            resourcePath: '/Dude3.json',
            currentAnimation: 'Front-Walk',
            looping: true,
            global: true,
            animated: true,
            z: 99,
            collisionRect: {
                x: 4,
                y: 14,
                height: 5,
                width: 9
            },
            debug: {
                collisionRect: true,
            },
            components: [
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