import * as THREE from "three";
import Stats from "stats.js";

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

/** Start of Solace CAD */
function main() {
  const canvas = Canvas();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x171717);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
  let factor = 2;
  const cameraDirectionVector = new THREE.Vector3(1, 1, 1).normalize();
  camera.position.set(
    factor * cameraDirectionVector.x,
    factor * cameraDirectionVector.y,
    factor * cameraDirectionVector.z,
  );
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  window.onwheel = (event): void => {
    factor += event.deltaY;
    camera.position.set(
      factor * cameraDirectionVector.x,
      factor * cameraDirectionVector.y,
      factor * cameraDirectionVector.z,
    );
    camera.updateMatrix();
  };

  const gridHelper = new THREE.GridHelper(20, 20);
  scene.add(gridHelper);

  renderer.setAnimationLoop(animate);
  function animate() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    stats.update();
  }
}

/** @return {HTMLCanvasElement} An empty canvas with id="c". */
function Canvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "c");
  document.body.appendChild(canvas);
  return canvas;
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer): boolean {
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
