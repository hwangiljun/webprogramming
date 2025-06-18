<template>
  <div id="app" class="bg-gray-50">
    <div class="max-w-7xl mx-auto bg-white shadow-lg min-h-screen">
      <AppHeader />
      <!-- 페이지 컴포넌트가 이 자리에 렌더링됩니다 -->
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  created() {
    // 앱이 시작될 때 로그인 상태 복구
    this.$store.dispatch('fetchUser');
  }
}
</script>
