// src/router/index.js
<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import TripRandom from '../views/travel/TripRandom.vue'

const routes = [
  {
    path: '/trip/random',
    name: 'TripRandom',
    component: TripRandom
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
=======
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
>>>>>>> 815e73e191fb2a52dfe78b00c350f2aa590a956f
