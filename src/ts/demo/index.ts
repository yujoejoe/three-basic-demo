import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 引入鼠标控制
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  Mesh,
  MeshLambertMaterial,
  TorusGeometry,
  Vector2,
  PlaneGeometry,
  SpotLight,
  BoxGeometry,
  MeshNormalMaterial
} from 'three';

import { IElement } from '../interfaces/IElement'

export default class Demo {
  public scene: Scene; // 场景
  public renderer: WebGLRenderer; // 渲染器
  public camera: PerspectiveCamera; // 相机
  public controls: OrbitControls; // 相机控制器
  public mesh: Mesh; // 网格
  public dom: HTMLElement

  /**
   * 构造函数
   * @param option 参数
   */
  constructor(option: IElement) {
    this.dom = option.dom // 挂载节点
    this.initialize()
    this.createBox()
    this.animate();
    this.createControls();
  }

  /**
   * 初始化场景
   */
  public initialize() {
    // 创建场景
    this.scene = new Scene();
    // 透视相机
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 8;
    this.camera.lookAt(this.scene.position); // 设置相机对象看向的位置
    // 渲染器
    this.renderer = new WebGLRenderer({ antialias: true }); // 渲染器
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.dom.appendChild(this.renderer.domElement);
  }
  /**
   * 创建box
   */
  public createBox() {
    // 圆环几何体
    const torusgeo = new TorusGeometry(2, 0.2); // 圆环几何体
    const torusmasterial = new MeshLambertMaterial({ color: 0xFF2288 }); // 材质
    const torus = new Mesh(torusgeo, torusmasterial); // 网格
    torus.castShadow = true;
    torus.position.x = 0;
    torus.position.y = 0;
    torus.position.z = 2;
    this.scene.add(torus);
    // 平面几何体
    const planeGeometry = new PlaneGeometry(8, 8); // 平面几何体
    const planeMeterial = new MeshLambertMaterial({ color: 0xCCCCCC }); // 暗淡不光亮表面的材质
    const plane = new Mesh(planeGeometry, planeMeterial); // 网格
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, -2, 0);
    plane.receiveShadow = true;
    this.scene.add(plane);
    // 光源
    const spotLight = new SpotLight(0xFFFFFF); // 聚光灯
    spotLight.position.set(60, 40, 65);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new Vector2(1024, 1024); // 二维向量
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    this.scene.add(spotLight);
    // 环境光
    const ambienLight = new AmbientLight(0xAAAAAA); // 环境光源
    this.scene.add(ambienLight);
    // 立方几何体
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshNormalMaterial(); // 暗淡不光亮表面的材质
    this.mesh = new Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
    // 监听屏幕宽度变化
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }
  /**
   * 动画
   */
  animate() {
    // 无限循环动画
    requestAnimationFrame(this.animate.bind(this));
    // 旋转
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.01;
    // 渲染
    this.renderer.render(this.scene, this.camera);
  }
  /**
 * 添加控制器
 */
  createControls() {
    // 鼠标控制      相机，渲染dom
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = true;
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
    this.controls.dampingFactor = 0.05;
    // 是否可以缩放
    this.controls.enableZoom = true;
    // 设置相机距离原点的最近距离
    //   this.controls.minDistance = 5;
    // 设置相机距离原点的最远距离
    //   this.controls.maxDistance = 10;
    // 是否开启右键拖拽
    this.controls.enablePan = false;
  }
  /**
   * 监听屏幕宽度变化
   */
  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
