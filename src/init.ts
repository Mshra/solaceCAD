import WebGL from "three/addons/capabilities/WebGL.js";
import main from "./main";

/** creating a fresh canvas only if webgl2 is available, otherwise error message is shown. */
if (WebGL.isWebGL2Available()) {
  main();
} else {
  document.body.appendChild(WebGL.getWebGL2ErrorMessage());
}
