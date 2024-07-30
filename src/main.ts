import * as THREE from "three";
import "./UI/main";

/** Start of Solace CAD */
function main() {
  const canvas = document.querySelector("#c") as HTMLCanvasElement;

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
    factor +=
      (0.5 * (1 - Math.exp(-1 * event.deltaY))) /
      (1 + Math.exp(-1 * event.deltaY));
    camera.position.set(
      factor * cameraDirectionVector.x,
      factor * cameraDirectionVector.y,
      factor * cameraDirectionVector.z,
    );
    camera.updateMatrix();
  };

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial(),
  );
  scene.add(cube);

  let isDragging = false;
  let startX: number, startY: number;

  window.onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  window.onmousemove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      console.log(`Dragging: deltaX = ${deltaX}, deltaY = ${deltaY}`);
      camera.position.set(
        factor * cameraDirectionVector.x,
        0.001 * deltaY * factor * cameraDirectionVector.y,
        factor * cameraDirectionVector.z,
      );
      camera.updateMatrix();
    }
  };

  window.onmouseup = () => {
    isDragging = false;
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
  }
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
