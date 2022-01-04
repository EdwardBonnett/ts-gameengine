import { singleton } from "tsyringe";
import * as PIXI from 'pixi.js';
import { TileSize } from "../consts";
import { ServiceAccessor } from "./serviceAccessor";
@singleton()
export class DebugService extends ServiceAccessor {

    debugText!: PIXI.Text;

    fpsCounter!: PIXI.Text;

    debugGraphics: Record<string, PIXI.Graphics> = {};

    init () {
        this.fpsCounter = new PIXI.Text('FPS:', { fontFamily : 'Arial', fontSize: 12, fill : 0xff1010, align : 'left' });
        this.fpsCounter.zIndex = 999;
        this.debugText = new PIXI.Text('', { fontFamily : 'Arial', fontSize: 12, fill : 0xffffff, align : 'right' });
        this.debugText.x = this.services.Game.ScreenWidth * TileSize;
        this.debugText.anchor.x = 1;
        this.debugText.zIndex = 999;
        this.services.Game.App.stage.addChild(this.fpsCounter);
        this.services.Game.App.stage.addChild(this.debugText);
    }

    setDebugText (text: string) {
        this.debugText.text = text;
    }

    drawLine (id: string, line?: { xFrom: number; yFrom: number; xTo: number; yTo: number }) {
        if (!line) return;
        id = `line${id}`;
        if (!this.debugGraphics[id]) {
            this.debugGraphics[id] = new PIXI.Graphics();
            this.debugGraphics[id].zIndex = 999;
            this.services.Game.App.stage.addChild(this.debugGraphics[id]);
        }  
        this.debugGraphics[id].clear();
        
        this.debugGraphics[id].lineStyle(1, 0xffffff)
               .moveTo(line.xFrom, line.yFrom)
               .lineTo(line.xTo, line.yTo);
    }

    removeLine (id: string) {
        id = `line${id}`;
        if (!this.debugGraphics[id]) return;
        this.debugGraphics[id].destroy();
        delete this.debugGraphics[id];
    }

    drawRectangle (id: string, rect?: PIXI.Rectangle) {
        if (!rect) return;
        id = `rectangle${id}`;
        if (!this.debugGraphics[id]) {
            this.debugGraphics[id] = new PIXI.Graphics();
            this.debugGraphics[id].zIndex = 999;
            this.services.Game.App.stage.addChild(this.debugGraphics[id]);
        }
        this.debugGraphics[id].clear();
        this.debugGraphics[id].lineStyle(1, 0xFF0000);
        this.debugGraphics[id].drawRect(rect.x, rect.y, rect.width, rect.height)
    }

    removeRectangle (id: string) {
        id = `rectangle${id}`;
        if (!this.debugGraphics[id]) return;
        this.debugGraphics[id].destroy();
        delete this.debugGraphics[id];
    }
    

    update () {
        this.fpsCounter.text = Math.round(this.services.Game.App.ticker.FPS).toString();
    }
}