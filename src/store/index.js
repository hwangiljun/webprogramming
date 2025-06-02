import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // 로그인한 사용자 정보
  },
  mutations: {
    login(state, userData) {
      state.user = userData;
    },
    logout(state) {
      state.user = null;
    },
  },
  actions: {
    // 비동기 액션 필요시 추가
  },
  getters: {
    isLoggedIn: state => !!state.user,
    userInfo: state => state.user,
  },
});
