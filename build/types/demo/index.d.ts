import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene, WebGLRenderer, PerspectiveCamera, Mesh } from 'three';
import { IElement } from '../interfaces/IElement';
export default class Demo {
    scene: Scene;
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
    controls: OrbitControls;
    mesh: Mesh;
    dom: HTMLElement;
    /**
     * 构造函数
     * @param option 参数
     */
    constructor(option: IElement);
    /**
     * 初始化场景
     */
    initialize(): void;
    /**
     * 创建box
     */
    createBox(): void;
    /**
     * 动画
     */
    animate(): void;
    /**
   * 添加控制器
   */
    createControls(): void;
    /**
     * 监听屏幕宽度变化
     */
    onWindowResize(): void;
}
