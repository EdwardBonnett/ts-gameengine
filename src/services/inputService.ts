import { singleton } from 'tsyringe';
import { IInputService } from './interfaces/IInputService';
import { Service } from './service';

@singleton()
export class InputService extends Service implements IInputService {
    keysDown: Array<string> = [];

    lastKeysDown: Array<string> = [];

    keyMap: Record<string, string> = {
        ArrowLeft: 'Left',
        ArrowRight: 'Right',
        ArrowDown: 'Down',
        ArrowUp: 'Up',
        KeyA: 'Left',
        KeyD: 'Right',
        KeyS: 'Down',
        KeyW: 'Up',
        KeyE: 'Action',
    }

    constructor () {
        super();
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('keyup', this.keyUp, false);
    }

    private keyDown (event: KeyboardEvent): void {
        const key = this.keyMap[event.code] || event.code;
        const existingIndex = this.keysDown.indexOf(key);
        if (existingIndex > -1) this.keysDown.splice(existingIndex, 1);
        this.keysDown.push(key || event.code);
    }

    private keyUp (event: KeyboardEvent): void {
        const key = this.keyMap[event.code] || event.code;
        const existingIndex = this.keysDown.indexOf(key);
        if (existingIndex > -1) this.keysDown.splice(existingIndex, 1);
    }

    isKeyPressed (key: string) {
        return this.lastKeysDown.indexOf(key) === -1 && this.keysDown.indexOf(key) > -1;
    }

    isKeyDown (key: string) {
        return this.keysDown.indexOf(key) > -1;
    }

    isLastKeyDown (key: string) {
        if (!this.keysDown.length) return false;
        return this.keysDown[this.lastKeysDown.length - 1] === key;
    }

    getLastKeyDown () {
        if (!this.keysDown.length) return null;
        return this.keysDown[this.lastKeysDown.length - 1];
    }

    isKeyUp (key: string) {
        return !this.isKeyDown(key);
    }

    isKeyReleased (key: string) {
        return this.keysDown.indexOf(key) === -1 && this.lastKeysDown.indexOf(key) > -1;
    }

    update () {
        this.lastKeysDown = [...this.keysDown];
    }
}
