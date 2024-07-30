import WebGL from "three/addons/capabilities/WebGL.js";
import main from "./main";

if (!WebGL.isWebGL2Available()) {
  main();
} else {
  document.body.appendChild(WebGL.getWebGL2ErrorMessage());
}
