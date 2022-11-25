import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Welcome/Landing.vue";
import Login from "../views/Welcome/Login.vue";
import Signup from "../views/Welcome/Signup.vue";
import ResetPassword from "../views/Welcome/reset-password.vue";

import AboutUs from "../views/Welcome/about.vue";
import Plans from "../views/Welcome/plans.vue";
import ContactUs from "../views/Welcome/contact-us.vue";

import Dashboard from "../views/Dashboard/Dashboard.vue";
import AllUserPlans from "../views/Dashboard/All-user-plans.vue";
import MyTransactions from "../views/Dashboard/my-transactions.vue";
import MyWithdrawals from "../views/Dashboard/myWithdrawals.vue";
import Settings from "../views/Dashboard/settings.vue";
import Profile from "../views/Dashboard/profile.vue";

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
    path: "/reset-password",
    name: "resetPassword",
    component: ResetPassword,
  },

  {
    path: "/about-us",
    name: "aboutUs",
    component: AboutUs,
  },

  {
    path: "/contact-us",
    name: "contactUs",
    component: ContactUs,
  },

  {
    path: "/plans",
    name: "plans",
    component: Plans,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },

  {
    path: "/all-user-plans",
    name: "allUserPlans",
    component: AllUserPlans,
  },

  {
    path: "/my-transactions",
    name: "myTransactions",
    component: MyTransactions,
  },

  {
    path: "/my-withdrawals",
    name: "myWithdrawals",
    component: MyWithdrawals,
  },

  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },

  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
