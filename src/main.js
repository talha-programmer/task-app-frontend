import "./assets/main.css";
import "./index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useStore } from "./stores/appStore";
import axios from "axios";

const app = createApp(App);

app.use(createPinia()).use(router);
app.use(router);

app.mount("#app");

const store = useStore();

store.verifyToken().then(() => {
  if (store.token) {
    // Axios configuration
    axios.defaults.headers.common = {
      Authorization: `Bearer ${store.token}`,
      Accept: "application/json",
    };

    router.push("/");
  }
});


