import { singleton } from 'tsyringe';
import { TileSize } from '../consts';
import { Entity } from '../entities/entity';
import { WorldMap } from '../models/worldMap';
import { IMapService } from './interfaces/IMapService';
import { Service } from './service';

@singleton()
export class MapService extends Service implements IMapService {
    currentMap?: WorldMap;

    async changeMap (map: typeof WorldMap) {
        this.unloadMap();
        await this.loadMap(map);
    }

    async loadMap (Map: typeof WorldMap) {
        this.currentMap = new Map();

        if (this.currentMap.backgroundEntity) {
            this.currentMap.entities.push(await this.services.Entity.createEntity(this.currentMap.backgroundEntity, {
                x: this.currentMap.width * TileSize * 0.5 - TileSize * 0.5,
                y: this.currentMap.height * TileSize * 0.5 - TileSize * 0.5,
                componentProps: {
                    RenderComponent: {
                        spriteType: 'tiled',
                        tiledWidth: this.currentMap.width * TileSize,
                        tiledHeight: this.currentMap.height * TileSize,
                    },
                },
            }));
        }

        for (let i = 0; i < this.currentMap.entitiesToLoad.length; i += 1) {
            const entity = this.currentMap.entitiesToLoad[i];
            this.currentMap.entities.push(await this.services.Entity.createEntity(entity.entity, {
                ...(entity.config || {}),
                x: (entity.config?.x ?? 0) * TileSize,
                y: (entity.config?.y ?? 0) * TileSize,
            }));
        }
    }

    unloadMap () {
        if (!this.currentMap) return;
        for (let i = this.currentMap.entities.length - 1; i > 0; i -= 1) {
            const entity = this.currentMap.entities[i];
            if (!entity.global) entity.destroy();
        }

        this.currentMap.entities = [];
    }

    update (dt: number) {
        if (!this.currentMap) return;
        this.currentMap.entities.forEach((entity) => {
            entity?.update(dt);
        });
    }

    async removeEntityFromMap (entity: Entity) {
        const index = this.currentMap?.entities.indexOf(entity) ?? -1;
        if (index > -1) {
            this.currentMap?.entities.splice(index, 1);
        }
    }

    async addEntityToMap (entity: Entity) {
        this.currentMap?.entities.push(entity);
    }

    positionToTilePos (pos: number) {
        return Math.round(pos / TileSize);
    }

    getTile (x: number, y: number, ignoreEntity?: Entity) {
        const tileX = this.positionToTilePos(x);
        const tileY = this.positionToTilePos(y);
        return this.currentMap?.entities.filter(a => this.positionToTilePos(a.transform.position.x) === tileX && this.positionToTilePos(a.transform.position.y) === tileY && a !== ignoreEntity);
    }
}
