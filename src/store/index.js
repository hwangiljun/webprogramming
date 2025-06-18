import { createStore } from 'vuex'
import travel from './travel'

// 예시: 세션에서 사용자 정보 가져오는 API 함수
import { fetchCurrentUser } from '@/api/apiMethod' // /api/me 등

export default createStore({
  state: {
    user: null // 로그인한 사용자 정보
  },
  mutations: {
    login(state, userData) {
      // userData는 반드시 {id, email, name} 등 모든 정보 포함!
      state.user = userData
    },
    logout(state) {
      state.user = null
    },
  },
  actions: {
    // 새로고침 시 세션 쿠키로 로그인 상태 복원
    async fetchUser({ commit }) {
      try {
        const user = await fetchCurrentUser() // 세션 쿠키로 사용자 정보 요청
        if (user && user.id) {
          commit('login', user)
        } else {
          commit('logout')
        }
      } catch (e) {
        commit('logout')
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    userInfo: state => state.user,
    userName: state => state.user ? state.user.name : '',
  },
  modules: {
    travel
  }
})
