import { createApp } from "vue";
import VueFabric from "./components/VueFabric";

import App from "@/App.vue";

const app = createApp(App);

app.use(VueFabric);
app.mount("#app");
