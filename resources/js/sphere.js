import * as THREE from 'three';
import images from './images';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

let camera, scene, renderer, mesh;

// Load images textures
const textureOne = new THREE.TextureLoader().load(images.photoOne);
const textureTwo = new THREE.TextureLoader().load(images.photoTwo);
const textureThree = new THREE.TextureLoader().load(images.photoThree);
const textureFour = new THREE.TextureLoader().load(images.photoFour);
const textureFive = new THREE.TextureLoader().load(images.photoFive);

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// Constructor
scene = new THREE.Scene();
const clock = new THREE.Clock();
let perspective = 1000; // Camera perspective / distance on the z axis
let container = document.querySelector('main');
let hero = document.querySelector('.hero__div-right');
let links = [...document.querySelectorAll('#nav-li')];
let uniforms = {
  uTexture: {
    value: new THREE.TextureLoader().load(images.photoThree)
  },
  uAlpha: {
    value: 0.0
  },
  uOffset: {
    value: new THREE.Vector2(0.0, 0.0)
  }
}

// Event Listeners
uniforms.uTexture.value = textureFive;

links.forEach((link, idx) => {
  link.addEventListener('mouseenter', () => {

    switch (idx) {
      case 0:
        uniforms.uTexture.value = textureOne;
        break;
      case 1:
        uniforms.uTexture.value = textureTwo;
        break;
      case 2:
        uniforms.uTexture.value = textureThree;
        break;
      case 3:
        uniforms.uTexture.value = textureFour;
        break;
      case 4:
        uniforms.uTexture.value = textureFive;
        break;
    }
  })

  link.addEventListener('mouseleave', () => {
    uniforms.uAlpha.value = lerp(uniforms.uAlpha.value, 0.0, 0.1);
  });

})

if (hero.addEventListener('mouseenter', () => {
  uniforms.uTexture.value = textureFive;
}));

// Viewport
let width = window.innerWidth;
let height = window.innerHeight;
let aspectRatio = width / height;

// Mouse coordinates
let targetX = 0;
let targetY = 0;

onMousemove();
init();
animate();

function init() {

  // CAMERA

  let fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
  camera.position.set(-6, -7, 20);

  function mobileMedia(mobile) {
    
    if (mobile.matches) {
      camera.position.set(-6, -3, 45);
    }

  }
  
  const mobile = window.matchMedia("(max-width: 600px)");
  mobileMedia(mobile);
  mobile.addEventListener('resize', mobileMedia);

  function tabletMedia(tablet) {
    
    if (tablet.matches) {
      camera.position.set(-7, -10, 20);
    }

  }
  
  const tablet = window.matchMedia("(min-width: 600px) and (max-width: 1024px)");
  tabletMedia(tablet);
  tablet.addEventListener('resize', tabletMedia);

  // GEOMETRY, MATERIAL AND MESH

  // MENU SPHERE
  const geometry = new THREE.SphereGeometry(13.5, 250, 250);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    wireframe: true,
  })
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // RENDERER

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // RESIZER

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onMousemove() {
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX * 0.1;
    targetY = e.clientY * 0.1;
  })
}

function animate() {

  requestAnimationFrame(animate);
  
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = .005 * elapsedTime;

  mesh.rotation.x += .000025 * targetX;
  mesh.rotation.y += .000025 * targetX;
  mesh.rotation.z += .000025 * targetY;

  renderer.render(scene, camera);

}
