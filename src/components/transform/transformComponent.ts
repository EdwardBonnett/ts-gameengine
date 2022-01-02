import { TileSize } from "../../consts";
import { Direction } from "../../models/direction";
import { Component } from "../component"
import { LocalPosition } from "./localPosition";
import { LocalScale } from "./localSCale";
import { Position } from "./position";
import { Scale } from "./scale";

export class TransformComponent extends Component {

    readonly position: Position = new Position().init(this.entity);
    readonly localPosition: LocalPosition = new LocalPosition().init(this.entity);
    readonly scale: Scale = new Scale().init(this.entity);
    readonly localScale: LocalScale = new LocalScale().init(this.entity);

    height: number = TileSize;
    width: number = TileSize;
    direction: Direction = Direction.Down;
}