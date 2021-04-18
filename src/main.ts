import { createApp } from "vue";
import VueFabric from "./components";

import App from "@/App.vue";

const app = createApp(App);

app.use(VueFabric);
app.mount("#app");
