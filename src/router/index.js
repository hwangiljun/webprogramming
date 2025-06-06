// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LoginView from '../views/user/LoginView.vue';
import SignUp from '../views/user/SignUp.vue';
const routes = [
   { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignUp },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
