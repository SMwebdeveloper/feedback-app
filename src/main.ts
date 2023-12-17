import { createApp } from "vue";
import App from "./App.vue";
import Loader from "@/components/Loader.vue";
import SecondLoader from "@/components/SecondLoader.vue";
import Feedback from '@/components/Feedback.vue'
import Comments from '@/components/Comments.vue'
import "./main.css";
import router from "./routers/router";
import { createPinia } from "pinia";
import { createORM } from "pinia-orm";

const app = createApp(App);
const pinia = createPinia().use(createORM());

app.use(router);
app.use(pinia);
app.component("Loader", Loader);
app.component("SecondLoader", SecondLoader);
app.component("Feedback", Feedback)
app.component("Comments", Comments)
app.mount("#app");
