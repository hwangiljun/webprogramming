// src/router/index.js
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
