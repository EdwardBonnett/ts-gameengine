import { singleton } from 'tsyringe';
import * as PIXI from 'pixi.js';
import { Service } from './service';
import { IDebugService } from './interfaces/IDebugService';

@singleton()
export class DebugService extends Service implements IDebugService {
    debugText!: PIXI.Text;

    fpsCounter!: PIXI.Text;

    debugGraphics: Record<string, PIXI.Graphics> = {};

    readonly layerName = 'Debug';

    readonly guiLayerName = 'DebugGui';

    init () {
        this.fpsCounter = new PIXI.Text('FPS:', {
            fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'left',
        });
        this.debugText = new PIXI.Text('', {
            fontFamily: 'Arial', fontSize: 12, fill: 0xffffff, align: 'right',
        });
        this.debugText.x = this.services.Render.screenWidth;
        this.debugText.anchor.x = 1;
        this.services.Render.createLayer(this.layerName, 999, false);
        this.services.Render.createLayer(this.guiLayerName, 999, true);
        this.services.Render.getLayer(this.layerName).visible = true;
        this.services.Render.addToStage(this.fpsCounter, this.guiLayerName);
        this.services.Render.addToStage(this.debugText, this.guiLayerName);
    }

    setDebugText (text: string) {
        this.debugText.text = text;
    }

    drawLine (id: string, line: { xFrom: number; yFrom: number; xTo: number; yTo: number }, gui = false) {
        if (!line) return;
        id = `line${id}`;
        if (!this.debugGraphics[id]) {
            this.debugGraphics[id] = new PIXI.Graphics();
            this.debugGraphics[id].zIndex = 999;
            this.services.Render.addToStage(this.debugGraphics[id], gui ? this.guiLayerName : this.layerName);
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

    drawRectangle (id: string, rect: PIXI.Rectangle, gui = false) {
        if (!rect) return;
        id = `rectangle${id}`;
        if (!this.debugGraphics[id]) {
            this.debugGraphics[id] = new PIXI.Graphics();
            this.debugGraphics[id].zIndex = 999;
            this.services.Render.addToStage(this.debugGraphics[id], gui ? this.guiLayerName : this.layerName);
        }
        this.debugGraphics[id].clear();
        this.debugGraphics[id].lineStyle(1, 0xFF0000);
        this.debugGraphics[id].drawRect(rect.x, rect.y, rect.width, rect.height);
    }

    removeRectangle (id: string) {
        id = `rectangle${id}`;
        if (!this.debugGraphics[id]) return;
        this.debugGraphics[id].destroy();
        delete this.debugGraphics[id];
    }

    update () {
        this.fpsCounter.text = Math.round(this.services.Render.fps).toString();
        const layer = this.services.Render.getLayer(this.layerName);
        if (!layer) return;
        if (this.services.Input.isKeyPressed('KeyY')) {
            layer.visible = !layer.visible;
        }
        layer.x = this.services.Game._app.stage.x;
        layer.y = this.services.Game._app.stage.y;
    }
}
