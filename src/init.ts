import WebGL from "three/addons/capabilities/WebGL.js";
import makeUI from "./ui/main";
import initCanvas from "./canvas/main";

if (WebGL.isWebGL2Available()) {
  makeUI()
  initCanvas();
} else {
  document.body.appendChild(WebGL.getWebGL2ErrorMessage());
}

// a threeJS project mainly contains of
//
