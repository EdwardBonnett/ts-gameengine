import { Component } from './component';

export class CameraComponent extends Component {
    offsetX!: number;

    offsetY!: number;

    async init ({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
        super.init();
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    update () {
        this.services.Render.camera.position.set(this.services.Render.screenWidth * 0.5, this.services.Render.screenHeight * 0.5);
        this.services.Render.camera.pivot.set(this.entity.transform.position.x, this.entity.transform.position.y);
    }
}
