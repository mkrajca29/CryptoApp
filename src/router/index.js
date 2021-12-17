import { createRouter, createWebHashHistory } from "vue-router";
import Overview from "../views/Overview.vue";

const routes = [
  {
    path: "/",
    name: "Overview",
    component: Overview,
  },
  {
    path: "/BTC",
    name: "BTC",
    component: () => import(/* webpackChunkName: "about" */ "../views/BTC.vue"),
  },
  {
    path: "/ETH",
    name: "ETH",
    component: () => import(/* webpackChunkName: "about" */ "../views/ETH.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
