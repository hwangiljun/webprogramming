// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 각 페이지 import
import HomePage from '../views/HomePage.vue'
import LoginView from '../views/user/LoginView.vue'
import SignUp from '../views/user/SignUp.vue'
import MyPage from '../views/user/MyPage.vue'; 
import AdminPage from '../views/admin/AdminPage.vue';
// 라우트 정의
const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/mypage', component: MyPage },
    {path: '/admin', component: AdminPage},
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 라우터 내보내기
export default router
