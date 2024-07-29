import * as THREE from "three";

/** Start of Solace CAD */
function main() {
  const canvas = Canvas();
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
  const light = new THREE.DirectionalLight(0xffffff, 3);

  light.position.set(2, 2, 4);
  camera.position.set(4, 2, 4);
  camera.rotateY(Math.PI / 4);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  const gridHelper = new THREE.GridHelper(10, 10);

  scene.add(cube);
  scene.add(light);
  scene.add(gridHelper);

  renderer.setAnimationLoop(() => animate(cube, renderer, scene, camera));
}

/** @return {HTMLCanvasElement} An empty canvas with id="c". */
function Canvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "c");
  document.body.appendChild(canvas);
  return canvas;
}

function animate(
  cube: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshPhongMaterial,
    THREE.Object3DEventMap
  >,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = Math.floor(canvas.clientWidth * pixelRatio);
  const height = Math.floor(canvas.clientHeight * pixelRatio);
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

export default main;
