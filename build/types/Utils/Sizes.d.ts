/**
 * 屏幕尺寸
*/
import { EventEmitter } from 'pietile-eventemitter';
import { IEvents } from '../interfaces/IEvents';
import Demo from '../demo/index';
export default class Sizes {
    width: number;
    height: number;
    viewport: {
        width: number;
        height: number;
    };
    $sizeViewport: HTMLElement;
    emitter: EventEmitter<IEvents>;
    /**
     * Constructor
     */
    constructor(user: Demo);
    /**
     * Resize
     */
    resize(): void;
}
