<template>
  <div id="app" class="bg-gray-50">
    <div class="max-w-7xl mx-auto bg-white shadow-lg min-h-screen">
      <AppHeader />
      <router-view /> <!-- 페이지 컴포넌트가 이 자리에 렌더링됩니다 -->
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>
