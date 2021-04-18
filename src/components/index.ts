import { App } from "vue";

import FabricCanvas from "./FabricCanvas";
import FabricTextbox from "./FabricTextbox";
import FabricCircle from "./FabricCircle";
import FabricRectangle from "./FabricRectangle";
import FabricImage from "./FabricImage";

export default {
  install: (app: App): void => {
    app.component("FabricCanvas", FabricCanvas);
    app.component("FabricTextbox", FabricTextbox);
    app.component("FabricCircle", FabricCircle);
    app.component("FabricRectangle", FabricRectangle);
    app.component("FabricImage", FabricImage);
  },
};
