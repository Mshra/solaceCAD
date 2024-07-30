import WebGL from "three/addons/capabilities/WebGL.js";
import main from "./main";

/** creating a fresh canvas only if webgl2 is available, otherwise error message is shown. */
if (WebGL.isWebGL2Available()) {
  main();
} else if (!WebGL.isWebGL2Available()) {
  document.body.appendChild(WebGL.getWebGL2ErrorMessage());
} else {
  const error = document.createElement("div");
  error.textContent = "Page not Found";
  document.body.appendChild(error);
}
