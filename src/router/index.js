import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Welcome/Landing.vue";
import Login from "../views/Welcome/Login.vue";
import Signup from "../views/Welcome/Signup.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
