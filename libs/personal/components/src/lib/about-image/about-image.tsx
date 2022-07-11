import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import fragment from './fragment.glsl';
// import vertex from './vertex.glsl';
import styles from './about-image.module.scss';

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export class Sketch {
  scene: any;
  container: any;
  img: any;
  width: any;
  height: any;
  renderer: any;
  camera: any;
  time: any;
  mouse: any;
  isPlaying: any;
  settings: any;
  gui: any;
  imageAspect: any;
  material: any;
  size: any;
  texture: any;
  geometry: any;
  plane: any;

  constructor(options: any) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.img = this.container.querySelector('img');
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      // window.innerWidth / window.innerHeight,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100,
    );

    const frustumSize = 1;
    // const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      frustumSize / -2,
      frustumSize / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000,
    );
    this.camera.position.set(0, 0, 2);

    this.time = 0;

    this.mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0,
    };

    this.isPlaying = true;
    this.settingsan();
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();

    this.mouseEvents();
  }

  getValue(val: string) {
    return parseFloat(this.container.getAttribute('data-' + val));
  }

  mouseEvents() {
    this.container.addEventListener('mousemove', (e: MouseEvent) => {
      // window.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouse.x = e.clientX / this.width;
      this.mouse.y = e.clientY / this.height;

      console.log(e.clientX, e.clientY);

      this.mouse.vX = this.mouse.x - this.mouse.prevX;
      this.mouse.vY = this.mouse.y - this.mouse.prevY;

      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
    });
  }

  settingsan() {
    this.settings = {
      grid: this.getValue('grid') || 34,
      mouse: this.getValue('mouse') || 0.25,
      strength: this.getValue('strength') || 1,
      relaxation: this.getValue('relaxation') || 0.9,
    };
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    // image cover
    this.imageAspect = 1 / 1.5;
    let a1;
    let a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    this.camera.updateProjectionMatrix();
    this.regenerateGrid();
  }

  regenerateGrid() {
    this.size = this.settings.grid;

    const width = this.size;
    const height = this.size;

    const size = width * height;
    const data = new Float32Array(4 * size);

    for (let i = 0; i < size; i++) {
      const r0 = Math.random() * 255 - 125;
      const r1 = Math.random() * 255 - 125;
      const r2 = Math.random() * 255 - 125;

      const stride = i * 4;

      data[stride] = r0;
      data[stride + 1] = r1;
      data[stride + 2] = r2;
      data[stride + 3] = r0;
    }

    this.texture = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat,
      THREE.FloatType,
    );

    this.texture.magFilter = this.texture.minFilter = THREE.NearestFilter;

    if (this.material) {
      this.material.uniforms.uDataTexture.value = this.texture;
      this.material.uniforms.uDataTexture.value.needsUpdate = true;
    }
  }

  addObjects() {
    this.regenerateGrid();
    const texture = new THREE.Texture(this.img);
    texture.needsUpdate = true;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: {
          value: 0,
        },
        resolution: {
          value: new THREE.Vector4(),
        },
        uTexture: {
          value: texture,
        },
        uDataTexture: {
          value: this.texture,
        },
      },
      // vertexShader: vertex,
      // fragmentShader: fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  updateDataTexture() {
    const data = this.texture.image.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= this.settings.relaxation;
      data[i + 1] *= this.settings.relaxation;
    }

    const gridMouseX = this.size * this.mouse.x;
    const gridMouseY = this.size * (1 - this.mouse.y);
    const maxDist = this.size * this.settings.mouse;
    const aspect = this.height / this.width;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2;
        const maxDistSq = maxDist ** 2;

        if (distance < maxDistSq) {
          const index = 4 * (i + this.size * j);

          let power = maxDist / Math.sqrt(distance);
          power = clamp(power, 0, 10);
          // if (distance < this.size / 32) power = 1;
          // power = 1;

          data[index] += this.settings.strength * 100 * this.mouse.vX * power;
          data[index + 1] -=
            this.settings.strength * 100 * this.mouse.vY * power;
        }
      }
    }

    this.mouse.vX *= 0.9;
    this.mouse.vY *= 0.9;
    this.texture.needsUpdate = true;
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    this.updateDataTexture();
    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

export function AboutImage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      new Sketch({
        dom: container.current,
      });
    }, 3000);
  }, []);

  return (
    <div
      className={styles.main}
      ref={container}
      data-grid="15"
      data-mouse="0.2"
      data-strength="0.15"
    >
      <img
        alt="Rendi Riz"
        src="/about.jpg"
        className="absolute invisible pointer-events-none"
      />
      {/* <div className={styles.image}>
        <Image
          className="absolute invisible pointer-events-none"
          alt="Rendi Riz"
          src="/svgexport-1.jpg"
          layout="responsive"
          priority={true}
          width={425}
          height={500}
        />
      </div> */}
    </div>
  );
}

export default AboutImage;
