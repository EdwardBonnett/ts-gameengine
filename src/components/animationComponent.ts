import Entity from "../entities/entity";
import Direction from "../models/direction";
import Component from "./component";

export default class AnimationComponent extends Component {

    name = "animation";

    animationMap?: Record<string, string> = {};

    constructor (entity: Entity) {
        super(entity);
    }

    init (animationMap?: Record<string, string>) {
        super.init();
        this.animationMap = animationMap;
    }

    update () {
        if (!this.entity.sprite) return;
        if (this.entity.currentDirection === Direction.Left) {
            this.entity.sprite.scale.x = -1;
        } else {
            this.entity.sprite.scale.x = 1;
        }

        if (!this.animationMap) return;
        const animation = this.animationMap[this.entity.currentDirection];
        if (animation && this.entity.currentAnimation !== animation) {
            this.entity.playAnimation(animation);
        }
    }
}