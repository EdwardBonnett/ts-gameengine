import Component from "./component";

export default class PinComponent extends Component {
    name = "pin";

    entityId!: string;
    offsetX!: number;
    offsetY!: number;

    init ({ entityId, offsetX, offsetY }: { entityId: string, offsetX: number, offsetY: number }) {
        super.init();
        this.entityId = entityId;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    update () {

    }
}