import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";
import SearchResult from "./components/SearchResult.vue";
import Profile from "./components/Profile.vue";
import CreateHost from "./components/CreateHost.vue";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "Home",
    component: Home,
    path: "/home",
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
  {
    name: "SearchResult",
    component: SearchResult,
    path: "/search",
    props: (route) => ({
      searchQuery: route.state?.searchQuery || "",
    }),
  },
  {
    name: "Profile",
    component: Profile,
    path: "/profile",
  },
  {
    name: "CreateHost",
    component: CreateHost,
    path: "/create-host",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
