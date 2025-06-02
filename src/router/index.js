// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../components/main.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../components/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
