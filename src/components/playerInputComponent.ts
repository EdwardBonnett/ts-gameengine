import { Direction } from "../models/direction";
import { Component } from "./component";
import { MoveComponent } from "./moveComponent";

export class PlayerInputComponent extends Component {
    requiredComponents = ['move'];
    
    update (dt: number) {
        const lastKey = this.services.Input.getLastKeyDown();
        let direction: string | null = null;
        switch (lastKey) {
            case "Up": direction = Direction.Up; break;
            case "Left": direction = Direction.Left; break;
            case "Down": direction = Direction.Down; break;
            case "Right": direction = Direction.Right; break;
        }
        if (!direction) return;
        this.entity.getComponent(MoveComponent)?.move(dt, direction as Direction);
    }
}