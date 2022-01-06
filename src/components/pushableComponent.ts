import { Component } from './component';

export class PushableComponent extends Component {
    update () {
        // const lastKey = this.entity.inputService.getLastKeyDown();
        // if (lastKey === 'Action') {
        //     this.entity.mapService.currentMap?.entities?.forEach((entity) => {
        //         if (entity.components.playerInput && this.entity.isCollidingWith(entity)) {
        //            this.entity.x += 64;
        //         }
        //     });

        // }
    }
}

// CHECK HOW UNITY DOES RAYCAST THINGS, WHERE DOES IT LIVE
// IN ENTITY OR SEPARATE COMPONENT
