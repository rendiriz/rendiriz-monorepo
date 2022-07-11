import * as THREE from 'three';
import { TweenMax } from 'gsap';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class Figure {
  constructor(scene, callback) {
    this.container = document.getElementById('about-image-stage');
    this.$image = document.querySelector('.about-tile-image');
    this.$image.style.opacity = 0;
    this.scene = scene;
    this.callback = callback;

    this.loader = new THREE.TextureLoader();
    this.image = this.loader.load(this.$image.src, () => this.start());
    this.hoverImage = this.loader.load(this.$image.dataset.hover);

    this.sizes = new THREE.Vector2(0, 0);
    this.offset = new THREE.Vector2(0, 0);

    this.mouse = new THREE.Vector2(0, 0);
    this.container.addEventListener('mousemove', (event) =>
      this.onMouseMove(event),
    );
  }

  start() {
    this.getSizes();
    this.createMesh();
    this.callback();
  }

  getSizes() {
    const { width, height } = this.$image.getBoundingClientRect();
    this.sizes.set(width, height);
    this.offset.set(
      0 - this.container.clientWidth / 2 + width / 2,
      -0 + this.container.clientHeight / 2 - height / 2,
    );
  }

  createMesh() {
    this.uniforms = {
      u_image: { type: 't', value: this.image },
      u_imagehover: { type: 't', value: this.hoverImage },
      u_mouse: { value: this.mouse },
      u_time: { value: 0 },
      u_res: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      defines: {
        PR: window.devicePixelRatio.toFixed(1),
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }

  onMouseMove(event) {
    TweenMax.to(this.mouse, 0.5, {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });

    TweenMax.to(this.mesh.rotation, 0.5, {
      x: -this.mouse.y * 0.3,
      y: this.mouse.x * (Math.PI / 6),
    });
  }

  update() {
    this.uniforms.u_time.value += 0.01;
  }
}
