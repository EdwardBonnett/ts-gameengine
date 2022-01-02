import { Component } from "./component";

export class PinComponent extends Component {
    entityId!: string;
    offsetX!: number;
    offsetY!: number;

    async init ({ entityId, offsetX, offsetY }: { entityId: string, offsetX: number, offsetY: number }) {
        super.init();
        this.entityId = entityId;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    update () {

    }
}