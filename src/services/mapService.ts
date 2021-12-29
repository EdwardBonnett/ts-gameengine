import { delay, inject, singleton } from "tsyringe";
import { TileSize } from "../consts";
import Entity from "../entities/entity";
import WorldMap from "../models/worldMap";
import EntityService from "./entityService";

@singleton()
export default class MapService {

    constructor (@inject(delay(() => EntityService)) private entityService: EntityService) {
    }

    currentMap?: WorldMap;

    async changeMap (map: typeof WorldMap) {
        this.unloadMap();
        await this.loadMap(map);
    }

    async loadMap (map: typeof WorldMap) {
        this.currentMap = new map();

        if (this.currentMap.backgroundEntity) {
            for (let x = 0; x < 30;  x += 1) {
                for (let y = 0; y < 30;  y += 1) {
                    this.currentMap.entities.push(await this.entityService.createEntity(this.currentMap.backgroundEntity, {
                        x: x * TileSize,
                        y: y * TileSize,
                    }));
                }
            }
        }

        for (let i = 0; i < this.currentMap.entitiesToLoad.length; i += 1) {
            const entity = this.currentMap.entitiesToLoad[i];
            this.currentMap.entities.push(await this.entityService.createEntity(entity.entity, {
                ...(entity.config || {}),
                x: (entity.config?.x ?? 0) * TileSize,
                y: (entity.config?.y ?? 0)* TileSize,
            }));
        }
    }

    unloadMap () {
        if (!this.currentMap) return;
        this.currentMap.entities.forEach((entity) => {
            if (!entity.global) entity.destroy();
        });
        this.currentMap.entities = [];
    }

    update () {
        this.currentMap!.entities.forEach((entity) => {
            entity.update();
        });
    }

    positionToTilePos (pos: number) {
        return Math.round(pos / TileSize);
    }

    getTile (x: number, y: number, ignoreEntity?: Entity) {
        const tileX = this.positionToTilePos(x);
        const tileY = this.positionToTilePos(y);
        return this.currentMap?.entities.filter(a => this.positionToTilePos(a.x) === tileX && this.positionToTilePos(a.y) === tileY && a !== ignoreEntity);
    }

}