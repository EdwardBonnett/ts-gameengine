import Entity from "../entities/entity";
import Direction from "../models/direction";
import Component from "./component";

export default class AnimationComponent extends Component {

    name = "animation";

    animationMap?: Record<string, string> = {};

    initialScale = 1;

    constructor (entity: Entity) {
        super(entity);
    }

    init (animationMap?: Record<string, string>) {
        super.init();
        this.initialScale = this.entity.scaleX;
        this.animationMap = animationMap;
    }

    update () {
        if (!this.entity.sprite) return;
        if (this.entity.currentDirection === Direction.Left) {
            this.entity.scaleX = -this.initialScale;
        } else {
            this.entity.scaleX = this.initialScale;
        }

        if (!this.animationMap) return;
        const animation = this.animationMap[this.entity.currentDirection];
        if (animation && this.entity.currentAnimation !== animation) {
            this.entity.playAnimation(animation);
        }
    }
}