import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/css/base.css";
import App from "./App.vue";

import router from "./router";
const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);
app.mount("#app");
