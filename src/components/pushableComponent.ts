import Component from "./component";

export default class PushableComponent extends Component {
    name = "pushable";

    update () {
        const lastKey = this.entity.inputService.getLastKeyDown();
        if (lastKey === 'Action') {
            this.entity.mapService.currentMap?.entities?.forEach((entity) => {
                if (entity.components.playerInput && this.entity.isCollidingWith(entity)) {
                   this.entity.x += 64;
                }
            });
            
        }
    }
}