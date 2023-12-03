import { createApp, version } from "vue";
import App from "./App.vue";
import Loader from "@/components/Loader.vue";
import "./main.css";
import router from "./routers/router";
import { createPinia } from "pinia";
import { createORM } from "pinia-orm";

const app = createApp(App);
const pinia = createPinia().use(createORM());

// app.config.errorHandler = (err) => {
//     console.log(err)
// }
app.use(router);
app.use(pinia);
app.component("Loader", Loader);
app.mount("#app");
