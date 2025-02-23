import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./Route";
createApp(App).use(router).mount("#app");
