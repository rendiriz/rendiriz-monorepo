import * as THREE from 'three';
import Figure from './figure';

const perspective = 600;

export default class Scene {
  constructor() {
    this.container = document.getElementById('about-image-stage');
    this.scene = new THREE.Scene();
    this.figure = new Figure(this.scene, () => this.update());

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
    });

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.initLights();
    this.initCamera();
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight('#fff', 2);
    this.scene.add(ambientLight);
  }

  initCamera() {
    const fov =
      (180 * (2 * Math.atan(this.container.clientHeight / 2 / perspective))) /
      Math.PI;

    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.container.clientWidth / this.container.clientHeight,
      1,
      900,
    );
    this.camera.position.set(0, 0, perspective);
  }

  update() {
    if (this.renderer === undefined) return;
    requestAnimationFrame(this.update.bind(this));

    this.figure.update();

    this.renderer.render(this.scene, this.camera);
  }
}
