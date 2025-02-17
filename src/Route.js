import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "SignIn",
    component: SignIn,
    path: "/sign-in",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
