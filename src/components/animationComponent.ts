import { Direction } from "../models/direction";
import { Component } from "./component";
import { RenderComponent } from "./renderComponent";

export class AnimationComponent extends Component {
    animationMap?: Record<string, string> = {};

    initialScale = 1;

    async init (animationMap?: Record<string, string>) {
        super.init();
        this.initialScale = this.entity.transform.scale.x;
        this.animationMap = animationMap;
    }

    update () {
        const renderComponent = this.entity.getComponent(RenderComponent);
        if (!renderComponent) return;
        if (this.entity.transform.direction === Direction.Left) {
            this.entity.transform.localScale.x = -this.initialScale;
        } else {
            this.entity.transform.localScale.x = this.initialScale;
        }

        if (!this.animationMap) return;
        const animation = this.animationMap[this.entity.transform.direction];
        if (animation && renderComponent.currentAnimation !== animation) {
            renderComponent.playAnimation(animation);
        }
    }
}