<template>
  <header class="p-4 md:p-6 border-b bg-white sticky top-0 z-50">
    <nav class="flex items-center justify-between max-w-7xl mx-auto">
      <div class="flex items-center space-x-8">
        <h1
          @click="$router.push('/')"
          class="text-xl md:text-2xl font-bold text-gray-800"
          style="cursor: pointer;"
        >
          Korea Tourism
        </h1>
        <ul class="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <li><router-link to="/" class="hover:text-blue-600 transition-colors">recommend</router-link></li>
          <li><router-link to="/list" class="hover:text-blue-600 transition-colors">list</router-link></li>
          </ul>
      </div>
      <div class="flex items-center space-x-2">
        <template v-if="isLoggedIn">
          <button
            @click="$router.push('/mypage')"
            class="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            mypage
          </button>
          <button
            @click="logout"
            class="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            logout
          </button>
        </template>
        <template v-else>
          <button
            @click="$router.push('/signup')"
            class="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Sign up
          </button>
          <button
            @click="$router.push('/login')"
            class="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Login
          </button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: { // data() 대신 computed 사용
    isLoggedIn() {
      return this.$store.getters.isLoggedIn; // Vuex getter 연결
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout'); // Vuex mutation 호출
      localStorage.removeItem('token'); // 실제 토큰 삭제 로직 추가
      this.$router.push('/');
    }
  },
  mounted() { // 초기 로그인 상태 체크 (선택 사항)
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.commit('login', { token }); // 저장된 토큰으로 상태 갱신
    }
  }
};
</script>
<style scoped>


</style>