import * as PIXI from 'pixi.js';
import Component from "./component";

export class RenderComponent extends Component {

    resourceName!: string;

    resourcePath!: string;

    currentAnimation!: string;

    looping = false;

    animated = false;

    visible = true;

    scaleX = 1;

    scaleY = 1;

    scaleZ = 1;

    sprite?: PIXI.AnimatedSprite;
}