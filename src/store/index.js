// store.js
import { createStore } from 'vuex'
import travel from './travel'

export default createStore({
  state: {
    user: null // 로그인한 사용자 정보만 저장
  },
  mutations: {
    login(state, userData) {
      // userData는 반드시 {email, name} 등 user 객체만 전달!
      state.user = userData
    },
    logout(state) {
      state.user = null
    },
  },
  actions: {
    // 비동기 액션 필요시 추가
  },
  getters: {
    isLoggedIn: state => !!state.user,
    userInfo: state => state.user,
    userName: state => state.user ? state.user.name : '', // 이름만 따로 가져올 때
  },
  modules: {
    travel
  }
})
