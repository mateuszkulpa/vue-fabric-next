import { App } from "vue";

import FabricCanvas from "./FabricCanvas.vue";
import FabricTextbox from "./FabricTextbox.vue";
import FabricCircle from "./FabricCircle.vue";
import FabricRectangle from "./FabricRectangle.vue";

export default {
  install: (app: App): void => {
    app.component("FabricCanvas", FabricCanvas);
    app.component("FabricTextbox", FabricTextbox);
    app.component("FabricCircle", FabricCircle);
    app.component("FabricRectangle", FabricRectangle);
  },
};
