import {  delay, inject, singleton } from "tsyringe";
import * as PIXI from 'pixi.js';
import { GameService } from "./gameService";
import { TileSize } from "../consts";

@singleton()
export class DebugService {

    debugText: PIXI.Text;

    fpsCounter: PIXI.Text;

    debugGraphics: Record<string, PIXI.Graphics> = {};
    
    constructor (
        @inject(delay(() => GameService)) private gameService: GameService,
    ) {
        this.fpsCounter = new PIXI.Text('FPS:', { fontFamily : 'Arial', fontSize: 12, fill : 0xff1010, align : 'left' });
        this.fpsCounter.zIndex = 999;
        this.debugText = new PIXI.Text('', { fontFamily : 'Arial', fontSize: 12, fill : 0xffffff, align : 'right' });
        this.debugText.x = gameService.ScreenWidth * TileSize;
        this.debugText.anchor.x = 1;
        this.debugText.zIndex = 999;
        this.gameService.App.stage.addChild(this.fpsCounter);
        this.gameService.App.stage.addChild(this.debugText);
    }

    setDebugText (text: string) {
        this.debugText.text = text;
    }

    drawDebugRectangle (id: string, rect?: PIXI.Rectangle) {
        if (!rect) return;
        if (!this.debugGraphics[id]) {
            this.debugGraphics[id] = new PIXI.Graphics();
            this.debugGraphics[id].zIndex = 999;
            this.gameService.App.stage.addChild(this.debugGraphics[id]);
        }
        this.debugGraphics[id].clear();
        this.debugGraphics[id].lineStyle(1, 0xFF0000);
        this.debugGraphics[id].drawRect(rect.x, rect.y, rect.width, rect.height)
    }

    removeDebugRectangle (id: string) {
        if (!this.debugGraphics[id]) return;
        this.debugGraphics[id].destroy();
        delete this.debugGraphics[id];
    }
    

    update () {
        this.fpsCounter.text = Math.round(this.gameService.App.ticker.FPS).toString();
    }
}