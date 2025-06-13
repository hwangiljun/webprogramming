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
  data() {
    return {
      isLoggedIn: false, // 실제로는 상태관리 또는 인증 로직과 연동
    };
  },
  methods: {
    logout() {
      // 로그아웃 처리 (토큰 삭제 등)
      this.isLoggedIn = false;
      this.$router.push('/');
    },
  },
  mounted() {
    // 실제 서비스에서는 로그인 상태를 확인해서 isLoggedIn을 갱신해야 합니다.
    // 예시: this.isLoggedIn = !!localStorage.getItem('token');
  },
};
</script>
<style scoped>
/* Tailwind CSS 클래스는 그대로 유지하며 필요한 추가 스타일만 여기에 작성합니다. */
</style>