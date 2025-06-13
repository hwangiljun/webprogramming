// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 각 페이지 import (경로 확인 후 필요 시 수정)
import HomePage from '../views/HomePage.vue';
import LoginView from '../views/user/LoginView.vue';
import SignUp from '../views/user/SignUp.vue';
import MyPage from '../views/user/MyPage.vue';
import AdminPage from '../views/admin/AdminPage.vue';

// Travel 관련 페이지는 'views/Travel' 폴더 안에 있으므로 경로를 정확하게 지정합니다.
// 파일 이름에 맞춰 import 경로와 이름을 수정합니다.
import TravelListPage from '../views/Travel/TravelListPage.vue';   // 파일 이름 변경
import TravelDetailPage from '../views/Travel/TravelDetailPage.vue'; // 파일 이름 변경

// AI 추천 페이지도 views 폴더 바로 아래에 있다고 가정
import RecommendResultPage from '../views/RecommendResultPage.vue';


// 라우트 정의
const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/admin', name: 'AdminPage', component: AdminPage },
  { path: '/recommend-result', name: 'RecommendResultPage', component: RecommendResultPage },

  // 여행지 목록 라우트: name도 TravelListPage로 일관성 있게 변경
  { path: '/list', name: 'TravelListPage', component: TravelListPage }, // name 변경
  {
    path: '/travel-detail/:id', // 동적 ID를 받는 경로
    name: 'TravelDetailPage', // name 변경
    component: TravelDetailPage,
    props: true, // 라우터 파라미터를 컴포넌트 props로 전달
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 라우터 내보내기
export default router;