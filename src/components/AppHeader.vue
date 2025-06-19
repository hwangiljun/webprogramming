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
          <li>
            <router-link to="/" class="hover:text-blue-600 transition-colors">recommend</router-link>
          </li>
          <li>
            <router-link to="/list" class="hover:text-blue-600 transition-colors">list</router-link>
          </li>
        </ul>
      </div>
      <div class="flex items-center space-x-2">
        <template v-if="isLoggedIn">
          <span class="text-gray-700 font-semibold mr-2">
            어서오세요, {{ userName }}님
          </span>
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
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userName() {
      // userInfo가 null이 아니면 name 반환
      return this.$store.getters.userInfo ? this.$store.getters.userInfo.name : '';
    }
  },
  methods: {
    async logout() {
    try {
      await fetch('http://127.0.0.1:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {
      // 서버가 죽었거나 네트워크 오류 등은 무시
    }
    this.$store.commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.$router.push('/');
  }
  },
  mounted() {
    // 새로고침 시 localStorage에서 user 정보 복원
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.commit('login', user);
    }
  }
};
</script>

<style scoped>
/* 필요시 스타일 추가 */
</style>
