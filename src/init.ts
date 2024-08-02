import WebGL from "three/addons/capabilities/WebGL.js";
import "@/ui/main";
import initCanvas from "./canvas/main";

if (WebGL.isWebGL2Available()) {
  initCanvas();
} else {
  document.body.appendChild(WebGL.getWebGL2ErrorMessage());
}
